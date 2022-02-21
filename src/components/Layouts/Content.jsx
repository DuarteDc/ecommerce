import NavBar from "./Navbar";
import Slider from "./Slider";
import CategoryCard from "./CategoryCard";
import Card from "./Card";
import Footer from "./Footer";
import ShowProduct from "../products/ShowProduct";
import CartShop from "./CartShop";
import TopHeader from "./TopHeader";
import FacilityArea from "./FacilityArea";
import Head from "next/head";

const Content = ({ children }) => {
    const products = [
        { id: "1", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "2", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "3", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "4", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "5", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "6", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "7", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "8", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "9", name: "hola mundo", description: "some description", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
    ];
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
            <Slider />
            <FacilityArea/>
            <CategoryCard />
            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {
                    products.map(product => (
                        <Card product={product} key={product.id} />
                    ))
                }
            </section>
            <Footer />
        </>
    )
}

export default Content;
