import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Head from "next/head";
import TopHeader from './TopHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Meta } from '../meta/meta';

const Layout = ({ children }) => {
    return (
        <>
            <Meta
               title="wapizima"
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
        </>
    )
}

export default Layout