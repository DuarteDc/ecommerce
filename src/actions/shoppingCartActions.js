import client from "../config/axiosConfig";
import { shippingCosts } from "../staticData/shippingCosts";
import { types } from "../types";


export const startFinaliceSaleCheckout = (cart) =>{
   return async (dispatch)=>{

      try {
         let url = '/orders/calculate/discount';
         const res = await client.post(url , cart);
         console.log(res);
      } catch (error) {
         
      }

   }
}

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
         prod.subtotal = prod.price * prod.quantity;
         return prod;
      }).reduce( (prev , curr) =>prev + curr.subtotal , 0 );

      const shippingSelected = shippingCosts.filter((shipping)=>shipping.minSale <= subtotalCart &&  shipping.maxSale >= subtotalCart);
      const total = Number(shippingSelected[0]?.shippingCosts) + Number(subtotalCart) || 0;

      
      dispatch(calculateTotalSale(subtotalCart , total ))

   }
}

export const calculateTotalSale = (subtotalCart , total) =>({
   type:types.calculateTotalShoppingCart,
   payload:{
      subtotalCart,
      total
   }
})

