import { useState, useEffect, useRef } from "react";

interface HeaderProps {
    image: string;
    location: string;
    availableCities?: string[];
    defaultLocation?: string;
    onCityChange?: (city: string) => void;
}

export default function Header({ image, location, availableCities = [], defaultLocation, onCityChange }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleCityClick = (city: string) => {
        onCityChange?.(city);
        setIsDropdownOpen(false);
    };

    return (
        <header className="header">
            <div className="top">
                <div className="left">
                    <figure className="avatar">
                        <img src={image} />
                    </figure>

                    <div
                        className="location"
                        ref={dropdownRef}
                        onClick={() => availableCities.length > 0 && setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 1.33334C5.3926 1.33334 2.66667 3.30435 2.66667 6.55073C2.66667 9.62319 7.40741 14.3188 7.58519 14.4928C7.70371 14.6087 7.82223 14.6667 8 14.6667C8.17778 14.6667 8.2963 14.6087 8.41482 14.4928C8.5926 14.3188 13.3333 9.62319 13.3333 6.55073C13.3333 3.30435 10.6074 1.33334 8 1.33334ZM8 8.44444C6.99259 8.44444 6.22222 7.67407 6.22222 6.66667C6.22222 5.65926 6.99259 4.88889 8 4.88889C9.00741 4.88889 9.77778 5.65926 9.77778 6.66667C9.77778 7.67407 9.00741 8.44444 8 8.44444Z" fill="#57419D" />
                        </svg>

                        <p>{location}</p>

                        {availableCities.length > 0 && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#57419D"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        )}

                        {isDropdownOpen && availableCities.length > 0 && (
                            <div className="location-dropdown">
                                {defaultLocation && (
                                    <button
                                        className={`dropdown-item ${location === defaultLocation ? 'active' : ''}`}
                                        onClick={() => handleCityClick(defaultLocation)}
                                    >
                                        {defaultLocation}
                                    </button>
                                )}
                                {availableCities.map((city) => (
                                    <button
                                        key={city}
                                        className={`dropdown-item ${location === city ? 'active' : ''}`}
                                        onClick={() => handleCityClick(city)}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 2.5C8.67393 2.5 7.40216 3.02679 6.46448 3.96447C5.52679 4.90215 5.00001 6.17392 5.00001 7.5V11.6667C5.00001 12.2569 4.84349 12.8309 4.55344 13.3333H15.4466C15.1565 12.8309 15 12.2569 15 11.6667V7.5C15 6.17392 14.4732 4.90215 13.5355 3.96447C12.5979 3.02679 11.3261 2.5 10 2.5ZM18.3333 13.3333C17.8913 13.3333 17.4674 13.1577 17.1548 12.8452C16.8423 12.5326 16.6667 12.1087 16.6667 11.6667V7.5C16.6667 5.73189 15.9643 4.0362 14.7141 2.78596C13.4638 1.53571 11.7681 0.833336 10 0.833336C8.2319 0.833336 6.53621 1.53571 5.28596 2.78596C4.03572 4.0362 3.33334 5.73189 3.33334 7.5V11.6667C3.33334 12.1087 3.15775 12.5326 2.84519 12.8452C2.53263 13.1577 2.1087 13.3333 1.66668 13.3333C1.20644 13.3333 0.833344 13.7064 0.833344 14.1667C0.833344 14.6269 1.20644 15 1.66668 15H18.3333V13.3333ZM8.1402 16.7792C8.53831 16.5482 9.04824 16.6838 9.27918 17.0819C9.35243 17.2081 9.45758 17.313 9.58408 17.3858C9.71059 17.4587 9.85402 17.497 10 17.497C10.146 17.497 10.2894 17.4587 10.4159 17.3858C10.5424 17.313 10.6476 17.2081 10.7208 17.0819C10.9518 16.6838 11.4617 16.5482 11.8598 16.7792C12.2579 17.0101 12.3934 17.52 12.1625 17.9181C11.9427 18.297 11.6273 18.6115 11.2478 18.8301C10.8683 19.0487 10.438 19.1637 10 19.1637C9.56204 19.1637 9.13175 19.0487 8.75223 18.8301C8.37271 18.6115 8.05727 18.297 7.83751 17.9181C7.60658 17.52 7.74209 17.0101 8.1402 16.7792Z"
                            fill="#5533EA"
                        />
                    </svg>
                </div>
            </div>

            <nav className="nav">
                <ul>
                    {["Cats", "Dogs", "Birds", "Other"].map((type) => (
                        <li key={type}>{type}</li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
