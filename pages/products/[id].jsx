import { useRef } from "react";
import Link from "next/link";
import NavBar from "../../src/components/Layouts/NavBar";
import Card from "../../src/components/Layouts/Card";
const Show = () => {
    const img = useRef(null);
    const handleChangeImg = (newImg) => {
        img.current.src = newImg
    }
    const categories = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <>
            <NavBar />
            <section className="container mx-auto px-32 mt-12">
                <div className="grid grid-col-1 md:grid-cols-4">
                    <div className="hidden lg:block">
                        <div class="h-screen bg-gray-100 hidden md:block p-4 border-gray-50">
                            <p className="text-bold text-md lg:text-xl">Categories</p>
                            <ul class="relative">
                                {
                                    categories.map((cat, i) => (
                                        <li class="relative">
                                            <a class="cursor-pointer flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">category {i + 1}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 col-span-3 p-8 border-2 border-gray-200">
                        <div>
                            <div>
                                <div>
                                    <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain w-full h-full p-2 cursor-zoom-in" ref={img} clasName="mb-0" />
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="border-2 border-black w-24 h-24 mx-1 cursor-pointer">
                                            <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" alt="" onClick={e => handleChangeImg(e.target.src)} />
                                        </div>
                                        <div className="border-2 border-black w-24 h-24 mx-1 cursor-pointer">
                                            <img src="https://cdn.shopify.com/s/files/1/0250/9661/8038/products/PREVENTION__DAILY_HYDRATING_MOISTURIZER_SPF_30_PDP-R02_600x.jpg?v=1618925348" alt="" onClick={e => handleChangeImg(e.target.src)} />
                                        </div>
                                        <div className="border-2 border-black w-24 h-24 mx-1 cursor-pointer">
                                            <img src="http://www.grupocrea.com.mx/img/product/05938-stampa-crea-mortar.jpg" alt="" onClick={e => handleChangeImg(e.target.src)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 mx-0 lg:mx-">
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
                            <div className="mt-12">
                                <button className="w-full md:w-6/12 bg-[#f58d16] py-5 mt-2 text-white font-bold hover:bg-[#ff9f30] rounded-lg">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-center text-md lg:text-2xl mt-12">Productos relacionados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
                        {
                            categories.map(cat => (
                                <Card />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Show;