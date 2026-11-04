<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use App\Support\ClientTokenResolver;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Mockery\Generator\StringManipulation\Pass\Pass;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Notification;
use App\Notifications\VerifyNewEmail;

class UsersController extends Controller
{
    /**
     * Store a newly created user in storage.
     *
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|unique:users,email',
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

        event(new Registered($user));

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

        $user = User::where('email', $validated['login'])
            ->orWhere('name', $validated['login'])
            ->first();

        if (! $user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        
        if (! Hash::check($validated['password'], $user->password_hash)) {
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
    * Checking authorization of the token
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
    * Send verification email for password reset
    */

    public function sendResetLinkEmail(Request $request) : JsonResponse{
        $validated = $request->validate([
            'email' => 'required|email'
        ]);
        $status = Password::sendResetLink(['email' => $validated['email']]);
    
        if(Password::RESET_LINK_SENT){
            return response()->json([
                'message' => __($status)
            ]);
        }
        return response()->json(['message' => __($status)], 400);
        
    }
    /**
    * Reset password after verification through email
    */

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|max:255|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, string $password) {
                $user->forceFill([
                    'password_hash' => Hash::make($password),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => __($status)]);
        }

        return response()->json(['message' => __($status)], 400);
    }

    /**
     * Verify email on a register stage
     */
    public function verifyEmail(Request $request): JsonResponse{
        $id = $request->query('id');
        $user = User::findOrFail($id);

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified']);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }
        return response()->json([
            'message' => 'Email verified successfully!'
        ], 200);
    }


    /**
     * Change email initiation
     */
    public function changeEmail(Request $request, ClientTokenResolver $tokenResolver) : JsonResponse{
        $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
        
        $request->validate([
            'new_email' => 'required|email|unique:users,email'
        ]);

        $newEmail = $request['new_email'];

        $signedUrl = URL::temporarySignedRoute(
            'email.verify.new',
            now()->addMinutes(60),
            [
                'id' => $user->getKey(),
                'hash' => sha1($newEmail),
                'new_email' => $newEmail
            ]
        );
        $queryString = parse_url($signedUrl, PHP_URL_QUERY);
        $frontendUrl = config('app.frontend_url') . '/confirm-email-change?' . $queryString;

        Notification::route('mail', $newEmail)->notify(new VerifyNewEmail($frontendUrl));
        return response()->json([
            'message' => 'Link for verification is sended to the new email!'
        ], 200);
    }

    /**
     * Verifying new email
     */
    public function verifyNewEmail(Request $request){
        $id = $request->query('id');
        $hash = $request->query('hash');
        $newEmail = $request->query('new_email');

        if (! hash_equals((string) $hash, sha1($newEmail))) {
            return response()->json(['message' => 'Expired request parameters'], 400);
        }

        $user = User::findOrFail($id);

        if (User::where('email', $newEmail)->where('id', '!=', $user->id)->exists()) {
            return response()->json(['message' => 'This email is already took by another user'], 422);
        }

        $user->forceFill([
            'email' => $newEmail,
            'email_verified_at' => now(),
        ])->save();

        return response()->json([
            'message' => 'Email successfully verified!'
        ]);
    }
}
