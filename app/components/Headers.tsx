import { Menu, Search } from "lucide-react"

export interface MovieDetails {
    id: number;
    title: string;
    description: string;
    poster: string;
}



export const Headers = () => {
    return <div>
        {/* Header */}
        <header className="flex  items-center align-middle w-full h-16 mx-auto p-1 bg-gray-900 shadow-lg/100 fixed z-20 mb-28">
            <nav className="flex justify-between items-center align-middle h-14 w-[90%] mx-auto">
                <h1 className="text-left text-lg md:text-xl text-white font-sans capitalize">
                    my movie app
                </h1>
                {/* menu icon */}
                <Menu className="text-right text-md text-indigo-600 flex md:hidden" />
                <ol className="hidden md:flex">

                    <li className="mx-3 text-white text-sm hover:text-indigo-600 font-normal cursor-pointer">
                        Drama
                    </li>

                    <li className="mx-3 text-white text-sm hover:text-indigo-600 font-normal cursor-pointer">
                        Thriller
                    </li>
                    <li className="mx-3 text-white text-sm hover:text-indigo-600 font-normal cursor-pointer">
                        Action
                    </li>
                    <li className="mx-3 text-white text-sm hover:text-indigo-600 font-normal cursor-pointer">
                        Comedy
                    </li>
                </ol>
                <div className="lg:flex items-center align-middle mx-3 hidden">
                    <div className="flex align-middle p-2 border border-indigo-400 rounded-lg">
                        {/* search icon */}
                        <Search className="mx-2 text-xs text-indigo-600" />
                        <input
                            type="search"
                            placeholder="search movies.."
                            className="text-gray-400 text-sm outline-none"
                        />
                    </div>
                    {/* button */}
                    <button
                        className="text-white text-sm bg-indigo-600 hover:bg-indigo-700 py-2 px-3 mx-2 rounded-lg cursor-pointer  transition-transform duration-300 hover:scale-102"
                    >
                        Search
                    </button>
                </div>
            </nav>
        </header>
    </div>
}