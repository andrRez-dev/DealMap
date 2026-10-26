<?php

namespace App\Http\Controllers;
use App\Models\Offer;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Support\ClientTokenResolver;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use Dedoc\Scramble\Attributes\BodyParameter;

class OffersController extends Controller
{
    /**
     * Show all offers.
     *
     */
    public function index(Request $request, ClientTokenResolver $tokenResolver): JsonResponse
    {
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $userId = $user->id;

        $offers = Offer::query()
            ->with([
                'product:id,name,unit',
                'store:id,name,brand,address,city,latitude,longitude',
            ])
            ->withCount([
                'votes as works_votes' => fn (Builder $query) => $query->where('vote', 'works'),
                'votes as expired_votes' => fn (Builder $query) => $query->where('vote', 'expired'),
            ])
            ->when($userId !== null, function (Builder $query) use ($userId): void {
                $query->with([
                    'votes' => fn (HasMany $votes) => $votes
                        ->where('user_id', $userId)
                        ->select(['id', 'offer_id', 'user_id', 'vote']),
                ]);
            })
            ->where('is_active', true)
            ->where(function (Builder $query): void {
                $query->whereNull('expires_at')
                    ->orWhereDate('expires_at', '>=', today());
            })
            ->get()
            ->map(function (Offer $offer) use ($userId): array {
                return [
                    ...$offer->attributesToArray(),
                    'product_name' => $offer->product->name,
                    'product_unit' => $offer->product->unit,
                    'store_name' => $offer->store->name,
                    'store_brand' => $offer->store->brand,
                    'store_address' => $offer->store->address,
                    'store_city' => $offer->store->city,
                    'store_latitude' => $offer->store->latitude,
                    'store_longitude' => $offer->store->longitude,
                    'works_votes' => $offer->works_votes,
                    'expired_votes' => $offer->expired_votes,
                    'my_vote' => $userId === null ? null : [
                        'offer_id' => $offer->votes->offer_id,
                        'vote' => $offer->votes->vote,
                        'created_at' => $offer->votes->created_at
                    ],
                ];
            });

        return response()->json($offers);
    }

    public function offers_by_store(Request $request, ClientTokenResolver $tokenResolver) : JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $request->merge(['id' => $request->route('id')]);
        
        $validated = $request->validate([
            'id' => "required|uuid:4|exists:stores,id",
        ]);

        $offers_list = Offer::where('store_id', $validated['id'])->where('is_active', true)->limit(10)->get();

        return response()->json([
            'message' => 'Successfull',
            'offers' => $offers_list
        ], 200);
    }


    /**
     * Data for displaying offer form
     *
     */
    public function form(Request $request, ClientTokenResolver $tokenResolver): JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $categories_list = Category::all();

        $categories_response = [];
        
        foreach ($categories_list as $category) {
            if($category->is_active){
                $categories_response[] = [
                'id' => $category->id,
                'name' => $category->name,
                'name_lt' => $category->name_lt,
                'sort_order' => $category->sort_order,
                ];
            }
        }
        
        return response()->json([
            'categories' => $categories_response,
        ], 200);
    }

    /**
     * Adding offer
     *
     */

    #[BodyParameter(
        'starts_at',
        description: 'Format: YYYY-MM-DD',
        type: 'string',
        format: 'date',
        required: true,
        example: '2026-10-26'
    )]
    #[BodyParameter(
        'expires_at',
        description: 'Format: YYYY-MM-DD',
        type: 'string',
        format: 'date',
        required: true,
        example: '2026-09-20'
    )]
    #[BodyParameter(
        'discounted_price',
        description: 'Required if discount_percent is empty',
        required: true,
        type: 'number',
        default: false
    )]
    #[BodyParameter(
        'discounted_percent',
        description: 'Required if discounted_price is empty',
        required: true,
        type: 'number', 
        default: false
    )]
    #[BodyParameter(
        'product.id',
        description: 'Required if product is selected from the list',
        required: true,
        type: 'string', 
    )]
    #[BodyParameter(
        'product.category_id',
        description: 'Required if product is just created',
        required: true,
        type: 'string', 
    )]
    #[BodyParameter(
        'product.name',
        description: 'Required if product is just created',
        required: true,
        type: 'string', 
    )]
    

    public function store(Request $request, ClientTokenResolver $tokenResolver): JsonResponse{
        
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $request->validate([
            'product' => 'required|array',
            'product.exists' => 'required|boolean:strict',
            'product.id' => 'required_if_accepted:product.exists|uuid:4|exists:products,id',
            'product.category_id' => 'required_if_declined:product.exists|string|exists:categories,id',
            'product.name' => 'required_if_declined:product.exists|string|max:40|min:3',
            'product.name_lt' => 'nullable|string|max:40|min:3',
            'product.unit' => 'required|string|in:kg,l,vnt',
            'product.barcode' => 'nullable|string|max:13',
            'product.description' => 'nullable|string|max:255',
            'store_id' => 'required|string|uuid:4|exists:stores,id',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'starts_at' => ['required', 'date_format:Y-m-d', Rule::date()->equals(today())],
            'expires_at' => ['required', 'date_format:Y-m-d', Rule::date()->beforeOrEqual(today()->addDays(30))],
            'original_price' => 'required|decimal:2',
            'discounted_price' => 'required_if_declined:discount_percent|decimal:2',
            'discount_percent' => 'required_if_declined:discount_price|integer|min:1|max:100'
        ]);

        if($product_id = $request['product.id']){
            $product = Product::findOrFail($product_id);
        }
        else{
            $product = Product::create([
                'category_id' => $request['product.category_id'],
                'name' => $request['product.name'],
                'name_lt' => $request['product.name_lt'],
                'unit' => $request['product.unit'],
                'barcode' => $request['product.barcode'],
                'description' => $request['product.description'],
                'is_active' => true
            ]);
        }
        if($request['discounted_price'] == null){
            $discounted_price = $request['original_price'] * ($request['discount_percent'] * 0.01);
            $discount_percent = $request['discount_percent'];
        }
        else{
            $discounted_price = $request['discounted_price'];
            $discount_percent = round($discounted_price / ($request['original_price'] / 100), 0); 
            
        }
        
        $offer = Offer::create([
            'product_id' => $product->id,
            'store_id' => $request['store_id'],
            'user_id' => $user->id,
            'original_price' => $request['original_price'],
            'discounted_price' => $discounted_price,
            'discount_percent' => $discount_percent,
            'title' => $request['title'],
            'description' => $request['description'],
            'starts_at' => $request['starts_at'],
            'expires_at' => $request['expires_at'],
            'is_active' => true
        ]);

        

        return response()->json([
            'message' => 'Offer created successfully',
            'offer' => [
                'id' => $offer->id,
                'product_id' => $offer->product_id,
                'store_id' => $offer->store_id,
                'title' => $offer->title
            ]
        ], 200);
    }
}
