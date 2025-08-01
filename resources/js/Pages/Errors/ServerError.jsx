import {router} from '@inertiajs/react';
import {SiteLayout} from "@/Layouts/SiteLayout.jsx";
import Hero from '../../../assets/Images/index-hero.jpg';
import {Button} from "@/Components/Form/Button.jsx";

export default function ServerError({statusCode}) {
    return (
        <div className='flex min-h-screen w-full flex-col items-center justify-center  px-6 bg-primary '>
            <h1 className=' font-heading select-none font-extrabold text-[140px] leading-none lg:text-[220px]'>
                {statusCode}
            </h1>

            <div className='mt-4 max-w-xl text-center text-2xl'>
                <h2 className='font-heading text-3xl tracking-tight  sm:text-4xl  inline-block px-6 py-3'>
                    Oops, something went wrong.
                </h2>

                <p className='mt-6'>
                    Our server is having trouble processing your request. Please
                    reload the page or try again later.
                </p>
            </div>


            <Button className='mt-10 w-1/4' onClick={() => router.reload()}> Reload</Button>
        </div>
    );
}

ServerError.layout = (page) => (
    <SiteLayout
        robots='noindex, nofollow'
        canonical={page.props.appUrl}
        title='LinkDrop - Error'
        children={page}
        heroTitle='Plateful'
        heroSubtitle='Explore Our Meals'
        heroSrc={Hero}
    />
);
