export function Loader({title = ''}) {
    return (
        <div className="min-h-[200px] flex items-center justify-center">
            <div>
                <div className="h-8 mb-3 text-center">
                    <svg className="w-8 h-8 mx-auto text-primary" width="88px" height="88px"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <rect x="0" y="0" width="100" height="100" fill="none"/>
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeOpacity="0.2" fill="none"
                                strokeWidth="8"
                                strokeLinecap="round">
                            <animate id="animation1" attributeName="opacity" from="0.5" to="1" dur="1s"
                                     begin="0s;animation2.end"/>
                            <animate id="animation2" attributeName="opacity" from="1" to="0.5" dur="1s"
                                     begin="animation1.end"/>
                        </circle>
                        <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth="8"
                                strokeLinecap="round">
                            <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0"
                                     to="502"/>
                            <animate attributeName="stroke-dasharray" dur="1.5" repeatCount="indefinite"
                                     values="150.6 100.4;1 250;150.6 100.4"/>
                        </circle>
                    </svg>
                </div>
                <span className="w-full block font-bold text-sm">{title}</span>
            </div>
        </div>
    );
}
