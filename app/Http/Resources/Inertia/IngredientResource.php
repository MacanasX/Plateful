<?php

namespace App\Http\Resources\Inertia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class IngredientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'mealddb_id' => $this->mealdb_id,
            'name' => $this->name,
            'description' => $this->description,
            'type' => $this->type,
            'image' => $this->generateImageUrl(),
        ];
    }
}
