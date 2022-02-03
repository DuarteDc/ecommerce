import Footer from "../../src/components/Layouts/Footer";
import NavBar from "../../src/components/Layouts/NavBar";

const ShowProduct = () => {
    return (
        <>
            <NavBar />
            <section className="container mx-auto bg-white">
                <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className=" w-full h-full" />
            </section>
            <Footer />
        </>
    )
}

export default ShowProduct;