import {CategoryFilter} from "@/Components/Filter/CategoryFilter.jsx";
import {AreaFilter} from "@/Components/Filter/AreaFilter.jsx";
import {IngredientFilter} from "@/Components/Filter/IngredientFilter.jsx";
import {Button} from "@/Components/Form/Button.jsx";
import {router} from "@inertiajs/react";


export function Sidebar() {
    return <aside className="block lg:col-span-3">
        <div className="rounded-lg bg-white  p-4 sticky top-6 space-y-7">
            <IngredientFilter/>
            <AreaFilter/>
            <CategoryFilter/>
            <Button onClick={() => router.get('/meals')} className='w-full'>Reset Filter</Button>
        </div>
    </aside>
}
