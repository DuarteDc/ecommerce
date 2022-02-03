import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
    let links = [
        { name: 'home', link: '/' },
        { name: 'products', link: '/' },
        { name: 'categories', link: '/' },
        { name: 'contact', link: '/' },
    ]
    let [open, setOpen] = useState(false);
    return (
        <nav className=" w-full fixed top-0 left-0 bg-[#f58d16] z-10">
            <div className="md:flex items-center justify-between bg-[#f58d16] py-4 md:px-10 px-7">
                <div className="font-bold text-2xl cursor-pointer flex items-center text-white">
                    Lorem
                </div>
                <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <div className="mt-5 md:mt-0 md:hidden lg:hidden">
                    <input type="text" placeholder="Search.." className="rounded-lg w-full py-2" />
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#f58d16] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? ' opacity-100' : 'top-[-2]'} md:opacity-100 opacity-0`}>
                    {
                        links.map(link => (
                            <Link href={link.link}>
                                <li className="md:ml-8 text-xl md:my-0  my-7">
                                    <a className="cursor-pointer text-white hover:text-gray-400 duration-500">{link.name}</a>
                                </li>
                            </Link>
                        ))
                    }
                    <Link href="/Auth/Sign-In">
                        <span className="bg-indigo py-2 px-6 rounded md:ml-8 cursor-pointer">
                            Sign In
                        </span>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar;