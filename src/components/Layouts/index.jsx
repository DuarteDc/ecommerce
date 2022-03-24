import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Head from "next/head";
import TopHeader from './TopHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '../meta/meta';
import Script from 'next/script';

const Layout = ({ children  , title }) => {
    return (
        <>
            <Meta
               title={title}
            />
            <TopHeader />
            <NavBar />
            {children}
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-GRWCEYYWSK"></Script>
            <Script dangerouslySetInnerHTML={{
               __html:`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                 page_path: window.location.pathname,
               });
               `,
            }}/>
        </>
    )
}

export default Layout