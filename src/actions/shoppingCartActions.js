import client from "../config/axiosConfig";
import { shippingCosts } from "../staticData/shippingCosts";
import { types } from "../types";
import { helpers } from "../helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

/** Obtener carrito de compras de la base de datos */
export const startLoadShoppingCart = (token) =>{
   return async (dispatch) =>{
     try {
         let url = '/cart';
         const {data} = await client.get(url,{
            headers:{
               'Authorization': token
            }
         });  
         if(data.cart.products.length > 0){
            dispatch(loadShoppingCart(data.cart.products)); 
         }
                  
     } catch (error) {
        console.log(error);
     }
   }
}

export const loadShoppingCart = (shoppingCart) =>({
  type:types.loadShoppingCart,
  payload:shoppingCart
});



/**Agregar productos al carrito de compras */
export const startAddProductShoppingCart = (product ,name) =>{
   return async (dispatch) =>{
      try {
         delete product.product_id;
         product.product_id = product._id
         let url = '/cart';
         const {data} = await client.post(url , product);
         const shoppingCart = data.cart.products;
         Swal.fire({
            icon:"success",
            title:"¡¡Buen Trabajo!!",
            html:`<p class="font-Poppins text-base">El producto ${name} ha sido agregado al carrito satisfactoriamente</p>`,
            timer:3000,
            timerProgressBar:true,
            showConfirmButton:false
         });
         dispatch(addProductToShoppingCart(shoppingCart));
      } catch (error) {
         console.log(error);
         Swal.fire({
          icon:"error",
          title:"¡¡Ups , al parecer hubo un problema!!",
          text:"Vuelve a intentarlo en un rato más :( ",
          timer:3000,
          timerProgressBar:true,
          showConfirmButton:false
         })
      }
   }
}

export const addProductToShoppingCart = (shoppingCart) =>({
   type:types.updatedShoppingCart,
   payload:shoppingCart
});



/**calculate totals shoppingcart */

export const startCalculateTotalSale = () =>{
   
   return async (dispatch ,getState) =>{
      const {cart , cartNotLogged} = getState().cart;
      const {logged} = getState().auth;
     
      let subtotalCart = 0;

      if(logged){
         subtotalCart = cart.map(prod=>{
           const {totalWithDiscountApply} = helpers.calculatNewTotalToPay(prod.product_id.discount , prod.product_id.price );
  
           prod.subtotal = totalWithDiscountApply * prod.quantity;
           return prod;
        }).reduce( (prev , curr) =>prev + Number(curr.subtotal) , 0 );
         
      }else{

         subtotalCart = cartNotLogged.map(prod=>{
            const {totalWithDiscountApply} = helpers.calculatNewTotalToPay(prod.product_id.discount , prod.product_id.price );
   
            prod.subtotal = totalWithDiscountApply * prod.quantity;
            return prod;
         }).reduce( (prev , curr) =>prev + Number(curr.subtotal) , 0 );


      }

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




/**Remove Products shopping cart */

export const startRemoveProductShoppingCart = (_id) =>{
   return async (dispatch) => {
     try {
         let url = `/cart/product/${_id}`;
         const res = await client.delete(url);
         dispatch(removeProductShoppingCart( res.data.cart.products ));
     } catch (error) {
        console.log(error);
     }
   }
}

export const removeProductShoppingCart = (shoppingCart) =>({
   type:types.removeProductShoppingCart,
   payload:shoppingCart
});


/**update quantity product cart */
export const startUpdatedProductQuantity = (product) =>{
   return async ( dispatch ) =>{
     try {
        let url = '/cart';
        const {data} = await client.post(url , product);
        dispatch(updatedProductQuantity(data.cart.products));
     } catch (error) {
        console.log(error);
     }
   }
}
export const updatedProductQuantity = (shoppingCart) =>({
   type:types.updatedProductQuantity,
   payload:shoppingCart
});




/**load shoppingCart from localStorage */
export const addShoppingCartFromLocalStorage = (shoppingCart) =>({
   type:types.loadShoppingCartFromLocalStorage,
   payload:shoppingCart
})

/**load subtotals , totals in shoppingcart */
export const loadTotalsFromCookies = (superTotal , withDiscount , withoutDiscount , shippingCosts , order_id ) =>({
   type:types.loadTotalsFromCookies,
   payload:{
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts,
      order_id
   }
})


/**save shoppingcart in db */

export const startFinaliceSaleCheckout = (data) =>{
   return async (dispatch , getState)=>{
      const { shipping_costs } = getState().cart;
      try {
         const oldToken = Cookies.get('token');
         let url = '/orders/calculate/discount/web';
         const res = await client.post(url , data ,{
             headers: {
                'Authorization': oldToken
            }
          });
           Cookies.set('superTotal' , JSON.stringify(res.data.superTotal) );
           Cookies.set('withDiscount' , JSON.stringify(res.data.withDiscount) );
           Cookies.set('withoutDiscount' ,JSON.stringify(res.data.withoutDiscount));
           Cookies.set('shippingCosts' ,JSON.stringify(shipping_costs || {}));
           Cookies.set('order_id' ,JSON.stringify(res.data.order_id));

         dispatch(finaliceSaleCheckout(res.data.superTotal,
                                       res.data.withDiscount,  
                                       res.data.withoutDiscount,
                                       res.data.order_id
                                       ));
      } catch (error) {
         console.log(error);
      }

   }
}

export const finaliceSaleCheckout = (superTotal ,withDiscount ,  withoutDiscount , shippingCosts , order_id) =>({
   type:types.finaliceCheckoutCart,
   payload:{
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts,
      order_id
   }
});




/** Usuarios no autenticados */
export const addProductToCartClientsNotLogged = (cartNotLogged) =>({
   type:types.addProductShoppingCartNoLoggued,
   payload:cartNotLogged
});

export const shoppingCartNotLoggedfromLocalStorage = (cartNotLogged) =>({
   type:types.loadShoppingCartNotLoggedFromLocalStorage,
   payload:cartNotLogged
});

export const updatedProductQuantityCartNotLogged = (product) =>({
   type:types.updatedProductQuantityCartNotLogged,
   payload:product
});

export const removeProductsShoppingCartNotLogged = (_id) =>({
   type:types.deleteProductShoppingCartNotLogged,
   payload:_id
});




/**shoppingCart Fussion */

export const startloadshoppingCartFussion = (shoppingCartNotLogged , token) =>{
   return async (dispatch)=>{
      try {
         let url = '/cart/fussion';
         const products = {
            "products":shoppingCartNotLogged
         }
         const {data} = await client.post(url , products ,{
            headers:{
               'Authorization': token
            }
         });
         dispatch(loadShoppingCartFussion(data.cart.products));
      } catch (error) {
         console.log(error);
      }
   }
}

export const loadShoppingCartFussion = (fussionShoppingCart) =>({
   type:types.loadShoppingCartFussion,
   payload:fussionShoppingCart
});


/** Get shipping Address client */
export const startGetDirections = (token) => {
   return async (dispatch) => {
       let url = '/auth/directions/user';
       try {
           const res = await client.get(url, {
               headers: {
                   'Authorization': token
               }
           })
           dispatch(getDirections(res.data.directions));
       } catch (error) {
           console.log(error);
       }
   }
}

export const getDirections = (directions) => ({
   type: types.loadDirectionsShoppingCart,
   payload: directions
});

export const addShippingAddressSelected = (address) =>({
   type:types.addAddressSelected,
   payload:address
})
