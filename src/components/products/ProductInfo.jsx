import { useRef } from "react";
import { priceFormat } from "../../helpers/helpers";
import { useCounter } from "../../hooks/useCounter";
import Link from "next/link";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch } from "react-redux";
import { newProduct } from "../../actions/shoppingCartActions";

const ProductInfo = ({ productSelected, CloseModal }) => {
    const dispatch = useDispatch();
    const img = useRef(null);
    const { counter, increaseBy, setCounter } = useCounter(1);
    const price = priceFormat(productSelected?.price || 0);
    const showImage = (newImg) => {
        img.current.src = newImg
    }
    const addCart = (product, value) => {
        dispatch(newProduct(product, value));
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div>
                    <div className="w-full">
                        <img src={productSelected?.principal_image}
                            className="object-contain w-full h-64 p-2" ref={img}
                        />
                    </div>
                    <div>
                        <div className="flex">
                            <div
                                className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer overflow-hidden"
                            >
                                <img
                                    src={productSelected?.principal_image}
                                    alt=""
                                    onClick={e => showImage(e.target.src)}
                                />
                            </div>
                            {
                                productSelected?.multimedia.map(multimedia => (
                                    <div
                                        className="overflow-hidden border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer"
                                    >
                                        <img
                                            src={multimedia.path}
                                            alt=""
                                            onClick={e => showImage(e.target.src)}
                                            className="w-full h-full"
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="px-5 mt-10">
                    <h2 className="text-2xl">{productSelected?.name}</h2>
                    <p className="mt-4 text-xl">
                        {productSelected?.description}
                    </p>
                    <div className="mt-10 flex flex-row items-center">
                        <p className="font-bold text-3xl text-[#fa440a] mr-12">
                            {price}
                        </p>
                        <p className="text-lg">
                            {productSelected?.quantity} Disponibles
                        </p>
                    </div>
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold">Categorias</h3>
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
                            <button
                                className="rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]" onClick={() => increaseBy(-1)}
                            >
                                -
                            </button>
                            <button className="rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]" onClick={() => increaseBy(+1)}>+</button>
                            <input value={counter} type="text" placeholder="quantity" className="rounded-lg py-4 border-2 border-gray-800 px-4 w-full md:w-1/3" />
                            <button className="w-full mx-2 md:w-4/12 rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]" onClick={() => { addCart(productSelected, counter), CloseModal(), setCounter(1) }}>
                                <ShoppingCartIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductInfo