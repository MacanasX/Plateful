<?php

namespace App\Http\Resources\Inertia;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'thumb_url' => $this->thumb_url,
            'description' => $this->description,
        ];
    }
}
