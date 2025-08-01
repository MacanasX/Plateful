<?php

namespace App\Console\Commands;


use App\Models\MealDb\Area;
use App\Models\MealDb\Category;
use App\Models\MealDb\Ingredient;
use App\Services\MealDBService;
use Illuminate\Console\Command;

class ImportMealDbMasterData extends Command
{
    protected MealDBService $mealDbService;

    public function __construct(MealDBService $mealDbService)
    {
        parent::__construct();

        $this->mealDbService = $mealDbService;
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mealdb:import-masterdata';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import categories, areas, and ingredients from MealDB API';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Starting import of MealDB master data...');

        $this->importAreas();
        $this->importCategories();
        $this->importIngredients();

        $this->info('Import finished.');

        return 0;
    }

    protected function importCategories(): void
    {

        $this->info('Importing categories...');
        $response = $this->mealDbService->getCategories();
        if (!$response->isSuccess()) {
            $this->error('Failed to fetch categories.');
            return;
        }
        $response->setRootKey("categories");

        $response->getData()->each(function ($category) {
            Category::updateOrCreate(
                [
                    'mealdb_id' => data_get($category, 'idCategory')
                ],
                [
                    'name' => data_get($category, 'strCategory'),
                    'thumb_url' => data_get($category, 'strCategoryThumb'),
                    'description' => data_get($category, 'strCategoryDescription'),
                ]
            );
        }
        );
        $this->info('Done.');
    }

    protected function importAreas(): void
    {
        $this->info('Importing areas...');
        $response = $this->mealDbService->getAreas();

        if (!$response->isSuccess()) {
            $this->error('Failed to fetch categories.');
            return;
        }
        $response->getData()->each(function ($area) {
            Area::updateOrCreate(
                [
                    'name' => data_get($area, 'strArea'),
                ]
            );
        });

        $this->info('Done.');
    }

    protected function importIngredients(): void
    {
        $this->info('Importing ingredients...');
        $response = $this->mealDbService->getIngredients();
        if (!$response->isSuccess()) {
            $this->error('Failed to fetch ingredients.');
            return;
        }
        $response->getData()->each(function ($ingredient) {
            Ingredient::updateOrCreate(
                [
                    'mealdb_id' => data_get($ingredient, 'idIngredient')
                ],
                [
                    'name' => data_get($ingredient, 'strIngredient'),
                    'description' => data_get($ingredient, 'strDescription'),
                    'type' => data_get($ingredient, 'strType'),
                ]
            );
        });
        $this->info('Done.');
    }
}
