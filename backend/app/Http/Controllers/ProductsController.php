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

        $words = array_filter(preg_split('/\s+/', trim($query)));

        $products = Product::query()
            ->select([
                'id',
                'name',
                'category_id',
                'unit',
            ])
            ->where(function ($builder) use ($words) {
                foreach ($words as $word) {
                    $builder
                        ->where('name', 'ilike', '%' . $word . '%');   
                }
            })
            ->orderBy('name')
            ->limit(10)
            ->get();

        return response()->json([
            "products" => $products
        ], 200);
    }
}
