<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Support\ClientTokenResolver;

class OffersController extends Controller
{
    public function index(Request $request, ClientTokenResolver $tokenResolver)
    {
        $tokenResolver->requireFrontendClient($request);
        $userId = $tokenResolver->resolveUser($request, required: false)?->id;

        $offersQuery = DB::table('offers')
            ->join('products', 'products.id', '=', 'offers.product_id')
            ->join('stores', 'stores.id', '=', 'offers.store_id')
            ->select([
                'offers.id',
                'offers.product_id',
                'offers.store_id',
                'offers.original_price',
                'offers.discounted_price',
                'offers.discount_percent',
                'offers.title',
                'offers.description',
                'offers.starts_at',
                'offers.expires_at',
                'offers.is_active',
                'products.name as product_name',
                'products.unit as product_unit',
                'stores.name as store_name',
                'stores.brand as store_brand',
                'stores.address as store_address',
                'stores.city as store_city',
                'stores.latitude as store_latitude',
                'stores.longitude as store_longitude',
            ])
            ->selectSub(
                DB::table('votes')
                    ->selectRaw('COUNT(*)')
                    ->whereColumn('votes.offer_id', 'offers.id')
                    ->where('votes.vote', 'works'),
                'works_votes'
            )
            ->selectSub(
                DB::table('votes')
                    ->selectRaw('COUNT(*)')
                    ->whereColumn('votes.offer_id', 'offers.id')
                    ->where('votes.vote', 'expired'),
                'expired_votes'
            );

        if ($userId === null) {
            $offersQuery->selectRaw('NULL as my_vote');
        } else {
            $offersQuery->selectSub(
                DB::table('votes')
                    ->select('votes.vote')
                    ->whereColumn('votes.offer_id', 'offers.id')
                    ->where('votes.user_id', $userId)
                    ->limit(1),
                'my_vote'
            );
        }

        $offers = $offersQuery
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('offers.expires_at')
                    ->orWhereDate('offers.expires_at', '>=', today());
            })
            ->get();

        $offers->each(function ($offer): void {
            $offer->works_votes = (int) $offer->works_votes;
            $offer->expired_votes = (int) $offer->expired_votes;
        });

        return response()->json($offers);
    }
}
