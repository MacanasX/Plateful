import {router} from "@inertiajs/react";

export function Logo({color = "white"}) {
    return <svg
        width="200"
        height="60"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => router.get('/')}
        className={'hover:cursor-pointer'}>
        <text x="50%" y="50%" fill={color} fontSize="32"
              fontFamily="'Nunito Sans', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
              dominantBaseline="middle" textAnchor="middle">
            Plateful
        </text>
    </svg>

}

