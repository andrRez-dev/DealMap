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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $responseCode = 200;
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email',
            'password' => 'required|min:4|max:255'
        ]);

        try {
            $checkIsAlreadyExists = User::where('email', $validated['email'])->exists();
            if($checkIsAlreadyExists){
                $responseCode = 400;
                throw new Exception('This email is already being taken');
            }
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password_hash' => Hash::make($validated['password']),
                'is_active' => true
            ]);

            $token = $user->createToken('user-access-token', ['*'], now()->plus(weeks: 1))->plainTextToken;


        } catch (\Throwable $th) {
            if ($responseCode == 200){
                $responseCode = 500;
            }
            return response()->json([
                'status' => 'Failed. Check message',
                'message' => $th->getMessage()
            ], $responseCode);
        }

        return response()->json([
            'status' => 'The user is added',
            'client_token' => $token
        ], $responseCode);
    }

    /**
     * Display the specified resource.
     */
    public function verifyUser(Request $request)
    {
        $responseCode = 200;

        $validated = $request->validate([
            'login' => 'required|string|min:3|max:255',
            'password' => 'required|min:4|max:255'
        ]);
        try {
            if (!User::where('email', $validated['login'])->exists()){
                if(!User::where('name', $validated['login'])->exists()){
                    return response()->json([
                        'status' => 'User not found'
                    ], 404);
                }
            }

            $user = User::where('name', $validated['login'])->first();
            
            if(!Hash::check($validated['password'], $user->password_hash)){
                $responseCode = 403;
                throw new Exception('Incorrect password');
            }
            $user->tokens()->delete();
            $token = $user->createToken('user-access-token', ['*'], now()->plus(weeks: 1))->plainTextToken;
        } catch (\Throwable $th) {
            if($responseCode == 200){
                $responseCode = 500;
            }
            return response()->json([
                'status' => 'Failed. Check message',
                'message' => $th->getMessage()
            ], $responseCode);
        }

        return response()->json([
            'status' => 'User verified successfully',
            'client_token' => $token
        ], $responseCode);
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
    public function update(Request $request)
    {
        $clientToken = $request->header('X-Client-Token');
        $responseCode = 200;

        $request->validate([
            'name' => 'required|alpha',
            'email' => 'required|email',
            'password' => 'required|min:4|max:255'
        ]);

        try {
            $tokenRecord = PersonalAccessToken::findToken($clientToken);
            if ($tokenRecord && $tokenRecord->tokenable_type == User::class){
                $user_id = $tokenRecord->tokenable_id;
                $user = User::find($user_id);
                $user->update($request->all());
                $user->save();
            }
            else{
                $responseCode = 401;
                throw new Exception('Invalid user token was used');
            }
        } catch (\Throwable $th) {
            if($responseCode == 200){
                $responseCode = 500;
            }
            return response()->json([
                'status' => 'Failed. Check message',
                'message' => $th->getMessage()
            ], $responseCode);
        }

        return response()->json([
            'status' => 'The user is updated',
        ], $responseCode);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $responseCode = 200;
        try {
            $user = User::find($id);
            if(!$user){
                $responseCode = 404;
                throw new Exception('No user found');
            }
        } catch (\Throwable $th) {
            if($responseCode == 200){
                $responseCode = 500;
            }
            return response()->json([
                'status' => 'Failed. Check message',
                'message' => $th->getMessage()
            ], $responseCode);
        }
    }
}
