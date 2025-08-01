import {SiteLayout} from "@/Layouts/SiteLayout.jsx";
import Hero from "../../assets/Images/index-hero.jpg";
import {Card} from "@/Components/Card.jsx";
import {Ingredient} from "@/Components/Teaser/Ingredient.jsx";
import {Pagination} from "@/Components/Pagination.jsx";


export default function Ingredients({ingredients}) {
    return (
        <div className="container mx-auto px-6 py-10">
            <h1 className="text-3xl font-heading mb-6 text-center">Ingredients</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ingredients.data.map((ingredient) => (
                    <Card key={ingredient.id} title={ingredient.name}>
                        <Ingredient ingredient={ingredient}/>
                    </Card>
                ))}
            </div>
            <Pagination meta={ingredients.meta}/>
        </div>
    );
}

Ingredients.layout = (page) => (
    <SiteLayout
        robots='index, follow'
        canonical={page.props.appUrl}
        title='Plateful'
        children={page}
        heroTitle='Ingredients'
        heroSubtitle='Explore Our Ingredients'
        heroSrc={Hero}
    />)
