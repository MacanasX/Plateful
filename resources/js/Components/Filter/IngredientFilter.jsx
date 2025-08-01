import {useEffect, useMemo, useRef, useState} from "react";
import useSWR from "swr";
import {router, usePage} from "@inertiajs/react";
import {Loader} from "@/Components/Loader.jsx";
import {clsx} from "clsx";


const fetcher = (url) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    });

export function IngredientFilter() {
    const {ingredient} = usePage().props.filters;
    const [query, setQuery] = useState(ingredient || '');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const containerRef = useRef(null);


    const debouncedSetQuery = useMemo(() => {
        return debounce(setDebouncedQuery, 400);
    }, []);

    useEffect(() => {
        debouncedSetQuery(query);
    }, [query, debouncedSetQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const {data: ingredients = [], isLoading, error} = useSWR(
        debouncedQuery ? `/api/ingredients?name=${encodeURIComponent(debouncedQuery)}` : null,
        fetcher,
        {
            dedupingInterval: 10000,
        }
    );

    const handleSelectedIngredient = (ingredient) => {
        setQuery(ingredient.name);
        router.get(
            '/meals',
            {ingredient: ingredient.name},
            {
                preserveState: true,
                only: ["meals", "filters"],
            },
        );
    }

    return (
        <div ref={containerRef}>
            <h3 className="font-heading">Ingredients</h3>
            <div className="space-y-1.5 mt-2">
                <div className="relative w-full">
                    <input
                        onFocus={() => setDropdownOpen(true)}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search ingredients..."
                        className="w-full border px-3 py-2 rounded pr-10"
                    />
                    {isLoading && (
                        <div className="absolute inset-y-0 right-4 top-3 flex items-center">
                            <Loader className="w-5 h-5 text-gray-500"/>
                        </div>
                    )}
                </div>

                {dropdownOpen && ingredients.length > 0 && (
                    <ul className={clsx("absolute z-50 w-full bg-white border rounded mt-1 shadow max-h-60 overflow-y-auto", {"hidden": !ingredients.length})}>
                        {ingredients.map((ingredient) => (
                            <li
                                key={ingredient.name}
                                onClick={() => {
                                    handleSelectedIngredient(ingredient);
                                    setDropdownOpen(false); // Close after selection
                                }}
                                className={clsx("px-3 py-2 hover:bg-secondary cursor-pointer", {"bg-primary": ingredient.name === query})}
                            >
                                {ingredient.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
