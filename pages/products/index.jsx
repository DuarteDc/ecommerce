import { useEffect, useState } from "react";
import AsideBar from "../../src/components/categories/AsideBar";
import Card from "../../src/components/Layouts/Card";
import Footer from "../../src/components/Layouts/Footer";
import NavBar from "../../src/components/Layouts/NavBar";

import { getProducts } from "../../src/actions/productActions";

const Products = ({ products }) => {
    /* const [products, setProducts] = useState(null);
     const getData = async () => {
         const _products = await getProducts();
         setProducts(_products);
     }
     useEffect(() => {
         getData();
     }, []);*/

    return (
        <>
            <NavBar />
            <section className="grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <div className="hidden md:block">
                    <AsideBar />
                </div>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    <div className="flex">
                        <div className="w-3/12 border-l-2 bg-[#f58d16] border-t-2 rounded-t border-r-2 border-[#f58d16] cursor-pointer">
                            <p className="font-bold px-2 text-white">Mas vendidos</p>
                        </div>
                        <div className="w-3/12 border-l-2 rounded-t border-t-2 border-r-2 cursor-pointer hover:bg-[#f58d16] hover:text-white">
                            <p className="font-bold px-2">Mejor puntiación</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-2 border-gray-200">
                        {
                            products?.map((product) => (
                                <Card key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export const getServerSideProps = async () => {
    const products = await getProducts();
    return {
        props: {
            products
        }
    }
}
export default Products;