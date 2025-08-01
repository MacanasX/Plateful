<?php

namespace App\Http\Controllers;

use App\Http\Resources\Inertia\MealResource;
use App\Services\MealService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{

    public function __construct(protected MealService $mealService)
    {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        return Inertia::render('Index', [
            'randomMeals' => MealResource::collection($this->mealService->getRandomMeal(3)),
        ]);
    }
}
