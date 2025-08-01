<?php


namespace App\Contracts;

use App\DTOs\MealDbResponse;

interface MealDbContract{

    public function getRandomMeal(bool $useCache = false) : MealDbResponse;
    public function getMealByName(string $name, bool $useCache = true) : MealDbResponse;
    public function getMealsByFirstLetter(string $firstLetter, bool $useCache = true) : MealDbResponse;
    public function getMealById(int $id, bool $useCache = true) : MealDbResponse;
    public function filterByMainIngredient(string $ingredient, bool $useCache = true) : MealDbResponse;
    public function filterByCategory(string $category, bool $useCache = true) : MealDbResponse;
    public function filterByArea(string $area, bool $useCache = true) : MealDbResponse;
    public function getIngredientImages(bool $useCache = true) : MealDbResponse;
    public function getAreas(bool $useCache = false) : MealDbResponse;
    public function getCategories(bool $useCache = false) : MealDbResponse;
    public function getIngredients(bool $useCache = false) : MealDbResponse;

}
