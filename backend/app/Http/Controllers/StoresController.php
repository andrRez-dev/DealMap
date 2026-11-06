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
        
        $stores_list = Store::all();
        
        $stores_response = [];

        foreach ($stores_list as $store) {
            if($store->is_active){
                $stores_response[] = [
                    'name' => $store->name,
                    'brand' => $store->brand,
                    'address' => $store->address,
                    'city' => $store->city,
                    'latitude' => $store->latitude,
                    'longitude' => $store->longitude,
                    'phone' => $store->phone,
                    'website_url' => $store->website
                ];
            }
        }

        return response()->json([
            'stores' => $stores_response
        ], 200);
    }
}
