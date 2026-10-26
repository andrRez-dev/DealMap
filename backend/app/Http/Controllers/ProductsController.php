<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Support\ClientTokenResolver;
use App\Models\Product;

class ProductsController extends Controller
{
    /**
    *Searching product by first letters
    */
    public function search(Request $request, ClientTokenResolver $tokenResolver){
        $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');

        $validated = $request->validate([
            'q' => 'required|string|min:2|max:100'
        ]);

        $query = $validated['q'];

        $products = Product::query()
            ->select([
                'id',
                'name',
                'name_lt',
                'category_id',
            ])
            ->where(function ($builder) use ($query) {
                $builder
                    ->where('name', 'ilike', $query . '%')
                    ->orWhere('name_lt', 'ilike', $query . '%');
            })
            ->orderBy('name')
            ->limit(10)
            ->get();

        return response()->json([
            "products" => $products
        ], 200);
    }
}
