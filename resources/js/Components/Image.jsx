import {cn} from "@/Utils/cn.js";

export function Image({
                          src,
                          alt = '',
                          onClick = () => {
                          }, className = '',
                          ...props
                      }) {

    return <img src={src}
                alt={alt}
                onClick={onClick}
                className={cn(
                    'object-cover rounded-lg transition-transform overflow-hidden duration-300 ease-in-out hover:scale-105 ',
                    className
                )}
                loading="lazy"
                {...props}
    />


}
