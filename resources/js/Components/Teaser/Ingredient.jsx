import {Image} from "@/Components/Image.jsx";
import {useState} from "react";
import {Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {Button} from "@/Components/Form/Button.jsx";
import {cn} from "@/Utils/cn.js";
import {Badge} from "@/Components/Badge.jsx";
import {router} from "@inertiajs/react";

export function Ingredient({ingredient}) {
    let [isOpen, setIsOpen] = useState(false);

    const handleSearchClick = () => {
        router.get("/meals", {ingredient: ingredient.name});
    };
    return (
        <div className="flex flex-col w-full h-full p-4 rounded-lg relative">
            <Image
                src={ingredient?.image}
                alt={ingredient.name}
                onClick={ingredient?.description ? () => setIsOpen(true) : () => {
                }}
                className={cn({'hover:cursor-pointer': ingredient?.description})}

            />
            {ingredient?.type && (
                <Badge className="font-heading mt-2 self-center min-h-[1.5rem]">
                    {ingredient.type}
                </Badge>
            )}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30"/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                    <DialogPanel className="max-w-lg space-y-4 border bg-gray-100 p-12 rounded-2xl">
                        <DialogTitle className="font-heading">{ingredient?.name}</DialogTitle>
                        <Description>{ingredient?.description}</Description>
                        <div className="flex gap-4">
                            <Button onClick={() => setIsOpen(false)}>Close</Button>
                        </div>
                    </DialogPanel>
                </div>

            </Dialog>

        </div>
    );
}
