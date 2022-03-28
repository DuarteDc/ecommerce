import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag, BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import {AiOutlineHeart} from "react-icons/ai";
import {AiOutlineClose} from "react-icons/ai";
import { startVerifyToken } from '../../actions/authActions'
import { loadState } from "../../actions/shoppingCartActions";
import Cookies from "js-cookie";
import Badge from '@mui/material/Badge';
import { useRouter } from "next/router";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import { useToggle } from "../../hooks/useToggle";


const NavBar = () => {
  const { cart } = useSelector((state) => state.cart)
  const { logged } = useSelector((state) => state.auth)
  const { logo } = useSelector((state) => state.administrable);

  const [ wishListProducts ] = useLocalStorage('wishListProducts');


  const dispatch = useDispatch()
  const router = useRouter();
  const [ open , toggle ] = useToggle();

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
      path: '/categorias',
      name: 'Coleciones'
    },
    {
      path: '/marcas',
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

  const handleRedirectClick = (path) =>{
    router.push(path)
  }

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
  }, [])

  const handleMenuopen = () =>{
    toggle();
  }

  const handleMenuClose = () =>{
    toggle();
  }

  return (
    <div className={`bg-luz py-2 shadow-sm  w-full z-[3] ${scrollPosition >= 130 && 'fixed top-0'} space-y-1`}>
      <div className="w-full px-10  lg:px-16 xl:px-28 2xl:px-28">
        <nav className="flex max-h-16 justify-between items-center" >
          <Image
            src={logo}
            alt="Wapizima"
            className="cursor-pointer"
            width={200}
            height={150}
          />
          
          {
            !open ?
            <button className="space-y-2  lg:hidden xl:hidden" onClick={()=>handleMenuopen()}>
              <span className="block w-8 h-0.5 bg-gray-600"></span>
              <span className="block w-8 h-0.5 bg-gray-600"></span>
              <span className="block w-8 h-0.5 bg-gray-600"></span>
            </button>
            :
            <button className="space-y-2  lg:hidden xl:hidden border  border-gray-600" onClick={()=>handleMenuopen()}>
              <IconContext.Provider value={{ className:"text-gray-600 text-[30px] block"}}>
                <AiOutlineClose/>
              </IconContext.Provider>
             
            </button>
            


          }
          

          <div className="hidden lg:flex justify-between items-center w-full">
            <div className="px-12 w-full flex justify-center">
              {
                routes.map(({ path, name }) => (
                  <Link href={path} key={name}>
                    <span className="text-[#888] border-transparent border-b-2 hover:text-[#333] mx-4 cursor-pointer  font-Poppins text-[15px] font-medium transition uppercase duration-700 ease-in-out">
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
                    className="border-transparent border-b-2 mx-4 cursor-pointer  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out flex flex-col min-w-[7.6rem] uppercase">
                    Iniciar Sesión
                  </span>
                )
              }
              <span className="block h-6 w-[1px] bg-[#e5e5e5] mx-4 mt-2"></span>
              <span className="flex items-center border-transparent border-b-2 mx-4 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                    <Badge badgeContent={wishListProducts?.length} color="secondary" onClick={()=>handleRedirectClick('/mi-lista-de-deseos')} className="mr-4">
                      <IconContext.Provider value={{ size: "1.6rem" }}>
                        <AiOutlineHeart />
                      </IconContext.Provider>
                    </Badge>

                    <Badge badgeContent={cart?.length} color="secondary" onClick={()=>handleRedirectClick('/mi-carrito')}>
                      <IconContext.Provider value={{ size: "1.5rem" }}>
                        <BsHandbag />
                      </IconContext.Provider>
                    </Badge>
              </span>
            </div>
          </div>
        </nav>
      </div>
    

      <div className={`${open ? 'block' : 'hidden'} `}>
      <div className="px-2 pt-2 pb-3 space-y-1 bg-[#333]">
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
