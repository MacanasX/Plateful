<?php

namespace App\Http\Controllers;

use App\Http\Resources\Inertia\IngredientResource;
use App\Models\MealDb\Ingredient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IngredientController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $ingredients = Ingredient::orderBy('name')->paginate(16)->onEachSide(1);
        return Inertia::render('Ingredients', ['ingredients' => IngredientResource::collection($ingredients)]);
    }
}
