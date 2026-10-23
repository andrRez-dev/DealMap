<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OffersController;
use App\Http\Controllers\VotesController;
use App\Http\Controllers\UsersController;

Route::get('/offers', [OffersController::class, 'index'])
    ->middleware('auth:sanctum');
Route::post('/offers/{offer}/votes', [VotesController::class, 'store'])
    ->middleware('auth:sanctum');

Route::resource('user', UsersController::class)->only(['store', 'update'])
->middleware('auth:sanctum');

Route::post('/user/verify', [UsersController::class, 'verifyUser'])
->middleware('auth:sanctum');
