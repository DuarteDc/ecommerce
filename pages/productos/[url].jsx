import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Layout from "../../src/components/Layouts";

import { startLoadProduct } from "../../src/actions/productsAction";
import { useCounter } from "../../src/hooks/useCounter";

//import { newProduct } from "../../src/actions/shoppingCartActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { successNotify } from "../../src/helpers/helpers";
import { helpers } from "../../src/helpers";
import { addProductToCartClientsNotLogged, addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage, startAddProductShoppingCart } from "../../src/actions/shoppingCartActions";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { ProductCard } from "../../src/components/ui";
import Image from "next/image";


const Show = () => {
    const router = useRouter();
    const { product, relatedProducts } = useSelector((state) => state.products);
    const { cart, cartNotLogged } = useSelector((state) => state.cart);
    const { logged } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const img = useRef();

    const [isEnable, setIsEnable] = useState(false);

    // const showImage = (newImg) => {
    //     img.current.src = newImg;
    // }

    const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product.discount, product.price);
    const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);

    const { counter, increaseBy, setCounter } = useCounter(1);

    const addProductCard = (product) => {
        const exists = helpers.existInShoppingCart(product._id, cart);

        if (exists) {
            notify('El producto ya ha sido agregado al carrito de compras');
            return;
        }

        const itemCart = {
            product_id: {
                price: product.price,
                quantity: product.quantity,
                multimedia: product.multimedia,
                _id: product._id,
                name: product.name,
                discount: product.discount
            },
            quantity: counter,
            _id: product._id
        }

        if (logged) {
            let shoppingCart = [...cart, itemCart];
            localStorage.setItem('cart', JSON.stringify(shoppingCart));
            dispatch(startAddProductShoppingCart(itemCart, product.name));
            return;
        } else {
            let shoppingCart = [...cartNotLogged, itemCart];
            dispatch(addProductToCartClientsNotLogged(shoppingCart));
            localStorage.setItem('cartNotlogged', JSON.stringify(shoppingCart));
            Swal.fire({
                icon: "success",
                title: "¡¡Buen Trabajo!!",
                html: `<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
            })
            return;
        }

    }

    const handleClickButtonAdd = () => {
        Swal.fire({
            icon: "warning",
            title: "Ups , hubo un problema",
            text: "El producto ya se encuentra agregado al carrito de compras",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    }

    const handleClickRedirectCart = () => {
        router.push('/mi-carrito');
    }

    useEffect(() => {
        if (logged) {
            const exists = helpers.existInShoppingCart(product._id, cart);
            setIsEnable(exists);
        } else {
            const exists = helpers.existInShoppingCart(product._id, cartNotLogged);
            setIsEnable(exists);
        }

    }, [cart, cartNotLogged]);


    useEffect(() => {
        if (!logged) {
            let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
            dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
    }, [logged]);

    useEffect(() => {
        if (logged) {
            const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            dispatch(addShoppingCartFromLocalStorage(shoppingCart))
        }
    }, [logged]);

    return (
        <Layout>
            <section className="container mx-auto mt-20 font-Poppins">
                <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-5 lg:p-10">
                    <div className="lg:pb-5 md:px-5">
                        <Image
                            src={product?.multimedia[0].path}
                            alt={product?.name}
                            width={100}
                            height={100}
                            layout="responsive"
                        />
                    </div>
                    <div className="mt-5 md:mt-0 p-2 md:pl-5 lg:pl-10">
                        <h1 className="text-3xl uppercase font-medium">{product?.name}</h1>
                        <div className="mt-5">
                            <div className="flex">
                                {
                                    product.discount > 0 && (
                                        <p className="text-3xl text-second-100 mr-12">
                                            {sale_price_discount}
                                        </p>
                                    )
                                }
                                <p className={`mr-12 ${product.discount > 0 ? 'line-through text-gray-500 text-2xl font-thin' : 'text-3xl text-second-100'}`}>
                                    ${product?.price}
                                </p>
                            </div>
                            <p className="mt-4 font-medium uppercase">
                                {product?.quantity} Disponibles
                            </p>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center">
                                <h3 className="font-medium text-lg">Categoria:</h3>
                                <p className="text-second-100 font-medium ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                    {product?.category?.name}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <h3 className="font-medium text-lg">Marca:</h3>
                                <p className="text-second-100 font-medium ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                    {product?.brand?.name}
                                </p>
                            </div>
                            <div className="mt-5">
                                <h3 className="font-medium text-lg mb-2">Tags:</h3>
                                <div className="md:inline-flex">
                                    {
                                        product.tags.map(tag => (
                                            <span key={tag.tag_id._id}>
                                                <p className="text-second-100 font-medium mr-4 cursor-pointer hover:text-gray-700 duration-500">
                                                    {tag.tag_id.name}
                                                </p>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-20">
                            <div className="flex items-center">
                                <button
                                    className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out"
                                    onClick={() => increaseBy(-1)}
                                >
                                    -
                                </button>

                                <button className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out" onClick={() => increaseBy(+1)}
                                >
                                    +
                                </button>

                                <span
                                    className="py-4 px-4 w-full outline-none 
                                    border-0 text-center font-bold"
                                >
                                    {counter}
                                </span>
                                {
                                    isEnable ?
                                        <button
                                            className="text-xs lg:text-sm  w-full mx-2 text-[#fff] bg-[#333]
                                        font-bold p-4 border-2  border-[#888] transition-all duration-700 ease-in-out uppercase"
                                            onClick={() => handleClickButtonAdd()}
                                        >
                                            Ya agregado al carrito
                                        </button>
                                        :

                                        <button
                                            className="text-xs lg:text-sm w-full mx-2 text-white bg-[#333] font-bold p-4 border-2 hover:bg-white hover:text-[#333] hover:border-2 border-[#333] transition-all duration-700 ease-in-out uppercase"
                                            onClick={() => addProductCard(product)}>
                                            <ShoppingCartIcon />
                                            Añadir a carrito
                                        </button>

                                }

                            </div>
                            <button className="border-[#333] border-2 hover:bg-[#333] hover:text-white mt-16 py-4 w-full font-bold
                            transition-all duration-700 ease-in-out
                            "
                                onClick={() => handleClickRedirectCart()}
                            >
                                COMPRAR AHORA!
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-10 w-full break-words">
                    <h2 className="uppercase font-bold text-center text-2xl my-5">Descripción</h2>
                    <hr />
                    <p className="mt-7 font-normal">
                        {product.description}
                    </p>
                </div>
                <p className="uppercase font-bold text-center text-2xl mt-20 py-3 bg-gray-50">Relacionados</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 my-24">
                    {
                        relatedProducts.map(product => (
                            <ProductCard product={product} key={product._id} />
                        ))
                    }
                </div>
            </section>
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadProduct(ctx.query.url));
        await store.dispatch(startLoadAdministrableLogo());
    })

export default Show;