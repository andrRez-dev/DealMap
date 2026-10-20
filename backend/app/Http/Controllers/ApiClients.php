<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ApiClient;

class ApiClients extends Controller
{
    public function __construct()
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|alpha',
            'email' => 'required|email',
            'password' => 'required|min:4|max:255'
        ]);

        try {
            $apiClient = ApiClient::create($request->all());
            $apiClient->save();
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Failed. Check error',
                'error' => $th
            ], 500);
        }

        return response()->json([
            'status' => 'The user is added',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $apiClient = ApiClient::where('id', $id)->get();
            if (!$apiClient){
                return response()->json([
                    'status' => 'User not found'
                ], 404);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Failed. Check error',
                'error' => $th
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
