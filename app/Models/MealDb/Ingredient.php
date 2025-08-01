<?php

namespace App\Models\MealDb;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Ingredient extends Model
{

    const IMAGE_URL = 'https://www.themealdb.com/images/ingredients/';

    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /* -------------------------------- */
    // Helper functions
    /* -------------------------------- */

    public function generateImageUrl(string $size = null): string
    {
        return match ($size) {
            'small' => self::IMAGE_URL . Str::lower($this->name) . '-small' . '.png',
            'medium' => self::IMAGE_URL . Str::lower($this->name) . '-medium' . '.png',
            'large' => self::IMAGE_URL . Str::lower($this->name) . '-large' . '.png',
            default => self::IMAGE_URL . Str::lower($this->name) . '.png',
        };
    }
}
