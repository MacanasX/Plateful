import {Image} from "@/Components/Image.jsx";
import {Button} from "@/Components/Form/Button.jsx";
import {router} from "@inertiajs/react";

export function Meal({meal}) {
    return (
        <div className="flex flex-col w-full h-full p-4 rounded-lg ">
            <Image src={meal.thumbnail} alt={meal.name}/>

            <div className="flex flex-col flex-grow justify-between mt-4">
                <div>
                    <h2 className="text-2xl font-heading font-semibold text-center">
                        {meal.name}
                    </h2>
                </div>

                <div className="mt-6">
                    <Button
                        onClick={() => router.get(`/meals/${meal.id}/${meal.slug}`)}
                        className="w-full"
                    >
                        Recipe Details
                    </Button>
                </div>
            </div>
        </div>
    );
}

