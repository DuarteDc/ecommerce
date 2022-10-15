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

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { helpers } from "../../helpers";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloseIcon from '@mui/icons-material/Close';
import SelectCurrency from "./SelectCurrency";

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SearchIcon from '@mui/icons-material/Search';


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
      if (!cart || cart === 'undefined' || cart === '') localStorage.setItem('cart', '[]');

      const products = prepareProductsToFussion(JSON.parse(cart));
      return dispatch(startLoadCartNoAuth(products, currenCurrency));
    }
    dispatch(startLoadShoppingCart(token, currenCurrency));
  }, [currency]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const handleRedirectClick = (path) => {
    router.push(path);
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

  const handleMenuopen = () => {
    toggle();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickLogo = () => {
    router.push("/");
  };

  const onChangeCurrency = (textCurrency) => {
    setCurrency(textCurrency);
    Cookies.set('Currency', textCurrency);
    router.reload();
  }

  const startSearchProduct = (event) => {
    event.preventDefault();
    if(search === router.query?.search) return;
    if(!search) return
    router.push(`/buscar?search=${search}`);
  }

  return (
    <div
      className={`bg-luz pb-2 shadow-md  w-full z-[99] pt-1 ${scrollPosition >= 130 && "fixed top-0"
        } space-y-1 static`}
    >
      <div className="w-full px-10 lg:px-2 xl:px-28 2xl:px-28 text-xs">
        <nav className="flex max-h-16 justify-between items-center z-40">
          <img
            src={logo}
            alt="Wapizima"
            width={100}
            height={90}
            onClick={handleClickLogo}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-center">
            <span className="items-center border-transparent border-b-2 cursor-pointer flex text-[#888] font-['Poppins'] transition duration-700 ease-in-out lg:hidden">
              {
                (!router.pathname.includes('/perfil') && !router.pathname.includes('/checkout')) &&
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
                className="space-y-2  lg:hidden xl:hidden"
                onClick={() => handleMenuopen()}
              >
                <span className="block w-8 h-0.5 bg-gray-600"></span>
                <span className="block w-8 h-0.5 bg-gray-600"></span>
                <span className="block w-8 h-0.5 bg-gray-600"></span>
              </button>
            ) : (
              <button
                className="space-y-2  lg:hidden xl:hidden border  border-gray-600"
                onClick={() => handleMenuopen()}
              >
                <CloseIcon
                  className="text-gray-600 text-[30px] block"
                />
              </button>
            )}
          </div>

          <div className="hidden lg:flex justify-between items-center w-full p-0 mx-0">
            <div className="px-12 w-full flex flex-col justify-center items-center">
              <div className="w-full flex justify-center text-[10px] xl:text-[12px] items-center">
                {pages.map(({ path, name }) => (
                  name !== 'Escuela' ? (
                    <Link href={path} passHref key={name} prefetch={false}>
                      <span className="text-[#888] border-transparent border-b-2 hover:text-[#333] mx-4 cursor-pointer  font-Poppins font-medium transition uppercase duration-700 ease-in-out">
                        {name}
                      </span>
                    </Link>
                  ) : (
                    <Link href={path} key={name} prefetch={false}>
                      <a target="_blank" className="text-[#888] border-transparent border-b-2 hover:text-[#333] mx-4 cursor-pointer  font-Poppins font-medium transition uppercase duration-700 ease-in-out">
                        {name}
                      </a>
                    </Link>
                  )
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
                    sx={{ color: "#999" }}
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
                    <Link href="/perfil" passHref>
                      <MenuItem
                        onClick={handleClose}
                        sx={{ paddingRight: 15, fontSize: "14px" }}
                        className="hover:text-black"
                      >
                        Mi Cuenta
                      </MenuItem>
                    </Link>
                    <Link href="/perfil/mis-pedidos" passHref>
                      <MenuItem
                        onClick={handleClose}
                        sx={{ paddingRight: 15, fontSize: "14px" }}
                        className="hover:text-black"
                      >
                        Mis Pedidos
                      </MenuItem>
                    </Link>
                    <Link href="/perfil/direcciones" passHref>
                      <MenuItem
                        onClick={handleClose}
                        sx={{ paddingRight: 15, fontSize: "14px" }}
                        className="hover:text-black"
                      >
                        Mis Direcciones
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        logoutSession();
                      }}
                      sx={{ paddingRight: 15, fontSize: "14px" }}
                      className="hover:text-black"
                    >
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </span>
              ) : (
                <div className="flex items-center text-[10px] xl:text-[12px]">
                  <span
                    onClick={() =>
                      router.push(`/auth/login?p=${router.asPath}`)
                    }
                    className="text-[#888] border-transparent border-b-2 hover:text-[#333] cursor-pointer  font-Poppins
                    transition uppercase duration-700 ease-in-out min-w-[6rem] flex"
                  >
                    Iniciar Sesión
                  </span>
                  <span
                    onClick={() =>
                      router.push(`/auth/register?p=${router.asPath}`)
                    }
                    className="text-[#888] border-transparent border-b-2 hover:text-[#333] cursor-pointer  font-Poppins transition uppercase duration-700 ease-in-out"
                  >
                    Registrate
                  </span>
                </div>
              )}
              <span className="block h-6 w-[1px] bg-[#e5e5e5] md:mx-2 xl:mx-4 mt-2"></span>
              <span className="flex items-center border-transparent border-b-2 cursor-pointer text-[#888] font-['Poppins'] font-normal xl:mx-2 transition duration-700 ease-in-out mr-5">
                <Badge
                  badgeContent={wishList?.length}
                  color="primary"
                  onClick={() => handleRedirectClick("/mi-lista-de-deseos")}
                >
                  <FavoriteBorderIcon />
                </Badge>
              </span>
              <span className="flex items-center border-transparent border-b-2 cursor-pointer text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
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
      </div>

      <div
        className={`animate__animated lg:hidden ${open
          ? "block animate__fadeIn animate__faster  absolute z-[30] w-full"
          : "animate__fadeOutUp hidden"
          } `}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#333] ">
          {pages.map((route) => (
            route.name !== 'Escuela' ? (
              <Link href={route.path} key={route.path}>
                <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {route.name}
                </a>
              </Link>
            ) : (
              <Link href={route.path} key={route.path}>
                <a target="_blank" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {route.name}
                </a>
              </Link>
            )
          ))}
          <div className="items-center relative">
            {logged ? (
              <>
                <Link href="/perfil" passHref>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-2 py-2 rounded-md text-base font-medium">
                    Mi Cuenta
                  </span>
                </Link>
                <span
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={(e) => {
                    handleClose(e);
                    logoutSession();
                  }}
                >
                  Cerrar Sesión
                </span>
              </>
            ) : (
              <div>
                <span
                  onClick={() => router.push(`/auth/login?p=${router.asPath}`)}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-2 py-2 rounded-md text-base font-medium"
                >
                  Iniciar Sesión
                </span>
                <span
                  onClick={() =>
                    router.push(`/auth/register?p=${router.asPath}`)
                  }
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Registrate
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="pb-2 lg:w-8/12 w-full lg:px-20 px-8 flex items-center">
          <form onSubmit={startSearchProduct} className="w-full flex">
            <input
              className="bg-gray-50 w-full appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700  leading-tight focus:outline-none focus:bg-white focus:border-[#e91e63] text-[13px]"
              placeholder="Busca tu producto aquí"
              type="text"
              required
              value={search}
              onChange={(event) => setSearh(event.target.value)}
            />
            <button className="px-6 py-[6.5px] bg-[#e91e63] ml-2 rounded-sm cursor-pointer hover:bg-[#ed4b82]">
              <SearchIcon className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
