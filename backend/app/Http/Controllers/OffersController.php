<?php

namespace App\Http\Controllers;
use App\Models\Offer;
use App\Support\ClientTokenResolver;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OffersController extends Controller
{
    public function index(Request $request, ClientTokenResolver $tokenResolver): JsonResponse
    {
        $userId = $tokenResolver->resolveUser($request, required: false)?->id;

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
                    'my_vote' => $userId === null ? null : $offer->votes->first()?->vote,
                ];
            });

        return response()->json($offers);
    }
}
