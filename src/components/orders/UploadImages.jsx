import { useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import ItemUploadImage from "./ItemUploadImage";
import { startFinishOrderCanvas } from "../../actions/ordersActions";
import { useDispatch } from 'react-redux';

const UploadImages = ({ handleOpenUploadImages }) => {

    const { productDetail, order_id } = useSelector(state => state.orders);
    const dispatch = useDispatch();

    const buttonToSendCanvas = useRef('');

    const disableButton = () =>{
        buttonToSendCanvas.current.disabled = true;
    }

    const startFinishCanvas = async (order_id) => {
        handleOpenUploadImages();
        const data = new FormData();
        data.append('product_id', productDetail?.product?._id);
        Swal.fire({
            title: "¿Deseas finalizar tu orden canvas?",
            text: "Una vez enviadas las imagenes no sera posible modificar su orden",
            icon: "question",
            showCancelButton: true,
            cancelButtonText: 'Cancelar!',
            cancelButtonColor: "#b71c1c",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#1976d2",
            allowOutsideClick: false,
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(startFinishOrderCanvas(data, order_id));                
            }
        });
    }

    return (
        <div className="font-Poppins">
            <h2 className="text-lg md:text-3xl text-center uppercase mb-5">Sube tus imagenes canvas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="text-center m-auto p-5">
                    <h2 className="text-gray-500">Diseño seleccionado</h2>
                    <img
                        src={productDetail?.product?.multimedia[0]?.path} alt={productDetail?.product?.name}
                        width="200"
                        height="200"
                        className="w-[15rem] h-[15rem]"
                    />
                </div>
                <div className="col-span-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-5 md:mt-0 justify-center items-center overflow-hidden mx-auto flex">
                        {
                            productDetail?.canvas_multimedia?.map((image, index) => (
                                <ItemUploadImage
                                    key={index}
                                    image={image}
                                    product={productDetail.product_id}
                                    index={index}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse mt-10">
                <button
                    className={`px-10 py-4 bg-[#e91e63] text-white font-semibold w-full hover:bg-[#e91e72]'}`}
                    onClick={() => {  disableButton(); startFinishCanvas(order_id); }}
                    ref={buttonToSendCanvas}
                >
                    Finalizar
                </button>
            </div>
        </div>
    )
}

export default UploadImages