import Link from 'next/link';
import { useRef, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const ProductDetails = ({ product }) => {
    const [quantity, setQuantity] = useState(null);
    const img = useRef(null);
    const showImage = (newImg) => {
        img.current.src = newImg
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ">
            <div>
                <div>
                    <img src={product?.principal_image} className="object-contain w-full h-full p-2" ref={img} />
                </div>
                <div>
                    <div className="flex">
                        <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer">
                            <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" alt="" onClick={e => showImage(e.target.src)} />
                        </div>
                        <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer">
                            <img src="https://cdn.shopify.com/s/files/1/0250/9661/8038/products/PREVENTION__DAILY_HYDRATING_MOISTURIZER_SPF_30_PDP-R02_600x.jpg?v=1618925348" alt="" onClick={e => showImage(e.target.src)} />
                        </div>
                        <div className="border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer">
                            <img src="http://www.grupocrea.com.mx/img/product/05938-stampa-crea-mortar.jpg" alt="" onClick={e => showImage(e.target.src)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-5 mt-10">
                <h2 className="text-2xl">{product?.name}</h2>
                <p className="mt-4 text-xl">
                    {product?.description}
                </p>
                <div className="mt-10 flex flex-row items-center">
                    <p className="font-bold text-3xl text-[#fa440a] mr-12">
                        ${product?.price}
                    </p>
                    <p className="text-lg">
                        {product?.quantity} availables
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
                        <button className="w-full  md:w-4/12 rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]">
                            <ShoppingCartIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductDetails;
