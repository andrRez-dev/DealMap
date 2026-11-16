<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Support\ClientTokenResolver;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoritesController extends Controller
{
    /**
     * Get the authenticated user's active and unexpired favorite offers.
     */
    public function index(Request $request, ClientTokenResolver $tokenResolver): JsonResponse
    {
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $favorites = $user->favoriteOffers()
            ->with([
                'product:id,name,unit',
                'store:id,name,brand,address,city,latitude,longitude',
                'votes' => fn (HasMany $votes) => $votes
                    ->where('user_id', $user->id)
                    ->select(['offer_id', 'user_id', 'vote', 'created_at']),
            ])
            ->withCount([
                'votes as works_votes' => fn (Builder $query) => $query->where('vote', 'works'),
                'votes as expired_votes' => fn (Builder $query) => $query->where('vote', 'expired'),
            ])
            ->where('offers.is_active', true)
            ->where(function (Builder $query): void {
                $query->whereNull('offers.expires_at')
                    ->orWhereDate('offers.expires_at', '>=', today());
            })
            ->orderByRaw('CASE WHEN offers.expires_at IS NULL THEN 1 ELSE 0 END')
            ->orderBy('offers.expires_at')
            ->orderBy('offers.id')
            ->paginate(20)
            ->through(function (Offer $offer): array {
                return $this->formatOffer($offer);
            });

        return response()->json($favorites);
    }

    /**
     * Get all favorite offer IDs for checking favorite state on other pages.
     */
    public function ids(Request $request, ClientTokenResolver $tokenResolver): JsonResponse
    {
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        return response()->json([
            'offer_ids' => $user->favoriteOffers()->pluck('offers.id'),
        ]);
    }

    /**
     * Add an active, unexpired offer to the authenticated user's favorites.
     */
    public function store(
        Request $request,
        string $offer,
        ClientTokenResolver $tokenResolver
    ): JsonResponse {
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $offerId = $this->validatedOfferId($request, $offer);

        return DB::transaction(function () use ($offerId, $user): JsonResponse {
            $offerRecord = Offer::query()
                ->lockForUpdate()
                ->findOrFail($offerId);

            abort_unless(
                $offerRecord->is_active
                    && ($offerRecord->expires_at === null || ! $offerRecord->expires_at->lt(today())),
                422,
                'Only active, unexpired offers can be added to favorites.'
            );

            $user->favoriteOffers()->syncWithoutDetaching([$offerRecord->id]);

            return response()->json([
                'message' => 'Offer added to favorites.',
                'is_favorite' => true,
            ]);
        });
    }

    /**
     * Remove an offer from the authenticated user's favorites.
     */
    public function destroy(
        Request $request,
        string $offer,
        ClientTokenResolver $tokenResolver
    ): JsonResponse {
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        $offerId = $this->validatedOfferId($request, $offer);

        $user->favoriteOffers()->detach($offerId);

        return response()->json([
            'message' => 'Offer removed from favorites.',
            'is_favorite' => false,
        ]);
    }

    private function validatedOfferId(Request $request, string $offer): string
    {
        $request->merge(['offer_id' => $offer]);

        $validated = $request->validate([
            'offer_id' => 'required|uuid',
        ]);

        return $validated['offer_id'];
    }

    private function formatOffer(Offer $offer): array
    {
        $vote = $offer->votes->first();

        return [
            'id' => $offer->id,
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
    }
}
