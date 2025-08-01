import Hero from "../../assets/Images/index-hero.jpg";
import {SiteLayout} from "@/Layouts/SiteLayout.jsx";
import {useFavorites} from "@/Hooks/useFavorites.js";
import {Loader} from "@/Components/Loader.jsx";
import useSWR from "swr";
import {Card} from "@/Components/Card.jsx";
import {Meal} from "@/Components/Teaser/Meal.jsx";


const fetcher = (url) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
    });
export default function Favorites() {
    const {favorites: favoriteIds} = useFavorites();

    const {data: favorites = [], isLoading, error} = useSWR(
        favoriteIds?.length > 0 ? `/api/favorites?ids=${encodeURIComponent(favoriteIds)}` : null,
        fetcher,
    );

    return <div className="container mx-auto px-6 py-10">
        <section className="text-center max-w-3xl mx-auto mb-12">
            {isLoading ? (
                <Loader title="Loading Favorites..."/>
            ) : favorites?.length > 0 ? (
                <>
                    <h2 className="font-heading text-3xl mb-6">Your Favorite Meals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {favorites.map((meal) => (
                            <Card key={meal.name}>
                                <Meal meal={meal}/>
                            </Card>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <h2 className="font-heading text-2xl mb-4">
                        You don't have any favorites yet.
                    </h2>
                    <p className="text-gray-600">
                        Browse items and click the heart icon to add them to your favorites.
                        Your favorites will appear here for quick access later.
                    </p>
                </div>
            )}
        </section>
    </div>
}

Favorites.layout = (page) => (
    <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl}
        title='Plateful'
        children={page}
        heroTitle='Plateful'
        heroSubtitle='Your Favorites'
        heroSrc={Hero}
    />
)
