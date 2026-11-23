<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\UserFavorites;
use App\Support\ClientTokenResolver;


class FavoritesController extends Controller
{

    /**
     * List all favorites of user
     */

    public function index(Request $request, ClientTokenResolver $tokenResolver): JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $favorites = UserFavorites::where('user_id', $user->id)->get();

        return response()->json([
            'favorites' => $favorites
        ]);
    }

    /**
     * Store new favorite
     */

    public function store(Request $request, ClientTokenResolver $tokenResolver): JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $request->validate([
            'offer_id' => 'required|uuid|exists:offers,id'
        ]);
        $new_favorite = [
            'user_id' => $user->id,
            'offer_id' => $request['offer_id']
        ];

        UserFavorites::firstOrCreate($new_favorite);

        $favorites = UserFavorites::where('user_id', $user->id)->get();

        return response()->json([
            'status' => 'Successfully saved',
            'favorites' => $favorites
        ]);

    }

    /**
     * Delete favorite
     */

    public function delete(Request $request, ClientTokenResolver $tokenResolver) : JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $request->validate([
            'offer_id' => 'required|uuid|exists:offers,id'
        ]);

        UserFavorites::where('offer_id', $request['offer_id'])->delete();

        $favorites = UserFavorites::where('user_id', $user->id)->get();
        
        return response()->json([
            'status' => 'Deleted',
            'favorites' => $favorites
        ]);
    }
}
