<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MealDb\Ingredient;
use Illuminate\Http\Request;

class IngredientSearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('name', '');

        $ingredients = Ingredient::select('name')
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', '%' . $query . '%');
            })
            ->orderBy('name')
            ->limit(20)
            ->get();

        return response()->json($ingredients);
    }
}
