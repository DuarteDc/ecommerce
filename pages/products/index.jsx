import { useSelector } from "react-redux";
import { startLoadProducts } from "../../src/actions/productsAction";
import AsideBar from "../../src/components/categories/AsideBar";
import Card from "../../src/components/Layouts/Card";
import Footer from "../../src/components/Layouts/Footer";
import NavBar from "../../src/components/Layouts/NavBar";
import { wrapper } from "../../src/store";

const Products = () => {

    const { products } = useSelector((state) => state.products);
    console.log(products);
    // const products = [
    //     { id: "1", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" }
    // ];
    return (
        <>
            <NavBar />
            <div className="w-full container mx-auto h-36 overflow-hidden mt-12">
                <img src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300" className="w-full object-fill" alt="" />
            </div>
            <section className="grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <div className="hidden md:block">
                    <AsideBar />
                </div>
                <div className="col-span-4 md:col-span-2 lg:col-span-3 -mt-6">
                    <div className="flex">
                        <div className="w-3/12 border-l-2 bg-[#f58d16] border-t-2 rounded-t-2 border-r-2 border-[#f58d16] cursor-pointer">
                            <p className="font-bold px-2 text-white">Mas vendidos</p>
                        </div>
                        <div className="cursor-pointer w-3/12 border-l-2 rounded-t border-t-2 border-r-2 bordercursor-pointer hover:bg-[#f58d16] hover:text-white">
                            <p className="font-bold px-2">Mejor puntiación</p>
                        </div>
                        <div className="cursor-pointer w-3/12 border-l-2 rounded-t border-t-2 border-r-2 bordercursor-pointer hover:bg-[#f58d16] hover:text-white">
                            <p className="font-bold px-2">En descuento</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t-2 border-gray-200">
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

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadProducts())

    })

export default Products;