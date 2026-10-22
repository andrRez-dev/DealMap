<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;


Route::resource('user', UsersController::class)->only(['store', 'update'])
->middleware('auth:sanctum');

Route::post('/user/verify', [UsersController::class, 'verifyUser'])
->middleware('auth:sanctum');
