import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { startVerifyToken, verifyToken } from "../../actions/authActions";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const { cart } = useSelector((state) => state.cart)
  const { logged } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

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


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    dispatch(startVerifyToken());
  }, [])

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
                <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Inicio
                </a>
              </Link>
              <Link href="/products">
                <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Productos
                </a>
              </Link>
              <Link href="/brands">
                <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Marcas
                </a>
              </Link>
              <Link href="/home">
                <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Blog
                </a>
              </Link>
              <Link href="/home">
                <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">Contácto</a>
              </Link>

            </div>

            <div className="px-6 flex">
              {
                logged ?
                  (
                    <Link href="/profile">
                      <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-sm font-['Poppins'] font-normal transition duration-700 ease-in-out">
                        Perfil
                      </a>
                    </Link>
                  )
                  :
                  (
                    <Link href="/auth/login">
                      <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-sm font-['Poppins'] font-normal transition duration-700 ease-in-out">
                        Iniciar Sesión
                      </a>
                    </Link>
                  )
              }
              <Link href="/cart">
                <a className="border-transparent border-b-2 hover:border-red-900  mx-4 cursor-pointer text-sm font-['Poppins'] font-normal transition duration-700 ease-in-out">
                  Mi carrito({cart.length})
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
