import Link from "next/link";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";

const NavBar = () => {
    let links = [
        { name: 'home', link: '/' },
        { name: 'products', link: '/products' },
        { name: 'categories', link: '/categories' },
        { name: 'contact', link: '/' },
    ];
    const { cart } = useSelector((state) => state.cart);
    return (
        <nav className=" w-full top-0 left-0 bg-black z-20">
            <div className="md:flex items-center justify-between bg-black py-4 md:px-10 px-7">
                <div className="font-bold text-2xl cursor-pointer flex items-center text-white">
                    Lorem
                </div>

                <div className="flex items-center absolute right-8 top-3 cursor-pointer md:hidden text-white">
                    <Link href="/Auth/Sign-In">
                        <span className="py-2 rounded md:ml-8 cursor-pointer">
                            Sign In
                        </span>
                    </Link>
                    <span className="cursor-pointer pl-2">
                        <Cart cart={cart} />
                    </span>
                </div>

                <ul className="md:flex md:items-center md:pb-0 pb-12 z-20 absolute md:static bg-black md:z-auto left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in hidden  md:opacity-100 opacity-0">
                    {
                        links.map((link) => (
                            <li key={link.name} className="md:ml-8 font-light md:my-0 my-7">
                                <a href={link.link} className="text-white hover:text-gray-400 duration-500">{link.name}</a>
                            </li>
                        ))
                    }
                    <div className="text-white flex items-center justify-between">
                        <Link href="/Auth/Sign-In">
                            <span className="py-2 rounded md:ml-8 cursor-pointer font-light">
                                Sign In
                            </span>
                        </Link>
                        <span className="cursor-pointer px-6">
                            <Cart cart={cart} />
                        </span>
                    </div>
                </ul>
            </div>
            <div className="justify-center pb-5 flex">
                <div className="w-10/12 md:w-2/4">
                    <input type="text" placeholder="Search..." className="px-4 py-3 font-bold  mr-2 md:mr-2 w-full outline-none" />
                </div>
            </div>
        </nav>
    )
}
export default NavBar;