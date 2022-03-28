import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag, BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import Badge from '@mui/material/Badge';
import { startVerifyToken } from '../../actions/authActions'
import { loadState } from "../../actions/shoppingCartActions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const NavBar = () => {
  const { cart } = useSelector((state) => state.cart)
  console.log(cart);
  const { logged } = useSelector((state) => state.auth)
  const { logo } = useSelector((state) => state.administrable);

  const dispatch = useDispatch()
  const router = useRouter();

  const [scrollPosition, setScrollPosition] = useState(0);

  const routes = [
    {
      path: '/',
      name: 'Inicio'
    },
    {
      path: '/productos',
      name: 'Productos'
    },
    {
      path: '/marcas',
      name: 'Marcas'
    },
    {
      path: '/categorias',
      name: 'Categorias'
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
    const cart = JSON.parse(localStorage.getItem('cart'));
    dispatch(loadState(cart));
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(startVerifyToken());
    }
  }, []);

  return (
    <div className={`bg-luz py-2 shadow-sm  w-full z-[2] ${scrollPosition >= 130 && 'fixed top-0'}`}>
      <div className="w-full px-10  lg:px-16 xl:px-28 2xl:px-28">
        <nav className="flex max-h-16 justify-between items-center" >
          <Image
            src={logo}
            alt="Wapizima"
            className="cursor-pointer"
            width={200}
            height={150}
          />

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
                  <span
                    onClick={() =>router.push(`/auth/login?p=${router.asPath}`)}
                    className="border-transparent border-b-2 mx-4 cursor-pointer  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out flex flex-col min-w-[6.5rem]">
                    Iniciar Sesión
                  </span>
                )
              }
              <span className="block h-6 w-[1px] bg-[#e5e5e5] mx-4 mt-2"></span>
              <span className="border-transparent border-b-2 mx-4 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                <Link href="/cart">
                  <a>
                    <Badge badgeContent={cart?.length || 0} color="secondary">
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
      <div className="sm:hidden" id="mobile-menu">
      <div className="px-2 pt-2 pb-3 space-y-1">
      {
        routes.map(route=>(
          <Link href={route.path} key={route.path}>
            <span href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{route.name}</span>
          </Link>
        ))
      }
      </div>
     </div>
    </div>
  );
};

export default NavBar;
