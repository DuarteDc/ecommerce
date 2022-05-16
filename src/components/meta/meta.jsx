import Head from "next/head"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadWishListfromLocalStorage } from "../../actions/wishListActions";
import { startVerifyToken } from "../../actions/authActions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const Meta = ({ title, canonical, keywords, description, ogTitle, ogType, ogUrl, ogImage, robots }) => {
    const dispatch = useDispatch();

    const router = useRouter()

    useEffect(() => {
        const localStorageWishList = localStorage.getItem('wishListProducts') ? JSON.parse(localStorage.getItem('wishListProducts')) : [];
        dispatch(loadWishListfromLocalStorage(localStorageWishList))
    }, [router]);

    useEffect(() => {
        if (Cookies.get('token')) {
            dispatch(startVerifyToken());
        }
    }, [router]);

    return (
        <Head>
            <meta name="robots" content={robots} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@wapizima" />
            <meta name="twitter:creator" content="@wapizima" />
            <meta name="keywords" content={keywords}></meta>
            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            <link rel="canonical" href={canonical} />

            <title>{title}</title>
        </Head>
    )

}