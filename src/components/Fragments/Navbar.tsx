import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

interface NavbarProps {
    pokemonCount: number;
    berryCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ pokemonCount, berryCount }) => {
    interface DisplayText {
        text: string;
    }
    type SlideDown = number | string;

    // const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
    const { theme, setTheme } = useTheme();
    const [displayText, setDisplayText] = useState<DisplayText>({ text: "Pokémon Adventure" });
    const [key, setKey] = useState<SlideDown>(0);

    // useEffect(() => {
    //     document.documentElement.setAttribute("data-theme", theme);
    //     localStorage.setItem("theme", theme);
    // }, [theme]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayText((prevText) => ({
                text: prevText.text === "Pokémon Adventure" ? "Jadilah Pokémon Master!" : "Pokémon Adventure"
            }));
            setKey((prevKey) => {
                if (typeof prevKey === "number") {
                    return prevKey + 1;
                }
                return prevKey;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const toggleTheme = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTheme(event.target.checked ? "dark" : "light");
    };

    const toggleMobileMenu = (): void => {
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu) {
            mobileMenu.classList.toggle("hidden");
        }
    };

    return (
        <>
            <div className="navbar bg-base-100 shadow-md">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl font-semibold mx-2">
                        <div className="sliding-text">
                            <span key={key} className="animate-slideDown">
                                {displayText.text}
                            </span>
                        </div>
                    </a>
                </div>
                {/* Mobile menu button */}
                <div className="lg:hidden navbar-end">
                    <button className="btn btn-ghost" onClick={toggleMobileMenu}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <div className="menu menu-horizontal px-1 space-x-5 z-0">
                        <Link to="/pokemon">
                            <div className="indicator">
                                <span className="indicator-item badge badge-primary badge-sm">
                                    {pokemonCount}
                                </span>
                                <button className="btn btn-sm hover:text-primary">Pokemon List</button>
                            </div>
                        </Link>
                        <Link to="/bag">
                            <div className="indicator">
                                <span className="indicator-item badge badge-primary badge-sm">
                                    {berryCount}
                                </span>
                                <button className="btn btn-sm hover:text-primary">Bag</button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="navbar-end hidden lg:flex items-center space-x-4 pr-2">
                    <label className="flex items-center cursor-pointer space-x-2">
                        <div className="grid place-items-center">
                            <input
                                type="checkbox"
                                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                            />
                            <svg
                                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <path
                                    d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                                />
                            </svg>
                            <svg
                                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </div>
                    </label>
                </div>
                {/* Mobile menu */}
                <div
                    id="mobile-menu"
                    className="lg:hidden hidden absolute top-14 right-0 bg-base-100 shadow-md w-full z-50 p-4"
                >
                    <div className="menu menu-vertical space-y-4">
                        <Link to="/pokemon">
                            <div className="indicator">
                                <span className="indicator-item badge badge-primary badge-sm">
                                    {pokemonCount}
                                </span>
                                <button className="btn btn-sm hover:text-primary">Pokemon List</button>
                            </div>
                        </Link>
                        <Link to="/bag">
                            <div className="indicator">
                                <span className="indicator-item badge badge-primary badge-sm">
                                    {berryCount}
                                </span>
                                <button className="btn btn-sm hover:text-primary">Bag</button>
                            </div>
                        </Link>
                        <label className="flex items-center cursor-pointer space-x-2">
                            <div className="grid place-items-center">
                                <input
                                    type="checkbox"
                                    className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
                                    checked={theme === "dark"}
                                    onChange={toggleTheme}
                                />
                                <svg
                                    className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                                    />
                                </svg>
                                <svg
                                    className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
