import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag, BsPersonCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { startLoadShoppingCart, startloadshoppingCartFussion } from "../../actions/shoppingCartActions";
import Badge from '@mui/material/Badge';
import { useRouter } from "next/router";
import { useToggle } from "../../hooks/useToggle";
import { pages } from "../../staticData/pages";
import Cookies from "js-cookie";
import { logout } from "../../actions/authActions";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { acceptCookies } from "../../actions/administrableActions";

const NavBar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { cart, cartNotLogged } = useSelector((state) => state.cart);
    const { wishList } = useSelector((state) => state.wishList);
    const { logged } = useSelector((state) => state.auth);
    const { logo } = useSelector((state) => state.administrable);

    const [open, toggle] = useToggle();

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    const handleRedirectClick = (path) => {
        router.push(path)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem('acceptCookies')) {
            dispatch(acceptCookies());
        }
    }, []);

    const logoutSession = () => {
        dispatch(logout());
        Cookies.remove('token')
        router.replace('/')
    }



    useEffect(() => {
        if (logged) {
            const shoppingCartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];

            const token = Cookies.get('token') || '';

            if (!shoppingCartNotLogged.length) {
                dispatch(startLoadShoppingCart(token))
                return;
            }

            dispatch(startloadshoppingCartFussion(cartNotLogged, token));

            localStorage.removeItem('cartNotlogged');
        }
    }, [logged]);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);


    const handleMenuopen = () => {
        toggle();
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickLogo = () => {
        router.replace('/');
    }

    return (
        <div className={`bg-luz py-2 shadow-sm  w-full z-[99] ${scrollPosition >= 130 && 'fixed top-0'} space-y-1 static`}>
            <div className="w-full px-10  lg:px-16 xl:px-28 2xl:px-28">
                <nav className="flex max-h-16 justify-between items-center" >
                    <Image
                        src={logo}
                        alt="Wapizima"
                        width={150}
                        height={100}
                        priority
                        onClick={handleClickLogo}
                        className="cursor-pointer"
                    />
                    <div className="flex justify-between items-center ">
                        <span className="flex items-center border-transparent border-b-2 mx-1 cursor-pointer text-lg text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out  lg:hidden xl:hidden">
                            <Badge badgeContent={wishList?.length} color="secondary" onClick={() => handleRedirectClick('/mi-lista-de-deseos')} className="mr-5">
                                <IconContext.Provider value={{ size: "1.6rem" }}>
                                    <AiOutlineHeart />
                                </IconContext.Provider>
                            </Badge>
                            <Badge badgeContent={logged ? cart?.length : cartNotLogged?.length} color="secondary" onClick={() => handleRedirectClick('/mi-carrito')} className="mr-5">
                                <IconContext.Provider value={{ size: "1.5rem" }}>
                                    <BsHandbag />
                                </IconContext.Provider>
                            </Badge>
                        </span>

                        {
                            !open ?
                                <button className="space-y-2  lg:hidden xl:hidden" onClick={() => handleMenuopen()}>
                                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                                    <span className="block w-8 h-0.5 bg-gray-600"></span>
                                </button>
                                :
                                <button className="space-y-2  lg:hidden xl:hidden border  border-gray-600" onClick={() => handleMenuopen()}>
                                    <IconContext.Provider value={{ className: "text-gray-600 text-[30px] block" }}>
                                        <AiOutlineClose />
                                    </IconContext.Provider>

                                </button>
                        }
                    </div>

                    <div className="hidden lg:flex justify-between items-center w-full">
                        <div className="px-12 w-full flex justify-center">
                            {
                                pages.map(({ path, name }) => (
                                    <Link href={path} key={name} prefetch={false}>
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
                                    <span>
                                        <Button
                                            id="basic-button"
                                            aria-controls={openMenu ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMenu ? 'true' : undefined}
                                            onClick={handleClick}
                                            className="border-transparent border-b-2 mx-4 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                                            <IconContext.Provider value={{ size: "1.6rem" }}>
                                                <BsPersonCircle />
                                            </IconContext.Provider>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    overflow: 'visible',
                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                    mt: 1,
                                                    '& .MuiAvatar-root': {
                                                        width: 40,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                    },
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 25,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                    },
                                                },
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <Link href="/perfil">
                                                <MenuItem onClick={handleClose} sx={{ paddingRight: 15, fontSize: '14px' }} className="hover:text-black">Mi Cuenta</MenuItem>
                                            </Link>
                                            <Link href="/perfil/mis-pedidos">
                                                <MenuItem onClick={handleClose} sx={{ paddingRight: 15, fontSize: '14px' }} className="hover:text-black">Mis Pedidos</MenuItem>
                                            </Link>
                                            <Link href="/perfil/direcciones">
                                                <MenuItem onClick={handleClose} sx={{ paddingRight: 15, fontSize: '14px' }} className="hover:text-black">Mis Direcciones</MenuItem>
                                            </Link>
                                            <MenuItem onClick={(e) => { handleClose(e); logoutSession() }} sx={{ paddingRight: 15, fontSize: '14px' }} className="hover:text-black">Cerrar Sesión</MenuItem>
                                        </Menu>
                                    </span>
                                ) : (
                                    <div className="flex items-center">
                                        <span
                                            onClick={() => router.push(`/auth/login?p=${router.asPath}`)}
                                            className="text-[#888] border-transparent border-b-2 hover:text-[#333] cursor-pointer  font-Poppins text-[15px] font-medium transition uppercase duration-700 ease-in-out min- w-[7rem] flex">
                                            Iniciar Sesión
                                        </span>
                                        <span
                                            onClick={() => router.push(`/auth/register?p=${router.asPath}`)}
                                            className="text-[#888] border-transparent border-b-2 hover:text-[#333] ml-2 cursor-pointer  font-Poppins text-[15px] font-medium transition uppercase duration-700 ease-in-out">
                                            Registrate
                                        </span>
                                    </div>
                                )
                            }
                            <span className="block h-6 w-[1px] bg-[#e5e5e5] mx-4 mt-2"></span>
                            <span className="flex items-center border-transparent border-b-2 ml-4 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                                <Badge badgeContent={wishList?.length} color="secondary" onClick={() => handleRedirectClick('/mi-lista-de-deseos')} className="mr-4">
                                    <IconContext.Provider value={{ size: "1.6rem" }}>
                                        <AiOutlineHeart />
                                    </IconContext.Provider>
                                </Badge>
                            </span>
                            <span className="flex items-center border-transparent border-b-2 cursor-pointer text-lg  text-[#888] font-['Poppins'] font-normal transition duration-700 ease-in-out">
                                <Badge badgeContent={logged ? cart?.length : cartNotLogged?.length} color="secondary" onClick={() => handleRedirectClick('/mi-carrito')}>
                                    <IconContext.Provider value={{ size: "1.5rem" }}>
                                        <BsHandbag />
                                    </IconContext.Provider>
                                </Badge>
                            </span>
                        </div>
                    </div>
                </nav>
            </div>


            <div className={`animate__animated lg:hidden ${open ? 'block animate__fadeInDown  absolute z-[10] w-full' : 'animate__fadeOutUp hidden'} `}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-[#333] ">
                    {
                        pages.map(route => (
                            <Link href={route.path} key={route.path}>
                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{route.name}</a>
                            </Link>
                        ))
                    }
                    <div className="flex items-center relative">
                        {
                            logged ? (
                                <Link href="/perfil">
                                    <a className="border-transparent border-b-2 cursor-pointer text-lg mx-2  text-white font-['Poppins'] font-normal transition duration-700 ease-in-out">
                                        <IconContext.Provider value={{ size: "1.6rem" }}>
                                            <BsPersonCircle />
                                        </IconContext.Provider>
                                    </a>
                                </Link>
                            ) : (
                                <div>
                                    <span
                                        onClick={() => router.push(`/auth/login?p=${router.asPath}`)}
                                        className="border-transparent border-b-2 mx-2 cursor-pointer  text-white font-['Poppins'] font-normal transition duration-700 ease-in-out flex flex-col min-w-[7.6rem] pt-3">
                                        Iniciar Sesión
                                    </span>
                                    <span
                                        onClick={() => router.push(`/auth/register?p=${router.asPath}`)}
                                        className="border-transparent border-b-2 mx-2 cursor-pointer  text-white font-['Poppins'] font-normal transition duration-700 ease-in-out flex flex-col min-w-[7.6rem] pt-3">
                                        Registrate
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
