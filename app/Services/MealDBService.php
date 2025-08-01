<?php

namespace App\Services;

use App\Contracts\MealDbContract;
use App\DTOs\MealDbResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;


/**
 * Class MealDBService
 *
 * Handles external API calls to TheMealDB.
 */
class MealDBService implements MealDbContract
{
    /**
     * Get a random meal from the API.
     *
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getRandomMeal(bool $useCache = false): MealDbResponse
    {
        $url = $this->buildUrl('random.php');
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Search for meals by name.
     *
     * @param string $name Name of the meal.
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getMealByName(string $name, bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('search.php', ['s' => $name]);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Get meals that start with a specific letter.
     *
     * @param string $firstLetter A single letter (a-z).
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getMealsByFirstLetter(string $firstLetter, bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('search.php', ['f' => $firstLetter]);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Look up a meal by its ID.
     *
     * @param int $id Meal ID.
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getMealById(int $id, bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('lookup.php', ['i' => $id]);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Get all available categories.
     *
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getCategories(bool $useCache = false): MealDbResponse
    {
        $url = $this->buildUrl('categories.php');
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Filter meals by main ingredient.
     *
     * @param string $ingredient Ingredient name.
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function filterByMainIngredient(string $ingredient, bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('filter.php', ['i' => $ingredient]);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Filter meals by category.
     *
     * @param string $category Category name.
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function filterByCategory(string $category, bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('filter.php', ['c' => $category]);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Filter meals by area of origin.
     *
     * @param string $area Area name.
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function filterByArea(string $area, bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('filter.php', ['a' => $area]);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Get all ingredient images.
     *
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getIngredientImages(bool $useCache = true): MealDbResponse
    {
        $url = $this->buildUrl('list.php', ['i' => 'list']);
        return $this->request(url: $url, useCache: $useCache);

    }

    /**
     * Get a list of all areas.
     *
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getAreas(bool $useCache = false): MealDbResponse
    {
        $url = $this->buildUrl('list.php', ['a' => 'list']);
        return $this->request(url: $url, useCache: $useCache);
    }

    /**
     * Get a list of all ingredients.
     *
     * @param bool $useCache Whether to use cached response.
     * @return MealDbResponse
     */
    public function getIngredients(bool $useCache = false): MealDbResponse
    {
        $url = $this->buildUrl('list.php', ['i' => 'list']);
        return $this->request(url: $url, useCache: $useCache);
    }

    private function request(string $url, string $method = 'GET', array $options = [], bool $useCache = true)
    {
        $cacheKey = $this->makeCacheKey($method, $url, $options);

        return $this->cache($cacheKey, function () use ($method, $url, $options) {
            try {
                $method = strtolower($method);
                $response = Http::$method($url, ...array_values($options));

                if ($response->successful()) {
                    return MealDbResponse::success($response->json());
                }
                return MealDbResponse::error($response->body(), $response->status());
            } catch (\Throwable $e) {
                return MealDbResponse::error($e->getMessage(), $e->getCode());
            }

        }, $useCache);
    }

    private function cache(string $key, \Closure $callback, bool $useCache = true, int $ttl = 3600)
    {
        return $useCache ? Cache::remember($key, $ttl, $callback) : $callback();
    }

    public function buildUrl(string $path, array $query = []): string
    {
        $base = rtrim(config('mealdb.url'), '/') . '/' . trim(config('mealdb.api_key'), '/') . '/' . ltrim($path, '/');
        return $query ? $base . '?' . http_build_query($query) : $base;
    }

    private function makeCacheKey(string $method, string $url, array $options = []): string
    {
        return 'mealdb_' . md5($method . $url . json_encode($options));
    }


}
