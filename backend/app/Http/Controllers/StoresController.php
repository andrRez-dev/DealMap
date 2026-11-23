<?php

namespace App\Http\Controllers;

use App\Support\ClientTokenResolver;
use App\Models\Store;
use Illuminate\Http\Request;

class StoresController extends Controller
{

    /**
     * Getting list of active stores
     *
     */

    public function getStores(Request $request, ClientTokenResolver $tokenResolver){
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $stores = Store::query()
            ->where('is_active', true)
            ->get([
                'id',
                'name',
                'brand',
                'address',
                'city',
                'latitude',
                'longitude',
                'phone',
                'website as website_url',
                'is_active'
            ]);

        return response()->json([
            'stores' => $stores
        ], 200);
    }
}
