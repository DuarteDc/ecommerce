import Image from "next/image";
import { IconContext } from "react-icons";
import {MdOutlineFileUpload} from "react-icons/md";
import { helpers } from "../../../helpers";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { OrderProductsList } from "./orderProductsList";
import { Modal } from "../../ui/modal";
import { UploadProofOfPayment } from "../../checkout/uploadProofOfPayment";

export const PendingPaymentOrderIndex = ({order , handleOpenProofOfPayment , openProofOfPayment}) =>{
    const total =  helpers.priceFormat(order.total);
    return(
     <div className="mb-6">
        <div className="bg-[#eee] border border-solid border-[#D5D9D9] py-3 px-10 rounded-t-[6px] flex">
        <div className="flex flex-around items-center w-1/2 font-Poppins">
          <div className="w-1/2">
            <span className="uppercase text-sm leading-6 text-[#333]">
                Pedido realizado
            </span>
            <p className="text-sm text-[#888]">
                03 de marzo de 2022
            </p>
          </div>
          <div className="w-1/3 text-center font-Poppins">
           <span className="uppercase text-sm leading-6 text-[#333]">
               Total
           </span>
            <p className="text-sm text-[#888]">
                {total}
            </p>
          </div>
          <div className="w-1/3 text-center font-Poppins">
           <span className="uppercase text-sm leading-6 text-[#333]">
            Enviado a:
           </span>
           <p className="text-sm text-[#888]">Rodrigo Alaguna</p>
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
            <div className="font-Poppins text-center">
              <span className="text-sm text-[#333]">Pedido N.º {order._id}</span>
              <div className="w-full">
               <span className="text-sm text-[#333] mr-6 text-[#1976d2] cursor-pointer border-b-3 hover:border-solid hover:text-[#880e4f] hover:transition-all">Ver detalle del Pedido</span> 
               <span className="text-sm text-[#333] text-[#1976d2] cursor-pointer hover:border-3 hover:border-solid hover:text-[#880e4f] hover:transition-all">Ver recibo</span>    
              </div>  
            </div>
        </div>
    </div>
    <div className="border-x border-solid border-[#D5D9D9] pt-3 pb-0 px-10">
    <div className="w-full flex justify-between items-center">
         <h3 className="font-Poppins text-lg leading-6 text-[#333]">
           Pedido Pendiente de Pago
         </h3>
         <button className="bg-[#FFD814] font-Poppins text-[#333] py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center rounded-md"
             onClick={()=>handleOpenProofOfPayment(order._id)}
           >
             <IconContext.Provider value={{className:"color-[#fff] , text-[20px] , mr-[10px]"}}>
               <MdOutlineFileUpload/>
             </IconContext.Provider>
             <span>Comprobante de pago</span> 
           </button>
     </div>
    </div>
    <div className="border-x border-b border-solid border-[#D5D9D9] py-3 px-10">
     <div className="w-full flex">
         <Swiper
          pagination={{clickable:true}}
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          navigation={false}
          loop={false}
          className="mySwiper w-full"
          modules={[Pagination, Autoplay , Navigation]}
           
         >
         {
             order.products_list.map(product=>(
               <SwiperSlide key={product.product_id}>
                <OrderProductsList
                  product={product}
                />
              </SwiperSlide>
             ))
         }
         </Swiper>
     </div>
    </div>
    </div>
    )
}