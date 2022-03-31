import Head from "next/head"
import { useEffect } from "react";
import Cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { loadCartfromCookies } from "../../actions/shoppingCartActions";
import { loadWishListfromLocalStorage } from "../../actions/wishListActions";

export const Meta = ({title , keywords , description , ogTitle , ogType , ogUrl , ogImage , robots}) =>{
    const dispatch = useDispatch();

    useEffect(() => {
        const cookieShoppingCart = Cookie.get('shoppingCart') ? JSON.parse(Cookie.get('shoppingCart')) : [];
       dispatch(loadCartfromCookies(cookieShoppingCart))
    }, []);

    useEffect(() => {
        const localStorageWishList = localStorage.getItem('wishListProducts') ? JSON.parse(localStorage.getItem('wishListProducts')) : [];
        dispatch(loadWishListfromLocalStorage(localStorageWishList))
    }, []);

    return(
        <Head>
            <meta name="robots" content={robots}/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@wapizima" />
            <meta name="twitter:creator" content="@wapizima" />
            <meta name="keywords" content={keywords}></meta>

            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType}/>
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />            

            <title>{title}</title>
        </Head>
    )

}