import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  startLoadCartNoAuth,
  startLoadShoppingCart,
} from "../../actions/shoppingCartActions";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/router";
import { useToggle } from "../../hooks/useToggle";
import { pages } from "../../staticData/pages";
import Cookies from "js-cookie";
import { logout } from "../../actions/authActions";

import { Button, Menu, MenuItem } from "@mui/material";
import { helpers } from "../../helpers";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';

import SelectCurrency from "./SelectCurrency";

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from "@mui/material";
import Image from "next/image";

const NavBar = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { logged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { logo } = useSelector((state) => state.administrable);
  const { currencies } = useSelector((state) => state.countries);

  const token = Cookies.get('token') || '';
  const [scrollPosition, setScrollPosition] = useState(0);
  const currenCurrency = Cookies.get('Currency') || 'MXN';
  const [currency, setCurrency] = useState('');
  const [search, setSearh] = useState('');
  setTimeout(() => {
    setCurrency(currencies.find(c => c.currency === currenCurrency))
  }, 200);
  const { prepareProductsToFussion } = helpers;

  const [open, toggle] = useToggle();

  useEffect(() => {
    if (!logged && !token) {
      let cart = localStorage.getItem('cart') || '[]';
      if (!cart || cart === 'undefined' || cart === '') return localStorage.setItem('cart', '[]');
      cart = JSON.parse(cart);
      if (!cart.length) return;
      const products = prepareProductsToFussion(cart);
      return dispatch(startLoadCartNoAuth(products, currenCurrency));
    }
    dispatch(startLoadShoppingCart(token, currenCurrency));
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleRedirectClick = (path) => {
    if (router.pathname === path) return router.push(path, undefined, { shallow: true });
    router.push(path)
  };


  const handleRedirectWithParams = (path) => {
    let newRoute = path.split('?');
    newRoute = `${newRoute[0]}?${newRoute[1]}`;
    if (router.asPath === newRoute) return router.push(newRoute, undefined, { shallow: true });
    router.push(newRoute)
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutSession = () => {
    dispatch(clearCart());
    dispatch(logout());
    Cookies.remove("token");
    router.replace("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeCurrency = (textCurrency) => {
    setCurrency(textCurrency);
    Cookies.set('Currency', textCurrency);
    router.reload();
  }

  const startSearchProduct = (event) => {
    event.preventDefault();
    if (search === router.query?.search) return;
    if (!search) return
    router.push(`/buscar?search=${search}`);
  }

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    toggle();
  };


  const DrawerOptions = () => {
    return (
      <div className="font-Poppins">
        <figure className="flex justify-center">
          <Image
            src={logo}
            fill={true}
            alt="Wapizima"
            width={90}
            height={90}
            onClick={() => handleRedirectClick('/')}
            className="cursor-pointer"
          />
        </figure>
        {pages.map(({ name, path }) => (
          <div
            key={path}
            className="pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm"
            onClick={() => handleRedirectClick(path)}
          >
            <a
              target={`${name === 'Escuela' ? '_blank' : '_self'}`}>
              {name}
            </a>
          </div>
        ))}
        <div>
          {logged ? (
            <div>
              <hr />
                <span
                  className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28"
                  onClick={()=>handleRedirectClick('/perfil')}
                ><AccountCircleIcon className="mr-4" />Mi cuenta</span>
              <span className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28" onClick={(e) => {
                handleClose(e);
                logoutSession();
              }} >
                Cerrar Sesión
              </span>
            </div>
          ) : (
            <div>
              <hr />
              <span className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28"
                onClick={() => handleRedirectWithParams(`/auth/login?p=${router.asPath}`)}>
                Iniciar Sesión
              </span>
              <span className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28"
                onClick={() => handleRedirectWithParams(`/auth/register/?p=${router.asPath}`)}>
                Registrate
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-luz pb-2 shadow-md  w-full z-[99] pt-1 ${scrollPosition >= 130 && "fixed top-0"
        } space-y-1 static`}
    >
      <div className="w-full px-10 lg:px-2 xl:px-28 2xl:px-28 text-xs">
        <nav className="flex max-h-16 justify-between items-center z-40">
          <Image
            src={logo}
            priority={true}
            fill={true}
            alt="Wapizima"
            width={100}
            height={90}
            onClick={() => handleRedirectClick('/')}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-center">
            <span className="items-center border-transparent border-b-2 cursor-pointer flex text-[#888] font-['Poppins'] transition duration-700 ease-in-out lg:hidden">
              {
                (!router.pathname.includes('/perfil') && !router.pathname.includes('/checkout')) && !router.pathname.includes('/distribuidor') &&
                (
                  <SelectCurrency currencies={currencies} onChange={onChangeCurrency} value={currency} />
                )
              }
              <Badge
                badgeContent={wishList?.length}
                color="primary"
                onClick={() => handleRedirectClick("/mi-lista-de-deseos")}
                className="mx-2"
              >
                <FavoriteBorderIcon />
              </Badge>
              <Badge
                badgeContent={cart?.length}
                color="primary"
                onClick={() => handleRedirectClick("/mi-carrito")}
                className="mr-5"
              >
                <ShoppingCartCheckoutIcon />
              </Badge>
            </span>

            {!open ? (
              <button
                className="lg:hidden"
                onClick={toggleDrawer}
                title="Menú"
              >
                <MenuIcon
                  className="text-gray-600 text-[30px]"
                />
              </button>
            ) : (
              <button
                className="lg:hidden"
                onClick={toggleDrawer}
                title="Cerrar"
              >
                <CloseIcon
                  className="text-gray-600 text-[30px]"
                />
              </button>
            )}
          </div>

          <div className="hidden lg:flex justify-between items-center w-full p-0 mx-0">
            <div className="px-12 w-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center text-[10px] xl:text-[12px] items-center">
                {pages.map(({ path, name }) => (
                  <a
                    key={path}
                    onClick={() => handleRedirectClick(path)}
                    target={`${name === 'Escuela' ? '_blank' : '_self'}`}
                    className="text-[#333] border-transparent border-b-2 hover:text-[#888] mx-4 cursor-pointer  font-Poppins font-medium transition uppercase duration-700 ease-in-out">
                    {name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center mr-10">
              <div>
                {
                  (!router.pathname.includes('/perfil') && !router.pathname.includes('/checkout')) &&
                  (
                    <SelectCurrency currencies={currencies} onChange={onChangeCurrency} value={currency} />
                  )
                }
              </div>
              {logged ? (
                <span className="flex items-center">
                  <Button
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ color: "#333" }}
                    className="border-transparent border-b-2 mx-4 cursor-pointer text-lg font-['Poppins'] font-normal transition duration-700 ease-in-out"
                  >
                    <AccountCircleIcon className="text-3xl" />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1,
                        "& .MuiAvatar-root": {
                          width: 40,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 25,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={(e) => { handleClose(e); handleRedirectClick('/perfil') }}
                      sx={{ paddingRight: 15, fontSize: "14px" }}
                      className="hover:text-[#a31545]"
                    >
                      Mi Cuenta
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => { handleClose(e); handleRedirectClick('/perfil/mis-pedidos') }}
                      sx={{ paddingRight: 15, fontSize: "14px" }}
                      className="hover:text-[#a31545]"
                    >
                      Mis Pedidos
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => { handleClose(e); handleRedirectClick('/perfil/direcciones') }}
                      sx={{ paddingRight: 15, fontSize: "14px" }}
                      className="hover:text-[#a31545]"
                    >
                      Mis Direcciones
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        logoutSession();
                      }}
                      sx={{ paddingRight: 15, fontSize: "14px" }}
                      className="hover:text-[#a31545]"
                    >
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </span>
              ) : (
                <div className="flex items-center text-[10px] xl:text-[12px]">
                  <span
                    onClick={() =>
                      handleRedirectWithParams(`/auth/login?p=${router.asPath}`)
                    }
                    className="text-[#333] border-transparent border-b-2 hover:text-[#333] cursor-pointer  font-Poppins
                    transition uppercase duration-700 ease-in-out min-w-[6rem] flex hover:text-[#888]"
                  >
                    Iniciar Sesión
                  </span>
                  <span
                    onClick={() =>
                      handleRedirectWithParams(`/auth/register?p=${router.asPath}`)
                    }
                    className="text-[#333] hover:text-[#888] border-transparent border-b-2 hover:text-[#333] cursor-pointer  font-Poppins transition uppercase duration-700 ease-in-out"
                  >
                    Registrate
                  </span>
                </div>
              )}
              <span className="block h-6 w-[1px] bg-[#e5e5e5] md:mx-2 xl:mx-4 mt-2"></span>
              <span className="flex items-center border-transparent border-b-2 cursor-pointer text-[#333] hover:text-[#888] font-['Poppins'] font-normal xl:mx-2 transition duration-700 ease-in-out mr-5">
                <Badge
                  badgeContent={wishList?.length}
                  color="primary"
                  onClick={() => handleRedirectClick("/mi-lista-de-deseos")}
                >
                  <FavoriteBorderIcon />
                </Badge>
              </span>
              <span className="flex items-center border-transparent border-b-2 cursor-pointer text-[#333] hover:text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                <Badge
                  badgeContent={cart?.length}
                  color="primary"
                  onClick={() => handleRedirectClick("/mi-carrito")}
                >
                  <ShoppingCartCheckoutIcon />
                </Badge>
              </span>
            </div>
          </div>
        </nav>
      </div >

      <div>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer}
        >
          <DrawerOptions />
        </Drawer>
      </div>
      <div className="flex items-center justify-center">
        <div className="pb-2 lg:w-8/12 w-full lg:px-20 px-8 flex items-center">
          <form onSubmit={startSearchProduct} className="w-full flex">
            <input
              className="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white focus:border-[#e91e63] text-[13px]"
              placeholder="Busca tu producto aquí"
              type="text"
              name="Buscar"
              title="Buscar"
              required
              value={search}
              onChange={(event) => setSearh(event.target.value)}
            />
            <button className="px-6 py-[6.5px] bg-[#e91e63] ml-2 rounded-sm cursor-pointer hover:bg-[#ed4b82]" title="Buscar">
              <SearchIcon className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default NavBar;
