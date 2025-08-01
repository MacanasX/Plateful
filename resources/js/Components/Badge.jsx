import {cn} from "@/Utils/cn.js";

export function Badge({
                          onClick = () => {
                          }, children, className = ""
                      }) {
    return (
        <span
            onClick={onClick}
            className={cn('inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium', className)}
        >
            {children}
        </span>
    );
}
