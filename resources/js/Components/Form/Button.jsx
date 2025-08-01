import {cn} from "@/Utils/cn.js";

export function Button({
                           children,
                           className,
                           onClick = () => {
                           },
                           disabled,
                           ...props

                       }) {

    return <button
        onClick={onClick}
        disabled={disabled}
        className={cn('p-2 rounded-2xl bg-secondary font-heading text-center  transition-all hover:text-white hover:cursor-pointer ',
            className
        )}
        {...props}
    >

        {children}
    </button>
}
