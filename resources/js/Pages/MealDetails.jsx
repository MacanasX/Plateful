import Hero from "../../assets/Images/index-hero.jpg";
import {SiteLayout} from "@/Layouts/SiteLayout.jsx";
import {Image} from "@/Components/Image.jsx";
import {Card} from "@/Components/Card.jsx";
import {Badge} from "@/Components/Badge.jsx";
import {useFavorites} from "@/Hooks/useFavorites.js";
import Icon from "@mdi/react";
import {mdiHeart, mdiHeartOutline} from '@mdi/js';
import {clsx} from "clsx";

export default function MealDetails({meal}) {
    const {favorites, toggleFavorite} = useFavorites();
    const isFavorite = favorites.includes(meal.id);

    return (
        <div className="container  mx-auto px-4 py-8 ">
            <div className="mb-6 text-center font-heading ">
                <div className="flex items-center justify-center gap-x-3">
                    <h1 className="text-3xl font-heading leading-none m-0">{meal.name}</h1>

                </div>
                <Icon
                    onClick={() => toggleFavorite(meal)}
                    path={isFavorite ? mdiHeart : mdiHeartOutline}
                    size={1}
                    className={clsx(
                        'm-auto cursor-pointer my-1 transition-colors',
                        isFavorite ? 'text-primary' : 'text-gray-400 hover:text-primary'
                    )}
                />


                {meal.category?.name && (
                    <p className="text-sm text-gray-500">{meal.category.name}</p>
                )}
                {meal.area && <span><strong>{meal.area.name}</strong></span>}
                {meal.tags?.length && (
                    <div className="flex gap-2 mt-2 flex-wrap justify-center">
                        {meal.tags.map(tag => (
                            <Badge key={tag}>#{tag}</Badge>
                        ))}
                    </div>
                )}


            </div>

            <Card className="grid lg:grid-cols-2 gap-4 mb-4">
                <Image
                    src={meal.thumbnail}
                    alt={meal.name}
                />

                <Card className="shadow-none w-full" title="Ingredients">

                    <section className="flex flex-wrap gap-2 justify-center">
                        {meal?.ingredients?.map((ing) => (
                            <Badge key={ing.name}>
                                {ing.name}
                                {ing.measure && (
                                    <span className="ml-1 text-xs text-gray-600">({ing.measure})</span>
                                )}
                            </Badge>
                        ))}
                    </section>
                    {meal.instruction && (
                        <Card className='shadow-none mt-3' title='Instructions'>
                            <p className="whitespace-pre-line ">{meal.instruction}</p>

                        </Card>

                    )}


                </Card>

            </Card>

        </div>
    );
}


MealDetails.layout = (page) => {
    return <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl}
        title={`Plateful - ${page.props.meal.name}`}
        children={page}
        heroTitle='Plateful'
        heroSubtitle='Explore Our Meals'
        heroSrc={Hero}

    />
}
