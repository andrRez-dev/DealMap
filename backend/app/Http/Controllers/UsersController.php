<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

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
     * @unauthenticated
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
            return response()->json(['message' => 'This email is already being taken', 400]);
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
            'client_token' => $token
        ], 200);
    }

    /**
     * Verify user during login
     * @unauthenticated
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
        $token = $user->createToken('user-access-token', ['*'], now()->plus(weeks: 1))->plainTextToken;

        return response()->json([
            'status' => 'User verified successfully',
            'client_token' => $token
        ], 200);
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
    public function update(Request $request)
    {
        $clientToken = $request->header('X-Client-Token');

        $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email',
            'password' => 'required|min:4|max:255'
        ]);

        $tokenRecord = PersonalAccessToken::findToken($clientToken);
        if ($tokenRecord && $tokenRecord->tokenable_type == User::class){
            $user_id = $tokenRecord->tokenable_id;
            $user = User::find($user_id);
            $user->update($request->all());
            $user->save();
        }
        else{
            return response()->json(['message' => 'Invalid user token was used'], 401);
        }

        return response()->json([
            'status' => 'The user is updated',
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
