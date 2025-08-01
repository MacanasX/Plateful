import {router} from "@inertiajs/react";
import {Button} from "@/Components/Form/Button.jsx";
import {clsx} from "clsx";


export function Pagination({meta}) {
    if (!meta || meta?.last_page === 1) return null;
    const handleClick = (url) => {
        if (url) {
            router.get(url);
        }
    };

    return (
        <div className='w-full mt-6 flex justify-center'>
            <div
                className={clsx(
                    'grid gap-2 max-w-full',
                    'grid-cols-3 xs:grid-cols-4  sm:flex sm:flex-wrap sm:justify-center'
                )}
            >
                {meta.links.map((link, index) => (
                    <Button
                        key={index}

                        onClick={() => handleClick(link.url)}
                        disabled={!link.url}
                        className={clsx('w-24 text-center',
                            {
                                'bg-secondary':
                                link.active,
                                ' text-black bg-gray-100 hover:bg-primary ':
                                    !link.active,
                                'opacity-50 cursor-not-allowed': !link.url,
                                'hover:cursor-pointer': !!link.url,
                            })}
                    >
                        {link.label.includes('Previous') ? '« Previous' :
                            link.label.includes('Next') ? 'Next »' :
                                link.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}


