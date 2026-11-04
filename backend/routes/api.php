<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OffersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\StoresController;
use App\Http\Controllers\VotesController;
use App\Http\Controllers\UsersController;
use App\Support\ClientTokenResolver;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::post('user', [UsersController::class, 'store'])
->middleware('auth:sanctum');

Route::post('/user/verify', [UsersController::class, 'verifyUser'])
->middleware('auth:sanctum');

Route::post('user/checkAuth', [UsersController::class, 'checkAuth'])
->middleware('auth:sanctum');

Route::get('/user/reset-password', [UsersController::class, 'sendResetLinkEmail'])
->middleware(['auth:sanctum', 'throttle:6,1']);

Route::post('/user/reset-password', [UsersController::class, 'resetPassword'])
->middleware('auth:sanctum');

Route::get('user/email/verify', [UsersController::class, 'verifyEmail'])->middleware(['signed'])->name('verification.verify');

Route::post('/user/email/verification-notification', 
/**
 * Resend email for verification
 */
function (Request $request, ClientTokenResolver $tokenResolver) {
    $user = $tokenResolver->resolveUser($request, required: true)
            ?? abort(401, 'A user access token is required.');
    $user->sendEmailVerificationNotification();
 
    return response()->json(['message' => 'Verification link sent!'], 200);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');


Route::post('/user/change-email', [UsersController::class, 'changeEmail'])
->middleware(['auth:sanctum', 'throttle:6,1'])->name('email.verify.new');

Route::get('/user/change-email', [UsersController::class, 'verifyNewEmail'])
->middleware('signed')->name('email.change.confirm');;


Route::get('/offers', [OffersController::class, 'index'])
->middleware('auth:sanctum');

Route::get('/offers/form', [OffersController::class, 'form'])
->middleware('auth:sanctum');

Route::get('/offers/{id}', [OffersController::class, 'offers_by_store'])
->middleware('auth:sanctum');

Route::post('/offers/create', [OffersController::class, 'store'])
->middleware('auth:sanctum');

Route::patch('/offers/setInactive', [OffersController::class, 'setInactive'])
->middleware('auth:sanctum');


Route::get('/products/search', [ProductsController::class, 'search'])
->middleware('auth:sanctum');


Route::post('/offers/{offer}/votes', [VotesController::class, 'store'])
    ->middleware('auth:sanctum');


Route::get('/stores/get', [StoresController::class, 'getStores'])
->middleware('auth:sanctum');
