import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag, BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import Badge from '@mui/material/Badge';
import { startVerifyToken } from '../../actions/authActions'
import { pruebacarrito } from "../../actions/shoppingCartActions";

const NavBar = () => {
  const { cart } = useSelector((state) => state.cart)
  const { logged } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [scrollPosition, setScrollPosition] = useState(0);

  const routes = [
    {
      path: '/products',
      name: 'Productos'
    },
    {
      path: '/brands',
      name: 'Marcas'
    },
    {
      path: '/contacto',
      name: 'Contácto'
    },
    {
      path: '/acerca-de-nosotros',
      name: 'Acerca'
    }
  ]

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
    const card2 = JSON.parse(localStorage.getItem('card2'));
    console.log(card2);
    dispatch(pruebacarrito(card2))
  }, [cart])

  useEffect(() => {
    dispatch(startVerifyToken());
  }, [])

  return (
    <div className={`bg-luz py-2 shadow-sm  w-full z-[2] ${scrollPosition >= 130 && 'fixed top-0'}`}>
      <div className="w-full px-10  lg:px-16 xl:px-28 2xl:px-28">
        <nav className="flex max-h-16 justify-between items-center" >
          <Link href="/" passHref>
            <Image
              src={'/assets/Wapizima C.webp'}
              alt="Picture of the author"
              className="cursor-pointer"
              width={200}
              height={150}
            />
          </Link>

          <button className="space-y-2  lg:hidden">
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
          </button>

          <div className="hidden lg:flex justify-between items-center w-full">
            <div className="px-12 w-full flex justify-center">
              {
                routes.map(({ path, name }) => (
                  <Link href={path} key={name}>
                    <span className="border-transparent border-b-2 hover:text-black mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out">
                      {name}
                    </span>
                  </Link>
                ))
              }
            </div>

            <div className="px-6 flex items-center">
              {
                logged ? (
                  <Link href="/profile">
                    <span className="border-transparent border-b-2 mx-4 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                      <IconContext.Provider value={{ size: "1.6rem" }}>
                        <BsPersonCircle />
                      </IconContext.Provider>
                    </span>
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <span className="border-transparent border-b-2 mx-4 cursor-pointer  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out flex flex-col min-w-[6.5rem]">
                      Iniciar Sesión
                    </span>
                  </Link>
                )
              }
              <span className="block h-6 w-[1px] bg-[#e5e5e5] mx-4 mt-2"></span>
              <span className="border-transparent border-b-2 mx-4 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                <Link href="/cart">
                  <a>
                    <Badge badgeContent={cart.length} color="secondary">
                      <IconContext.Provider value={{ size: "1.5rem" }}>
                        <BsHandbag />
                      </IconContext.Provider>
                    </Badge>
                  </a>
                </Link>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
