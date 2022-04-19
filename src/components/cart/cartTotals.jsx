import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { startFinaliceSaleCheckout } from "../../actions/shoppingCartActions"
import { InfoShippingCosts } from "./infoShippingCosts"
import { SubtotalInfo } from "./subtotalInfo"
import { ShippingAddress } from "./shippingAddress"
import { TotalShoppingCart } from "./totalShoppingCart"
import {toast } from "react-toastify";
import Swal from "sweetalert2"

export const CartTotals = () =>{
    const dispatch = useDispatch();
    const { logged } = useSelector((state)=>state.auth);
    const {cart , subtotal , total , shipping_costs , shippingAddress , addressSelected} = useSelector((state)=>state.cart);
    const router = useRouter();

    const notify = (message) =>toast(message);

    const proceedToCheckout = () =>{
     if(!logged){
         router.push('/auth/login');
         return;
     } 

     if(!shippingAddress.length){
       Swal.fire({
         icon:'error',
         title:'Ups , hubo un problema',
         text:'Al parecer no tienes direcciones de envío registradas , agrega una dirección y vuelve a intentarlo',
         timer:3000,
         timerProgressBar:true,
         showConfirmButton:false
       });
       router.push('/perfil');
       return;
     }

     if(shippingAddress.length > 0 && !Object.keys(addressSelected).length){
      Swal.fire({
        icon:'error',
        title:'Ups , hubo un problema',
        text:'Selecciona una dirección de envío',
        timer:3000,
        timerProgressBar:true,
        showConfirmButton:false
      });
     }

    let productsDiscount = cart.filter(product=>product.product_id.discount > 0);
    let productsWithoutDiscount = cart.filter(product=>product.product_id.discount === 0);

    if(!productsDiscount.length && !productsWithoutDiscount.length ){
      notify('Debes agregar almenos un producto al carrito de compras')
      return;
    }

    const data = {
      "productsDiscount": productsDiscount,
      "productsWithoutDiscount": productsWithoutDiscount,
      "shipment":shipping_costs[0]?.shippingCosts,
      "coupon_id":"",
      "shippment_direction":addressSelected
    }
      dispatch(startFinaliceSaleCheckout(data));
    }

    return (
       <div className="mx-[25px] border-[1px] border-solid border-[#888] py-[60px] px-[30px]">
        <h4 className="font-Poppins text-[20px] text-center leading-[1.3] uppercase pb-[30px]">Total Carrito</h4>
        <div className="border-b-[1px] flex justify-start flex-wrap pb-[13px]">
            <SubtotalInfo
              subtotal={subtotal}
            />
        </div>
        <div className="border-b-[1px] border-dashed border-[#d9d9d9] flex flex-wrap flex-start pt-[20px]">
          <InfoShippingCosts/>
          <div className="w-full flex justify-center flex-wrap my-[20px]">
           <ShippingAddress/>
          </div>
          <div className=" flex flex-wrap items-start pb-[33px] pt-[27px] justify-aound w-full">
           <TotalShoppingCart 
             total={total}
           />
          </div>
          <button className="rounded-[25px] bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
          onClick={()=>proceedToCheckout()}
          >
              Continuar
          </button>
        </div>
       </div>
    )
}