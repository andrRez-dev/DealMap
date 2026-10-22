<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Support\ClientTokenResolver;

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
        $tokenResolver->requireFrontendClient($request);
        $user = $tokenResolver->resolveUser($request, required: true);

        $result = DB::transaction(function () use ($offer, $validated, $user) {
            $offerRecord = DB::table('offers')
                ->where('id', $offer)
                ->lockForUpdate()
                ->first();

            if ($offerRecord === null) {
                abort(404, 'Offer not found.');
            }

            $existingVote = DB::table('votes')
                ->where('offer_id', $offer)
                ->where('user_id', $user->id)
                ->lockForUpdate()
                ->first();

            if ($existingVote === null) {
                DB::table('votes')->insert([
                    'id' => (string) Str::uuid(),
                    'offer_id' => $offer,
                    'user_id' => $user->id,
                    'vote' => $validated['vote'],
                    'created_at' => now(),
                ]);
            } else {
                DB::table('votes')
                    ->where('id', $existingVote->id)
                    ->update([
                        'vote' => $validated['vote'],
                        'created_at' => now(),
                    ]);
            }

            $expiredVotes = DB::table('votes')
                ->where('offer_id', $offer)
                ->where('vote', 'expired')
                ->count();
            $hasNotExpired = $offerRecord->expires_at === null
                || $offerRecord->expires_at >= today()->toDateString();
            $isActive = $expiredVotes < 3 && $hasNotExpired;

            DB::table('offers')
                ->where('id', $offer)
                ->update([
                    'is_active' => $isActive,
                    'updated_at' => now(),
                ]);

            $worksVotes = DB::table('votes')
                ->where('offer_id', $offer)
                ->where('vote', 'works')
                ->count();

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
