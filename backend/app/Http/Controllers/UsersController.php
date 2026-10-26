<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use App\Support\ClientTokenResolver;

class UsersController extends Controller
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
     * Store a newly created user in storage.
     *
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email',
            'password' => 'required|min:4|max:255'
        ]);

        $checkIsAlreadyExists = User::where('email', $validated['email'])->exists();
        if($checkIsAlreadyExists){
            return response()->json(['message' => 'This email is already being taken'], 400);
        }
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password_hash' => Hash::make($validated['password']),
            'is_active' => true
        ]);

        $token = $user->createToken('user-access-token', ['*'], now()->plus(weeks: 1))->plainTextToken;

        return response()->json([
            'status' => 'The user is added',
            'client_token' => $token,
            'user_info' => $user
        ], 200);
    }

    /**
     * Verify user during login
     */

    public function verifyUser(Request $request)
    {
        $validated = $request->validate([
            'login' => 'required|string|min:3|max:255',
            'password' => 'required|min:4|max:255'
        ]);

        if (!User::where('email', $validated['login'])->exists()){
            if(!User::where('name', $validated['login'])->exists()){
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }
        }

        $user = User::where('name', $validated['login'])->first();
        
        if(!Hash::check($validated['password'], $user->password_hash)){
            return response()->json(['message' => 'Incorrect password'], 403);
        }
        $user->tokens()->delete();
        if($user->is_active){
            $token = $user->createToken('user-access-token', ['*'], now()->plus(weeks: 1))->plainTextToken;
        }
        else{
            return response()->json([
                'message' => 'User is inactive. Contact our administrator.'
            ], 401);
        }
        

        return response()->json([
            'status' => 'User verified successfully',
            'client_token' => $token,
            'user_info' => $user
        ], 200);
    }

    /**
    * Cheching authorization of the token
    */

    public function checkAuth(Request $request, ClientTokenResolver $tokenResolver){
        $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $clientToken = $request->header('X-Client-Token');

        $tokenRecord = PersonalAccessToken::findToken($clientToken);

        if($tokenRecord){
            $user = User::find($tokenRecord->tokenable_id);

            return response()->json([
                'message' => 'Token authorized',
                'client_token' => $clientToken,
                'user_info' => $user
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Token is not found',
                'client_token' => $clientToken
            ], 404);
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
     * Update the specified user in storage.
     */
    public function update(Request $request, ClientTokenResolver $tokenResolver)
    {
        $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $clientToken = $request->header('X-Client-Token');

        $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email',
            'password' => 'required|min:4|max:255'
        ]);

        $tokenRecord = PersonalAccessToken::findToken($clientToken);
        $user_id = $tokenRecord->tokenable_id;
        $user = User::find($user_id);
        $user->update($request->all());
        $user->save();

        return response()->json([
            'status' => 'The user is updated',
            'user_info' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        if(!$user){
            return response()->json(['message' => 'No user found'], 404);
        }
    }
}
