import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import TabBar from './TabBar'

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
            <Footer/>
            <TabBar />
        </>
    )
}

export default Layout