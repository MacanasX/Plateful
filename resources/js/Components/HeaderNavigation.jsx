import {Disclosure} from '@headlessui/react';
import {Link} from '@inertiajs/react';
import {cn} from '@/Utils/cn.js';
import Icon from "@mdi/react";
import {mdiMenu} from "@mdi/js";
import {clsx} from "clsx";

export function HeaderNavigation({scrolled}) {
    return (
        <>
            <Disclosure>
                {({close}) => (
                    <>
                        <Disclosure.Button
                            className="md:hidden p-2 rounded focus:outline-none focus:ring"
                            aria-label="Toggle menu"
                        >
                            <Icon
                                className={clsx('transition-colors', {
                                    'text-white': !scrolled,
                                    'text-primary': scrolled,
                                })}
                                path={mdiMenu}
                                size={2}
                                color="currentColor"
                            />
                        </Disclosure.Button>

                        <Disclosure.Panel
                            className={cn(
                                'md:hidden flex flex-col bg-white absolute top-full left-0 w-full shadow-lg z-50',
                                scrolled ? 'bg-primary text-white' : 'text-primary'
                            )}
                        >
                            <Link
                                href="/"
                                className="p-4 border-b border-gray-200 transition-colors hover:text-secondary"
                                onClick={() => close()}
                            >
                                Home
                            </Link>
                            <Link
                                href="/meals"
                                className="p-4 border-b border-gray-200 transition-colors hover:text-secondary"
                                onClick={() => close()}
                            >
                                Recipes
                            </Link>
                            <Link
                                href="/ingredients"
                                className="p-4 border-b border-gray-200 transition-colors hover:text-secondary"
                                onClick={() => close()}
                            >
                                Ingredients
                            </Link>
                            <Link
                                href="/favorites"
                                className="p-4 transition-colors hover:text-secondary"
                                onClick={() => close()}
                            >
                                Favorites
                            </Link>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <nav
                className={cn(
                    'hidden md:flex gap-4 items-center text-lg font-heading font-medium mx-3 md:mx-6',
                    scrolled ? 'text-primary' : 'text-white'
                )}
            >
                <Link href="/" className="transition-colors hover:text-secondary">
                    Home
                </Link>
                <Link href="/meals" className="transition-colors hover:text-secondary">
                    Recipes
                </Link>
                <Link href="/ingredients" className="transition-colors hover:text-secondary">
                    Ingredients
                </Link>
                <Link href="/favorites" className="transition-colors hover:text-secondary">
                    Favorites
                </Link>
            </nav>
        </>
    );
}
