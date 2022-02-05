import { useRef } from "react";
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
                    <Box className="overflow-y-auto drop-shadow-2xl w-11/12 md:w-8/12 rounded-xl border-2 mx-auto p-8 bg-white mt-5">
                        <p className="flex flex-row-reverse cursor-pointer" onClick={CloseModal}>X</p>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div>
                                <div>
                                    <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain w-full h-full p-2" ref={img} clasName="mb-0" />
                                </div>
                                <div>
                                    <div className="flex">
                                        <div className="border-2 border-black w-24 h-24 mx-1 cursor-pointer">
                                            <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" alt="" onClick={e => showImage(e.target.src)} />
                                        </div>
                                        <div className="border-2 border-black w-24 h-24 mx-1 cursor-pointer">
                                            <img src="https://cdn.shopify.com/s/files/1/0250/9661/8038/products/PREVENTION__DAILY_HYDRATING_MOISTURIZER_SPF_30_PDP-R02_600x.jpg?v=1618925348" alt="" onClick={e => showImage(e.target.src)} />
                                        </div>
                                        <div className="border-2 border-black w-24 h-24 mx-1 cursor-pointer">
                                            <img src="http://www.grupocrea.com.mx/img/product/05938-stampa-crea-mortar.jpg" alt="" onClick={e => showImage(e.target.src)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
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
                    </Box>
                </Fade>
            </Modal>
        </section>
    )
}

export default ShowProduct;

