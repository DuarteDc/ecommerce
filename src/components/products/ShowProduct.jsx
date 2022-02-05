import { useRef, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const ShowProduct = ({ isOpen, CloseModal }) => {
    const img = useRef(null);
    const showImage = (newImg) => {
        img.current.src = newImg
    }
    const [quantity, setQuantity] = useState(null);
    return (
        <section>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={CloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box className="overflow-hidden drop-shadow-2xl w-11/12 md:w-8/12 rounded-xl border-2 mx-auto p-8 bg-white mt-5">
                        <span className="flex flex-row-reverse cursor-pointer" onClick={CloseModal}>
                            <CloseIcon />
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 ">
                            <div>
                                <div>
                                    <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain w-full h-full p-2" ref={img} />
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
                                        <button className="w-full mx-2 md:w-4/12 rounded-lg text-white mx-1 bg-[#f58d16] font-bold p-4 hover:bg-[#ff9f30]">
                                            <ShoppingCartIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </section>
    )
}

export default ShowProduct;

