import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * Combine class names with clsx and resolve Tailwind conflicts with twMerge
 */
export function cn(...inputs) {
    return twMerge(clsx(...inputs));
}
