import {SiteLayout} from "@/Layouts/SiteLayout.jsx";
import Hero from '../../assets/Images/index-hero.jpg';
import {Card} from "@/Components/Card.jsx";
import {Meal} from "@/Components/Teaser/Meal.jsx";
import {Link} from "@inertiajs/react";

export default function Index({randomMeals = []}) {
    return (
        <>
            <main className="container px-10 py-6 mx-auto mt-10">
                <section className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl font-bold font-heading mb-4">Welcome to Plateful</h1>
                    <p className="text-lg text-gray-700">
                        Whether you're a seasoned chef or just starting out in the kitchen,
                        Plateful is your companion to discover delicious, easy-to-follow meals from around the world.
                        Explore categories, search ingredients, or try something random!
                    </p>
                    <Link href="/meals" className="text-secondary hover:underline  text-xl">
                        Discover
                    </Link>
                </section>

                <section className="w-full  mb-10 mx-auto ">
                    <div className="text-center space-y-4 mb-6">
                        <h2 className="text-3xl font-bold font-heading">Feeling Hungry?</h2>
                        <p className="text-gray-700 text-base max-w-xl mx-auto">
                            Here's a randomly selected meal to inspire your next cooking adventure!
                            Whether you're planning dinner or just curious, give it a try — you might discover a
                            new
                            favorite.
                        </p>
                    </div>
                    <div className='flex flex-col md:flex-row   gap-x-7 0'>
                        {randomMeals?.map((meal) => <Card key={meal?.id} className="my-3 shadow-none p-6 bg-gray-100">
                                <Meal meal={meal}/>

                            </Card>
                        )}
                    </div>
                </section>


                <Card className='bg-white shadow-none my-5' title='About Plateful'>
                    <p>
                        Plateful is a curated collection of meals designed to inspire home cooks.
                        Whether you're looking for comfort food, international flavors, or healthy alternatives,
                        we’ve
                        got
                        something for every taste.
                    </p>
                    <p>
                        Use our sidebar to explore by category, area, or ingredient — or take a chance with a random
                        meal
                        suggestion!
                    </p>

                </Card>
            </main>

        </>
    );
}


Index.layout = (page) => (
    <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl}
        title='Plateful'
        children={page}
        heroTitle='Plateful'
        heroSrc={Hero}
    />)



