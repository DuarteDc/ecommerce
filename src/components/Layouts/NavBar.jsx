import Link from "next/link";
import { BeakerIcon } from '@heroicons/react/solid'

const NavBar = () => {
    const categories = [1,2,3,4,5,6,7];
    return (
        <section>
            <nav className="flex items-center justify-between flex-wrap bg-[#ff9f30] py-6 px-12">
                <div className="flex items-center flex-shrink-0 text-black mr-6">
                    <span className="font-semibold text-xl tracking-tight cursor-pointer">Lorem</span>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center container">
                    <div className="lg:flex-grow flex items-center">
                        <input type="text" className="rounded-lg md:w-2/3 py-2 px-4 focus:border-[#fa440a] focus:ring-[#fa440a] focus:ring-1 focus:outline-none" placeholder="Search..,"/>
                        <button className="mx-2 p-2 bg-[#a85d08] text-white font-semibold rounded-lg hover:bg-[#ff9f30]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="cursor-pointer">
                        My acount
                    </div>
                </div>
            </nav>
            <header className="px-10 bg-[#ff9f30] py-1 flex justify-between">
                <ul className="flex flex-row">
                    <li className="flex items-center mx-2 hover:bg-[#a85d08] hover:rounded cursor-pointer">
                        categorias
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </li>
                    <li className="flex items-center mx-2 hover:bg-[#a85d08] hover:rounded cursor-pointer relative">
                        ofertas
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </li>
                    <div className="absolute mt-6 z-10 mx-2 bg-[#ff9f30]">
                        <ul>
                            {
                                categories.map(cat=>(
                                    <li className="hover:text-white hover:bg-[#a85d08] cursor-pointer p-2">Lorem ipsum dolor sit</li>
                                ))
                            }
                        </ul>
                    </div>
                    <li className="flex items-center mx-2 hover:bg-[#a85d08] hover:rounded cursor-pointer">
                        cupones
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </li>
                </ul>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </span>
            </header>
        </section >
    )
}
export default NavBar;