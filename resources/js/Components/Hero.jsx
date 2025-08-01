import {Image} from "@/Components/Image.jsx";

export default function Hero({title = '', subtitle = '', src}) {
    return (
        <section
            className="relative h-96 w-full flex items-center justify-center text-center text-white"

        >
            <Image
                className={'absolute inset-0 w-full h-full object-cover rounded-none hover:scale-none'}
                src={src}
                alt="Hero background"
            />
            <div className="relative z-10 max-w-3xl px-6">

                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                    {title}
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    {subtitle}
                </p>
            </div>
        </section>
    );
}
