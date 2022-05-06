import { useSelector } from "react-redux"
import {MdOutlineRemoveShoppingCart} from "react-icons/md";
import { IconContext } from "react-icons";
import { ShoppingCartDetail } from "./shoppingCartDetail";

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
              <ShoppingCartDetail
                 key={shopping._id}
                 shopping={shopping}
              />
            ))
            }
        </div>
    )
}