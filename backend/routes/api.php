<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OffersController;
use App\Http\Controllers\VotesController;
use App\Http\Controllers\UsersController;
use App\Models\User;

Route::resource('user', UsersController::class)->only(['store', 'update'])
->middleware('auth:sanctum');

Route::post('/user/verify', [UsersController::class, 'verifyUser'])
->middleware('auth:sanctum');

Route::post('user/checkAuth', [UsersController::class, 'checkAuth'])
->middleware('auth:sanctum');

Route::get('/offers', [OffersController::class, 'index'])
    ->middleware('auth:sanctum');

Route::get('/offers/form', [OffersController::class, 'form'])
->middleware('auth:sanctum');

Route::get('/offers/{id}', [OffersController::class, 'offers_by_store'])
->middleware('auth:sanctum');

Route::post('/offers/create', [OffersController::class, 'store'])
->middleware('auth:sanctum');



Route::post('/offers/{offer}/votes', [VotesController::class, 'store'])
    ->middleware('auth:sanctum');