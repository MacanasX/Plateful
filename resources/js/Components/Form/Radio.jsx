import {cn} from "@/Utils/cn.js";

export function Radio({label, ...props}) {
    return (
        <div>
            <label
                className={cn(
                    "flex items-center w-full text-sm text-neutral-900 relative pl-[28px] select-none",
                    {
                        "cursor-not-allowed": props.disabled || props.readOnly,
                        "cursor-pointer": !props.disabled || !props.readOnly,
                    },
                )}
            >
                <input
                    className={cn(
                        "size-5 absolute top-0 left-0 accent-brand-1 ease-in duration-200 accent-secondary",
                        {
                            "bg-gray-200 cursor-not-allowed":
                                props.disabled || props.readOnly,
                            "bg-white hover:bg-gray-300":
                                !props.disabled || !props.readOnly,
                        },
                    )}
                    type="radio"
                    onClick={props.onClick}
                    {...props}
                />
                {label}
            </label>
        </div>
    );
}
