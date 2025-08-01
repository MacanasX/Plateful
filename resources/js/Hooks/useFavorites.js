import {useEffect, useState} from 'react';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        if (typeof window === 'undefined') return [];
        const saved = localStorage.getItem('favoriteMeals');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (meal) => {
        setFavorites((current) => {
            const exists = current.find((m) => m === meal.id);
            if (exists) {
                return current.filter((m) => m !== meal.id);
            } else {
                return [...current, meal.id];
            }
        });
    };

    return {favorites, toggleFavorite};
}
