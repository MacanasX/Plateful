<?php

use App\Http\Controllers\Api\FavoriteController as FavoriteApiController;
use App\Http\Controllers\Api\IngredientSearchController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\MealController;
use Illuminate\Support\Facades\Route;


Route::get('/', IndexController::class);
Route::get('/ingredients', IngredientController::class);

Route::prefix('api')->group(function () {
    Route::get('/ingredients', [IngredientSearchController::class, 'index']);
    Route::get('/favorites', FavoriteApiController::class);
});

Route::controller(MealController::class)->group(function () {
    Route::get('/meals', 'index');
    Route::get('/meals/{id}/{slug}', 'show');
});
Route::get('/favorites', FavoriteController::class);


