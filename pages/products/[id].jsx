import { useRef, useState } from "react";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavBar from "../../src/components/Layouts/NavBar";
import Card from "../../src/components/Layouts/Card";
import AsideBar from "../../src/components/categories/AsideBar";

const Show = () => {
    const img = useRef(null);
    const handleChangeImg = (newImg) => {
        img.current.src = newImg.target.src
    }
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
    const [quantity, setQuantity] = useState(null);

    return (
        <>
            <NavBar />
            <section className="container mx-auto px-0 lg:px-32 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="hidden lg:block">
                       <AsideBar />
                    </div>
                    <div className="p-8 border-2 border-gray-200 sm:col-span-4 md:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <div>
                                    <div>
                                        <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain w-full h-full p-2 cursor-zoom-in" ref={img} />
                                    </div>
                                    <div>
                                        <div className="flex">
                                            <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer">
                                                <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" alt="" onClick={e => handleChangeImg(e)} />
                                            </div>
                                            <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer">
                                                <img src="https://cdn.shopify.com/s/files/1/0250/9661/8038/products/PREVENTION__DAILY_HYDRATING_MOISTURIZER_SPF_30_PDP-R02_600x.jpg?v=1618925348" alt="" onClick={e => handleChangeImg(e)} />
                                            </div>
                                            <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer">
                                                <img src="http://www.grupocrea.com.mx/img/product/05938-stampa-crea-mortar.jpg" alt="" onClick={e => handleChangeImg(e)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 mx-0 mt-10">
                                <h2 className="text-2xl">Product Name</h2>
                                <p className="mt-4 text-xl">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto corrupti consequatur possimus, sequi consequuntur eveniet voluptatem dolores, numquam dolor iure explicabo  et facilis. Ipsa reprehenderit
                                </p>
                                <div className="mt-10 flex flex-row items-center">
                                    <p className="font-bold text-3xl text-[#fa440a] mr-12">
                                        $800
                                    </p>
                                    <p className="text-lg">
                                        4 availables
                                    </p>
                                </div>
                                <div className="mt-12">
                                    <h3 className="text-xl font-semibold">Categories</h3>
                                    <div className="flex">
                                        <Link href="/">
                                            <p className="text-[#fa440a] mr-4 cursor-pointer text-lg hover:text-gray-700 duration-500">hola mundo</p>
                                        </Link>
                                        <Link href="/">
                                            <p className="text-[#fa440a] mr-4 cursor-pointer text-lg hover:text-gray-700 duration-500">hola mundo</p>
                                        </Link>
                                        <Link href="/">
                                            <p className="text-[#fa440a] mr-4 cursor-pointer text-lg hover:text-gray-700 duration-500">hola mundo</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-12 lg:mt-20">
                                    <div className="flex items-center">
                                        <button className="rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]" onClick={() => setQuantity(quantity + 1)}>+</button>
                                        <button className="rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]" onClick={() => setQuantity(quantity - 1)}>-</button>
                                        <input value={quantity} type="text" placeholder="quantity" className="rounded-lg py-4 border-2 border-gray-800 px-4 w-full md:w-1/3" />
                                        <button className="w-full mx-2 lg:w-4/12 rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]">
                                            <ShoppingCartIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-center text-md lg:text-2xl">Productos relacionados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                        {
                            products.map(product => (
                                <Card product={product} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Show;