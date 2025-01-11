<?php

use App\Http\Controllers\API\ArticleController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


############## Auth Controller Endpoints ################
Route::prefix("auth")->group(function (){
    Route::get("/login",[AuthController::class,"login"]);
    Route::post("/login",[AuthController::class,"login"]);
    Route::post("/register",[AuthController::class,"register"]);
});
#########################################################

Route::resource('articles', ArticleController::class)->middleware('auth:sanctum');
