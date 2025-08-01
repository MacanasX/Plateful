<?php

namespace App\Http\Controllers;


use App\Http\Resources\Inertia\MealResource;
use App\Models\MealDb\Area;
use App\Models\MealDb\Category;
use App\Services\MealService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    public function __construct(protected MealService $mealService)
    {
    }

    public function index(Request $request)
    {
        return Inertia::render('Meals', [
                'meals' => $this->mealService->filterByParams($request->query->all()),
                'filterOptions' => [
                    'categories' => fn() => Category::select('mealdb_id', 'name')->orderBy('name')->get(),
                    'areas' => fn() => Area::where('name', '!=', 'Unknown')->select('name')->orderBy('name')->get(),
                ],
                'filters' => fn() => collect($request->only('area', 'category', 'ingredient'))->toArray()
            ]
        );
    }

    /**
     * Handle the incoming request.
     */
    public function show(Request $request, string $id, string $slug)
    {

        if (!$slug || !$id) abort(404);
        $meal = $this->mealService->getMealById($id);

        if (!$meal->isSuccess() || $meal->getData()?->isEmpty()) abort(404);

        return Inertia::render('MealDetails', ['meal' => MealResource::make($meal->getData()->first())]);
    }
}
