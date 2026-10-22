<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\Offer;
use App\Models\User;

class OffersController extends Controller
{

    private function failedResponse($error){
        return response()->json([
            'status' => 'Failed. Check message',
            'message' => $error->getMessage()
        ], 500);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $clientToken = $request->header('X-Client-Token');
        $responseCode = 200;

        try {
            $tokenRecord = PersonalAccessToken::findToken($clientToken);
            if ($tokenRecord && $tokenRecord->tokenable_type == User::class){
                $offers_list = Offer::all();
                if($offers_list->isEmpty()){
                    $responseCode = 404;
                    throw new Exception('No offers found');
                }
                return response()->json([
                    'status' => 'Successfully',
                    'offers' => $offers_list
                ], $responseCode);
            }
            else{
                $responseCode = 401;
                throw new Exception('Invalid user token was used');
            }
        } catch (\Throwable $th) {
            $this->failedResponse($th);
        }
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
        $clientToken = $request->header('X-Client-Token');
        $responseCode = 200;

        try {
            $tokenRecord = PersonalAccessToken::findToken($clientToken);
            if ($tokenRecord && $tokenRecord->tokenable_type == User::class){
                

            }
            else{
                $responseCode = 401;
                throw new Exception('Invalid user token was used');
            }
        } catch(\Throwable $th){
            $this->failedResponse($th);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
