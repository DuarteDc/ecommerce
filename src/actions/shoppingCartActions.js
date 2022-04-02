import client from "../config/axiosConfig";
import { shippingCosts } from "../staticData/shippingCosts";
import { types } from "../types";
import Cookies from 'js-cookie';
import { helpers } from "../helpers";

export const startFinaliceSaleCheckout = (data) =>{
   return async (dispatch , getState)=>{
      const { shipping_costs } = getState().cart;
      try {
         const oldToken = Cookies.get('token');
         let url = '/orders/calculate/discount';
         const res = await client.post(url , data ,{
             headers: {
                'Authorization': oldToken
            }
          });
          Cookies.set('superTotal' , JSON.stringify(res.data.superTotal) );
          Cookies.set('withDiscount' , JSON.stringify(res.data.withDiscount) );
          Cookies.set('withoutDiscount' ,JSON.stringify(res.data.withoutDiscount));
          Cookies.set('shippingCosts' ,JSON.stringify(shipping_costs || {}));

          dispatch(finaliceSaleCheckout(res.data.superTotal , res.data.withDiscount ,  res.data.withoutDiscount))
      } catch (error) {
         console.log(error);
      }

   }
}

export const finaliceSaleCheckout = (superTotal ,withDiscount ,  withoutDiscount , shippingCosts) =>({
   type:types.finaliceCheckoutCart,
   payload:{
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts
   }
})

export const addShoppingCart = (product) =>({
    type:types.addProductShoppingCart,
    payload:product
});

export const loadCartfromCookies = (cart) => ({
   type:types.loadShoppingCartFromCookies,
   payload:cart
});

export const updatedProductQuantity = (product) =>({
   type:types.updatedProductQuantity,
   payload:product
});

export const startCalculateTotalSale = () =>{
   
   return async (dispatch ,getState) =>{
      const {cart} = getState().cart;
      const subtotalCart = cart.map(prod=>{
         let subtotal = prod.price * prod.quantity;
         const {totalWithDiscountApply} = helpers.calculatNewTotalToPay(prod.discount , subtotal );
         prod.subtotal = totalWithDiscountApply;
         return prod;
      }).reduce( (prev , curr) =>prev + Number(curr.subtotal) , 0 );

      const shippingSelected = shippingCosts.filter((shipping)=>shipping.minSale <= subtotalCart &&  shipping.maxSale >= subtotalCart);
      const total = Number(shippingSelected[0]?.shippingCosts) + Number(subtotalCart) || 0;

      
      dispatch(calculateTotalSale(subtotalCart , total , shippingSelected))

   }
}

export const calculateTotalSale = (subtotalCart , total , shippingSelected) =>({
   type:types.calculateTotalShoppingCart,
   payload:{
      subtotalCart,
      total,
      shippingSelected
   }
});


export const loadTotalsFromCookies = (superTotal , withDiscount ,  withoutDiscount , shippingCosts) =>({
  type:types.loadTotalsFromCookies,
  payload:{
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts
  }
})

