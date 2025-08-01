import {Radio} from "@/Components/Form/Radio.jsx";
import {router, usePage} from "@inertiajs/react";

export function CategoryFilter() {
    const {filterOptions, filters} = usePage().props;
    const selectedCategory = filters.category;

    const handleCategoryChange = (name) => {
        const isSame = selectedCategory === name;

        router.get(
            '/meals',
            isSame ? {} : {category: name},
            {
                preserveState: true,
                only: ["meals", "filters"],
            },
        );
    }

    return <div>
        <h3 className="font-heading">Categories</h3>
        <div className="space-y-1.5 mt-2">
            {filterOptions.categories.map((category) => (
                <Radio
                    key={category.name}
                    id={category.name}
                    label={category.name}
                    type="radio"
                    name="categoryFilter"
                    value={category.name}
                    checked={category.name === filters.category}
                    onChange={() => handleCategoryChange(category.name)}
                    onClick={() => {
                        if (category.name === filters.category) {
                            handleCategoryChange(category.name);
                        }
                    }}
                />
            ))}
        </div>
    </div>
}
