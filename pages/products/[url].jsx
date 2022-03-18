import { createRef, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Card from "../../src/components/Layouts/Card";
import Layout from "../../src/components/Layouts";

import { startLoadProduct } from "../../src/actions/productsAction";
import { useCounter } from "../../src/hooks/useCounter";
import { newProduct } from "../../src/actions/shoppingCartActions";

const Show = () => {
    const { product } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const router = useRouter();
    const { id } = router.query;

    const img = createRef();
    const showImage = (newImg) => {
        img.current.src = newImg
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


    // const ImgProduct = forwardRef(({src, alt}, ref)=>{
    //     return  <Image src={src}alt={alt} layout="fill" ref={ref}/>
    // });

    const { counter, increaseBy, setCounter } = useCounter(1)

    const addCart = (product, value) => {
        dispatch(newProduct(product, value));
    }

    return (
        <Layout>
            <section className="container mx-auto mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-5 lg:p-10">
                    <div>
                        <div className="w-full mx-auto h-[15rem] md:h-[30rem] relative">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                                alt={product?.name}
                                priority
                                layout="fill"
                            />
                        </div>
                        <div>
                            <div className="flex md:mt-10">
                                <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer overflow-hidden relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                                        alt={product?.name}
                                        layout="fill"
                                        priority
                                    />
                                </div>
                                 {/* {   product?.multimedia.map(multimedia => (
                                        <div
                                            className="overflow-hidden border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer"
                                        >
                                            <img
                                                src={multimedia.path}
                                                alt=""
                                                onClick={e => showImage(e.target.src)}
                                                className="w-full h-full object-fill"
                                            />
                                        </div>
                                    ))
                                 } */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 p-2 md:pl-5 lg:pl-10">
                        <h2 className="text-3xl font-semibold uppercase">{product?.name}</h2>
                        <p className="mt-4 font-medium text-xl break-normal">
                            {product?.short_description}
                        </p>
                        <div className="mt-5">
                            <p className="font-bold text-3xl text-second-100 mr-12">
                                $100.00
                            </p>
                            <p className="mt-4 font-semibold uppercase">
                                {product?.quantity} Disponibles
                            </p>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center">
                                <h3 className="font-semibold text-lg">Categoria:</h3>
                                <Link href="/">
                                    <p className="text-second-100 font-semibold ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                        {product?.category?.name}
                                    </p>
                                </Link>
                            </div>
                            <div className="flex items-center">
                                <h3 className="font-semibold text-lg">Marca:</h3>
                                <Link href="/">
                                    <p className="text-second-100 font-semibold ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                        {product?.category?.name}
                                    </p>
                                </Link>
                            </div>
                            <div className="mt-5">
                                <h3 className="font-semibold text-lg mb-2">Tags:</h3>
                                <div className="md:inline-flex">
                                    <Link href="/">
                                        <p className="text-second-100 font-semibold mr-4 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                            {product?.category?.name}
                                        </p>
                                    </Link>
                                    <Link href="/">
                                        <p className="text-second-100 font-semibold mr-4 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                            {product?.category?.name}
                                        </p>
                                    </Link>
                                    <Link href="/">
                                        <p className="text-second-100 font-semibold mr-4 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                            {product?.category?.name}
                                        </p>
                                    </Link>
                                    <Link href="/">
                                        <p className="text-second-100 font-semibold mr-4 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                            {product?.category?.name}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-20">
                            <div className="flex items-center">
                                <button
                                    className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out"
                                    onClick={() => increaseBy(-1)}
                                >-</button>

                                <button className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out" onClick={() => increaseBy(+1)}
                                >+</button>

                                <span
                                    className="py-4 px-4 w-full w-full outline-none 
                                    border-0 text-center font-bold"
                                >
                                    {counter}
                                </span>

                                <button className="text-xs lg:text-sm  w-full mx-2 text-white mx-1 bg-black font-bold p-4 border-2 hover:bg-white hover:text-black hover:border-2 border-black transition-all duration-700 ease-in-out" onClick={() => { addCart(product, counter), setCounter(1) }}>
                                    <ShoppingCartIcon />
                                    ADD TO CART
                                </button>
                            </div>
                            <button className="border-black border-2 hover:bg-black hover:text-white mt-16 py-4 w-full font-bold
                            transition-all duration-700 ease-in-out
                            ">
                                COMPRAR AHORA!
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-10">
                    <h2 className="uppercase font-bold text-center text-2xl my-5">Descripción</h2>
                    <hr />
                    <p className="mt-7">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero dignissimos quisquam ea aspernatur recusandae doloribus nesciunt facere suscipit iste itaque aliquam ex ipsam perferendis accusamus nemo nisi excepturi, commodi a. Cumque iusto blanditiis, ullam facere, rem eaque dignissimos distinctio, explicabo commodi dolore hic voluptates cum aut ipsum dolorum optio laudantium magni recusandae odit repellendus pariatur. Fugit perferendis nesciunt, reiciendis itaque cum rerum cupiditate. Dolore cumque est obcaecati doloremque corporis ipsa quia nemo beatae voluptatum unde repudiandae cupiditate voluptate, reprehenderit perferendis!
                    </p>
                </div>
                <p className="uppercase font-bold text-center text-2xl mt-20 py-3 bg-gray-50">Productos relacionados</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        products.map((product, index) => (
                            <Card product={product} key={index} />
                        ))
                    }
                </div>
            </section>
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadProduct(ctx.query.id));
    })

export default Show;