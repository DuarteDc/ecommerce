// import Slider from "../../src/components/Layouts/Slider";
import Link from "next/link";
import Layout from "../../src/components/Layouts";

const Category = () => {
    const products = [
        { id: "1", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "2", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "3", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "4", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "5", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "6", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "7", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "8", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "9", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
    ];
    return (
        <Layout>
            <div className="h-96 overflow-hidden hidden md:block">
                {/* <Slider /> */}
            </div>
            <section className="container mx-auto">
                <h1 className="ml-4 md:ml-0 font-bold text-lg md:text-2xl my-2">Hola mundo</h1>
                <div>
                    <div className="col-span-4">
                        {
                            products.map((pro, index) => (
                                <Link href="/products/12" key={index}>
                                    <article className="border-2 border-gray-100 md:border-gray-300 mb-2 px-2 mx-0 md:mx-2 lg:mx8 md:px-8 py-4 rounded cursor-pointer">
                                        <div className="flex flex-row items-center md:mr-2">
                                            <div>
                                                <img src={pro.img} alt="" className="w-40" />
                                            </div>
                                            <div>
                                                <h3 className="text-md md:text-2xl font-bold">{pro.name}</h3>
                                                <p className="text-sm">{pro.description}</p>
                                                <p className="font-semibold">${pro.discount}</p>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default Category;