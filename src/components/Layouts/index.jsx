import React from 'react'
import NavBar from './NavBar'
import TabBar from './TabBar'
import Footer from './Footer'
import Head from "next/head";
import TopHeader from './TopHeader';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Love Nails</title>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Poppins:wght@200;300;700&display=swap" rel="stylesheet"/>
            </Head>
            <TopHeader/>
            <NavBar />
            {children}
            <Footer />
        </>
    )
}

export default Layout