import Hero from "../../assets/Images/index-hero.jpg";
import {SiteLayout} from "@/Layouts/SiteLayout.jsx";
import {Sidebar} from "@/Components/Sidebar.jsx";
import {Card} from "@/Components/Card.jsx";
import {Meal} from "@/Components/Teaser/Meal.jsx";


export default function Meals({meals}) {

    return <section className="container px-10 py-6 mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <Sidebar/>

            <section className="col-span-1 lg:col-span-9 ">
                {meals.length ? (
                    <>
                        <h2 className='font-heading text-center text-2xl py-4'>{meals.length} Meals found</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {meals.map((meal) => (
                                <Card
                                    key={meal.name}
                                >
                                    <Meal meal={meal}/>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <Card className="h-full bg-white shadow-md">
                        <div className="text-center space-y-4">
                            <h2 className="font-heading text-2xl">
                                Discover Your Next Favorite Meal
                            </h2>
                            <p className="text-base max-w-xl mx-auto">
                                Use the filters on the left to explore meals by category, area, or ingredients.
                                Whether you're craving something exotic or looking for comfort food classics,
                                there's a delicious recipe waiting for you.
                            </p>
                        </div>
                    </Card>
                )}
            </section>

        </div>
    </section>
}

Meals.layout = (page) => {
    return <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl}
        title={'Plateful - Meals'}
        children={page}
        heroTitle='Plateful'
        heroSubtitle='Explore Our Meals'
        heroSrc={Hero}
    />
}
