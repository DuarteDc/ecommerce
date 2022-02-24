import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/assets/Wapizima C.webp"
import { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const { cart } = useSelector((state) => state.cart);


  return (
    <div className={`bg-luz py-2 shadow-sm  w-full z-[2] ${scrollPosition >= 130 && 'fixed top-0'}`}>
      <div className="w-full px-10  lg:px-16 xl:px-28 2xl:px-28">
        <nav className="flex max-h-16 justify-between items-center" >
            <Image
             src={'/assets/Wapizima C.webp'}
             alt="Picture of the author"
             width={200}
             height={150}
            />
          <button className="space-y-2  lg:hidden">
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
          </button>

          <div className="hidden lg:flex justify-between items-center w-full">
            <div className="px-12">
              <Link href="/" >
                  <span className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                     Inicio  
                  </span> 
              </Link>
              <Link href="/products">
                <span className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                 Productos   
                </span>

              </Link>
              <Link href="/home">
                <span className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Blog   
                </span>
              </Link>
              <Link href="/home">
                <span className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">Contácto</span>
              </Link>

            </div>

            <div className="px-6 flex">
              <Link href="/auth">
                <span className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-sm font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Inicia Sesión
                </span>
              </Link>
              <span className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-sm font-['Poppins'] font-normal transition duration-700 ease-in-out">
                <Cart cart={cart} />
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
