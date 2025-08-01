import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { year } = usePage().props;

    return (
        <footer className='w-full flex bg-primary  items-center border-t border-white  justify-center  @container/footer'>
            <p className='text-sm text-white m-2 p-2'>
                © {year} Plateful - All rights reserved
            </p>
        </footer>
    );
}
