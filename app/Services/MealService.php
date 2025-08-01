<?php

namespace App\Services;


use App\DTOs\MealDbResponse;
use App\Http\Resources\Inertia\MealResource;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class MealService
{
    public function __construct(protected MealDBService $mealDBService)
    {

    }

    public function getRandomMeal(int $count = 1): MealResource|Collection
    {
        if ($count === 1) {
            $response = $this->mealDBService->getRandomMeal();
            return MealResource::make($response->getData()->first());
        }
        $url = $this->mealDBService->buildUrl('random.php');
        $responses = Http::pool(fn(Pool $pool) => collect(range(1, $count))->map(fn() => $pool->get($url))->toArray());

        $meals = collect();

        foreach ($responses as $response) {
            if ($response->ok()) {
                $data = $response->json();
                $meal = $data['meals'][0];

                if (!$meals->contains('idMeal', $meal['idMeal'])) {
                    $meals->push((object)$meal);
                }
            }
        }
        return $meals;
    }

    public function filterByParams(array $params)
    {
        $filterType = collect(['category', 'area', 'ingredient'])
            ->first(fn($key) => !empty($params[$key]));

        if (!$filterType) return collect();

        $response = match ($filterType) {
            'category' => $this->mealDBService->filterByCategory(category: $params['category']),
            'area' => $this->mealDBService->filterByArea(area: $params['area']),
            'ingredient' => $this->mealDBService->filterByMainIngredient(ingredient: $params['ingredient']),
            default => null,
        };

        if (!$response->isSuccess()) {
            return collect();
        }

        return MealResource::collection($response->getData()->sortBy('strMeal'));
    }

    public function getMealById(string $id): MealDbResponse
    {
        return $this->mealDBService->getMealById($id);
    }

    public function getFavoriteMeals(array $ids): Collection
    {
        if (empty($ids)) {
            return collect();
        }

        $responses = Http::pool(fn(Pool $pool) => collect($ids)->map(function ($id) use ($pool) {
            $url = $this->mealDBService->buildUrl('lookup.php', ['i' => $id]);
            return $pool->get($url);
        })->toArray());

        $meals = collect();

        foreach ($responses as $response) {
            if ($response->ok()) {
                $data = $response->json();
                $meal = $data['meals'][0] ?? null;

                if ($meal && !$meals->contains('idMeal', $meal['idMeal'])) {
                    $meals->push((object)$meal);
                }
            }
        }

        return $meals;
    }

}
