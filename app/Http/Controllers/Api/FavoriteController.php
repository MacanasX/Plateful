<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\FavoritesRequest;
use App\Http\Resources\Inertia\MealResource;
use App\Services\MealService;

class FavoriteController extends Controller
{

    public function __construct(protected MealService $mealService)
    {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(FavoritesRequest $request)
    {
        $ids = $request->get('ids', []);

        return response()->json(MealResource::collection($this->mealService->getFavoriteMeals($ids)));
    }
}
