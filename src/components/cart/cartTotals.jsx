import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { startFinaliceSaleCheckout } from "../../actions/shoppingCartActions"
import { InfoShippingCosts } from "./infoShippingCosts"
import { SubtotalInfo } from "./subtotalInfo"
import { TableShippingCosts } from "./tableShippingCosts"
import { TotalShoppingCart } from "./totalShoppingCart"

export const CartTotals = () =>{
    const dispatch = useDispatch();
    const { logged } = useSelector((state)=>state.auth);
    const {cart , subtotal , total} = useSelector((state)=>state.cart);
    const router = useRouter();

    const proceedToCheckout = () =>{
     if(!logged){
         router.push('/auth/login');
         return;
     } 

    let productsDiscount = cart.filter(product=>product.discount > 0);
    let productsWithoutDiscount = cart.filter(product=>product.discount === 0);

    const data = {
      "productsDiscount": productsDiscount,
      "productsWithoutDiscount": productsWithoutDiscount
    }
    
      dispatch(startFinaliceSaleCheckout(data));
    }

    return (
       <div className="border-[1px] border-solid border-[#e6e6e6] mr-[40px] ml-[63px] px-[40px] pb-[40px] pt-[30px] text-center w-full">
        <h4 className="font-Poppins text-[20px] leading-[1.3] uppercase pb-[30px]">Total Carrito</h4>
        <div className="border-b-[1px] flex justify-start flex-wrap pb-[13px]">
            <SubtotalInfo
              subtotal={subtotal}
            />
        </div>
        <div className="border-b-[1px] border-dashed border-[#d9d9d9] flex flex-wrap flex-start pt-[20px]">
          <InfoShippingCosts/>
          <div className="w-full flex justify-center my-[20px]">
           <TableShippingCosts/>
          </div>
          <div className=" flex flex-wrap items-start pb-[33px] pt-[27px] justify-aound w-full">
           <TotalShoppingCart 
             total={total}
           />
          </div>
          <button className="rounded-[25px] bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
          onClick={()=>proceedToCheckout()}
          >
              Pagar
          </button>
        </div>
       </div>
    )
}