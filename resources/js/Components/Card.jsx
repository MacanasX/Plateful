import {cn} from "@/Utils/cn.js";

export function Card({title, children, className = ''}) {
    return (
        <div className={cn('rounded-xl  bg-gray-100 p-6 shadow-sm', className)}>
            {title && <h2 className="font-heading  text-center text-xl mb-4">{title}</h2>}
            {children}
        </div>
    );
}
