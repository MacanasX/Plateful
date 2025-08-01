import {Logo} from "@/Components/Logo.jsx";
import {useEffect, useState} from "react";
import {HeaderNavigation} from "@/Components/HeaderNavigation.jsx";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 0);
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const color = scrolled ? '#FF7043' : '#FFFFFF';
    return (
        <header
            className={`w-full h-20 flex sticky top-0 items-center justify-between z-50 transition-colors duration-300 ${
                scrolled
                    ? 'bg-white shadow-lg'
                    : 'bg-primary'
            }`}
        >
            <Logo color={color}/>
            <HeaderNavigation scrolled={scrolled}/>
        </header>
    );
}
