<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Support\ClientTokenResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VotesController extends Controller
{
    public function store(
        Request $request,
        string $offer,
        ClientTokenResolver $tokenResolver
    ): JsonResponse {
        $validated = $request->validate([
            'vote' => ['required', 'in:works,expired'],
        ]);
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $result = DB::transaction(function () use ($offer, $validated, $user) {
            $offerRecord = Offer::query()
                ->lockForUpdate()
                ->find($offer);

            if ($offerRecord === null) {
                abort(404, 'Offer not found.');
            }

            $existingVote = $offerRecord->votes()
                ->where('user_id', $user->id)
                ->first();

            if ($existingVote === null) {
                $offerRecord->votes()->create([
                    'user_id' => $user->id,
                    'vote' => $validated['vote'],
                ]);
            } else {
                $existingVote->vote = $validated['vote'];
                $existingVote->created_at = now();
                $existingVote->save();
            }

            $expiredVotes = $offerRecord->votes()
                ->where('vote', 'expired')
                ->count();
            $worksVotes = $offerRecord->votes()
                ->where('vote', 'works')
                ->count();
            $hasNotExpired = $offerRecord->expires_at === null
                || ! $offerRecord->expires_at->lt(today());
            $isActive = $expiredVotes < 3 && $hasNotExpired;

            $offerRecord->is_active = $isActive;
            $offerRecord->save();

            return [
                'works' => $worksVotes,
                'expired' => $expiredVotes,
                'is_active' => $isActive,
            ];
        });

        return response()->json([
            'message' => 'Vote saved.',
            'vote' => $validated['vote'],
            'votes' => [
                'works' => $result['works'],
                'expired' => $result['expired'],
            ],
            'is_active' => $result['is_active'],
        ]);
    }
}
