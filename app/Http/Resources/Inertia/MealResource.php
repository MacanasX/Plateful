<?php

namespace App\Http\Resources\Inertia;

use App\Models\MealDb\Area;
use App\Models\MealDb\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class MealResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $ingredients = collect($this->resource)
            ->filter(fn($value, $key) => str_starts_with($key, 'strIngredient') && !empty(trim($value)))
            ->mapWithKeys(function ($value, $key) {
                $index = (int)filter_var($key, FILTER_SANITIZE_NUMBER_INT);
                $measureKey = "strMeasure{$index}";
                return [$index => [
                    'name' => trim($value),
                    'measure' => trim(data_get($this->resource, $measureKey)),
                ]];
            })
            ->values();

        $category = Category::where('name', data_get($this->resource, 'strCategory'))->first();
        $area = Area::where('name', data_get($this->resource, 'strArea'))->first();
        $tags = array_filter(
            explode(',', data_get($this->resource, 'strTags') ?? ''),
            fn($tag) => trim($tag) !== ''
        );
        return [
            'id' => data_get($this->resource, 'idMeal'),
            'slug' => Str::slug(data_get($this->resource, 'strMeal')),
            'area' => AreaResource::make($area),
            'category' => CategoryResource::make($category),
            'alternative' => data_get($this->resource, 'strMealAlternative'),
            'thumbnail' => data_get($this->resource, 'strMealThumb'),
            'name' => data_get($this->resource, 'strMeal'),
            'ingredients' => $ingredients,
            'instruction' => data_get($this->resource, 'strInstructions'),
            'tags' => $tags,
            'src' => data_get($this->resource, 'strSrc'),
            'youtube' => data_get($this->resource, 'strYoutube'),
        ];
    }
}
