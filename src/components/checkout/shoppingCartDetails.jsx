import Image from "next/image";
import { useSelector } from "react-redux"
import {MdOutlineRemoveShoppingCart} from "react-icons/md";
import { IconContext } from "react-icons";

export const ShoppingCartDetails = () =>{
    const { cart } = useSelector((state)=>state.cart);
    return(
        <div className="w-full">
            <h3 className="font-Poppins text-[20px] font-semibold leading-[1.4] text-[#333] mb-10 text-center">
                     Resumen de la orden
            </h3>
            {
            !cart.length ?
              <div className="flex justify-center py-[30px] px-[60px] items-center">
                  <IconContext.Provider value={{className:"text-6xl"}}>
                   <MdOutlineRemoveShoppingCart/>
                  </IconContext.Provider>
                  No hay productos en el resumen de orden
              </div>
            :
            cart.map(shopping=>(
         <div className="flex py-[30px] px-[60px]" key={shopping._id}>
          <div className="mr-[20px]">
            <Image
              src={shopping?.product_id?.multimedia[0]?.path}
              width={200}
              height={200}
            />
          </div>
          <div className="flex justify-between w-full">
            <div className="">
              <h4 className="font-Poppins font-normal leading-10 text-base text-[#333] capitalize">{shopping?.product_id?.name}</h4>
              <span className="font-Poppins leading-10 text-sm font-normal text-[#333]">
                  Descuento: {shopping?.product_id?.discount}%
              </span>
              <p className="font-Poppins font-normal leading-10 text-sm text-[#333]">Cantidad: {shopping.quantity} piezas</p>
            </div>
            <div className="h-full">
             <span className="leading-10 text-[#333]"> $75.00 </span>
            </div>
         </div>  
        </div>
                ))
            }
        </div>
    )
}