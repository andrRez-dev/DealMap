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
use Illuminate\Support\Facades\Validator;

use Dedoc\Scramble\Attributes\BodyParameter;
use Dedoc\Scramble\Attributes\QueryParameter;

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
                        ->select(['offer_id', 'user_id', 'vote', 'created_at']),
                ]);
            })
            ->where('is_active', true)
            ->where(function (Builder $query): void {
                $query->whereNull('expires_at')
                    ->orWhereDate('expires_at', '>=', today());
            })
            ->get()
            ->map(function (Offer $offer) use ($userId): array {
                $vote = $userId === null ? null : $offer->votes->first();

                return [
                    'store_id' => $offer->store_id,
                    'user_id' => $offer->user_id,
                    'discounted_price' => $offer->discounted_price,
                    'discount_percent' => $offer->discount_percent,
                    'original_price' => $offer->original_price,
                    'starts_at' => $offer->starts_at,
                    'expires_at' => $offer->expires_at,
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
                    'my_vote' => $vote === null ? null : [
                        'offer_id' => $vote->offer_id,
                        'vote' => $vote->vote,
                        'created_at' => $vote->created_at,
                    ],
                ];
            });

        return response()->json($offers);
    }

    /**
     * Getting offers by store
     *
     */

    public function offers_by_store(Request $request, ClientTokenResolver $tokenResolver) : JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $request->merge(['id' => $request->route('id')]);

        $validated = $request->validate([
            'id' => "required|exists:stores,id",
        ]);

        $offers_list = Offer::where('store_id', $validated['id'])
                            ->with(['product:id,name', 'store:id,name,address', 'user:name'])
                            ->where('is_active', true)
                            ->limit(10)
                            ->get()
                            ->map(fn ($offer) => [
                                'product_name' => $offer->product?->name,
                                'store_name' => $offer->store?->name,
                                'store_address' => $offer->store?->address,
                                'created_by' => $offer->user?->name,
                                'original_price' => $offer->original_price,
                                'discounted_price' => $offer->discounted_price,
                                'discount_percent' => $offer->discount_percent,
                                'starts_at' => $offer->starts_at,
                                'expires_at' => $offer->expires_at
                            ]);

        return response()->json([
            'message' => 'Successfull',
            'offers' => $offers_list
        ], 200);
    }

    /**
     * Getting offers by category
     */

    public function offers_by_category(Request $request, ClientTokenResolver $tokenResolver){
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id'
        ]);

        $offers_list = Offer::query()
                            ->whereHas('product', function($query) use ($validated){
                                $query->where('category_id' , $validated['category_id']);
                            })
                            ->where('is_active', true)
                            ->with(['product:id,name,category_id', 'store:id,name,address', 'user:id,name'])
                            ->limit(20)
                            ->get()
                            ->map(fn ($offer) => [
                                'product_name' => $offer->product?->name,
                                'store_name' => $offer->store?->name,
                                'store_address' => $offer->store?->address,
                                'created_by' => $offer->user?->name,
                                'original_price' => $offer->original_price,
                                'discounted_price' => $offer->discounted_price,
                                'discount_percent' => $offer->discount_percent,
                                'starts_at' => $offer->starts_at,
                                'expires_at' => $offer->expires_at
                            ]);

        return response()->json([
            'message' => 'Successfull',
            'offers' => $offers_list
        ], 200);
    }

    /**
     * Getting offers in radius
     */

    #[QueryParameter(
        'radius',
        description: 'In kilometers',
        format: 'number',
        required: true,
    )]

    public function offers_by_radius(Request $request, ClientTokenResolver $tokenResolver){
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $offers_response = [];

        $validator = Validator::make($request->all(), [
            'longitude' => 'required|decimal:3',
            'latitude' => 'required|decimal:3',
            'radius' => 'required|min:1|max:10'
        ]);

        $validator->after(function ($validator) use ($request){
            $lat = $request->input('latitude');
            $lng = $request->input('longitude');

            $inLat = $lat >= 55.610 && $lat <= 55.835;
            $inLng = $lng >= 21.050 && $lng <= 21.230;
            if(!$inLat || !$inLng){
                $validator->errors()->add('location', 'Specified coordinates is out of the workzone');
            }
        });

        $validated = $validator->validate();
        $longitude = $validated['longitude'];
        $latitude = $validated['latitude'];
        $radiusInMeters = $validated['radius'] * 1000;

        $offers_response = Offer::query()
            ->with(['product:id,name', 'store:id,name,address', 'user:id,name'])
            ->whereHas('store', function($query) use ($latitude, $longitude, $radiusInMeters){
                
                $query->whereRaw("
                    ST_DWithin(
                        ST_SetSRID(ST_MakePoint(longitude::float, latitude::float), 4326)::geography,
                        ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography,
                        ?
                    )
                ", [$longitude, $latitude, $radiusInMeters]);
            })
            ->where('is_active', true)
            ->get()
            ->map(fn ($offer) => [
                'product_name' => $offer->product?->name,
                'store_name' => $offer->store?->name,
                'store_address' => $offer->store?->address,
                'created_by' => $offer->user?->name,
                'original_price' => $offer->original_price,
                'discounted_price' => $offer->discounted_price,
                'discount_percent' => $offer->discount_percent,
                'starts_at' => $offer->starts_at,
                'expires_at' => $offer->expires_at
            ]);
        
        return response()->json([
            'message' => 'Successfull',
            'offers' => $offers_response
        ], 200);
    }
    

    /**
     * Data for displaying offer form
     *
     */
    public function form(Request $request, ClientTokenResolver $tokenResolver): JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $categories_list = Category::query()
            ->where('is_active', true)
            ->get([
                'id',
                'name',
                'name_lt',
                'sort_order'
            ]);
        
        return response()->json([
            'categories' => $categories_list,
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
        required: false,
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
    #[BodyParameter(
        'product.unit',
        description: 'Required if product is just created',
        required: true,
    )]
    

    public function store(Request $request, ClientTokenResolver $tokenResolver): JsonResponse{
        
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $request->validate([
            'product' => 'required|array',
            'product.exists' => 'required|boolean',
            'product.id' => 'required_if_accepted:product.exists|uuid|exists:products,id',
            'product.category_id' => 'required_if_declined:product.exists|string|exists:categories,id',
            'product.name' => 'required_if_declined:product.exists|string|max:40|min:3',
            'product.unit' => 'required_if_declined:product.exists|string|in:kg,l,vnt',
            'product.barcode' => 'nullable|string|max:13',
            'store_id' => 'required|string|uuid:4|exists:stores,id',
            'starts_at' => ['required', 'date_format:Y-m-d', Rule::date()->between(today()->subDays(7), today()->addDays(7))],
            'expires_at' => ['date_format:Y-m-d', Rule::date()->beforeOrEqual(today()->addDays(30))],
            'original_price' => 'required|decimal:2|min:0.1',
            'discounted_price' => 'required_if_declined:discount_percent|decimal:2|min:0.1',
            'discount_percent' => 'required_if_declined:discount_price|integer|min:1|max:100'
        ]);

        if($product_id = $request['product.id']){
            $product = Product::findOrFail($product_id);
        }
        else{
            $product = Product::create([
                'category_id' => $request['product.category_id'],
                'name' => $request['product.name'],
                'unit' => $request['product.unit'],
                'barcode' => $request['product.barcode'],
                'is_active' => true
            ]);
        }
        if($request['discounted_price'] == null){
            $discounted_price = $request['original_price'] * (1 - $request['discount_percent'] * 0.01);
            $discount_percent = $request['discount_percent'];
        }
        else{
            $discounted_price = $request['discounted_price'];
            $discount_percent = round((1 - ($discounted_price / $request['original_price'])) * 100);
        }
        
        $offer = Offer::create([
            'product_id' => $product->id,
            'store_id' => $request['store_id'],
            'user_id' => $user->id,
            'original_price' => $request['original_price'],
            'discounted_price' => $discounted_price,
            'discount_percent' => $discount_percent,
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
                'title' => "-" . $offer->discount_percent . "% for " . $offer->product->name
            ]
        ], 200);
    }

    /**
     * Setting offer inactive for owner of the offer
     *
     */
    public function setInactive(Request $request, ClientTokenResolver $tokenResolver) : JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $validated = $request->validate([
            'offer_id' => 'required|uuid:7|string',
        ]);
        $offerId = $validated['offer_id'];

        $offerRecord = Offer::findOrFail($offerId);

        if($offerRecord->user != $user){
            return response()->json([
                'message' => 'Access denied. You are not owner of the offer.'
            ], 401);
        }
        $offerRecord->is_active = false;
        $offerRecord->save();
    
        return response()->json([
            'message' => 'Successfull. Offer is inactive'
        ], 200);
    }
}
