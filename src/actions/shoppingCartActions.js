import client from "../config/axiosConfig";
import { shippingCosts } from "../staticData/shippingCosts";
import { types } from "../types";
import { helpers } from "../helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";

/** Obtener carrito de compras de la base de datos */
export const startLoadShoppingCart = (token) => {
   return async (dispatch) => {
      try {
         let url = '/cart';
         const { data } = await client.get(url, {
            headers: {
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

export const loadShoppingCart = (shoppingCart) => ({
   type: types.loadShoppingCart,
   payload: shoppingCart
});



/**Agregar productos al carrito de compras */
<<<<<<< HEAD
export const startAddProductShoppingCart = (product ,name , token) =>{
   return async (dispatch) =>{
=======
export const startAddProductShoppingCart = (product, name) => {
   return async (dispatch) => {
>>>>>>> e35e569f828a3b3f1333bbec9682c9dfc688d81a
      try {
         delete product.product_id;
         product.product_id = product._id
         let url = '/cart';
<<<<<<< HEAD
         const {data} = await client.post(url , product ,{
            headers: {
                'Authorization': token
            }
          });
=======
         const { data } = await client.post(url, product);
>>>>>>> e35e569f828a3b3f1333bbec9682c9dfc688d81a
         const shoppingCart = data.cart.products;
         Swal.fire({
            icon: "success",
            title: "¡¡Buen Trabajo!!",
            html: `<p class="font-Poppins text-base">El producto ${name} ha sido agregado al carrito satisfactoriamente</p>`,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
         });
         dispatch(addProductToShoppingCart(shoppingCart));
      } catch (error) {
         console.log(error);
         Swal.fire({
            icon: "error",
            title: "¡¡Ups , al parecer hubo un problema!!",
            text: "Vuelve a intentarlo en un rato más :( ",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
         })
      }
   }
}

export const addProductToShoppingCart = (shoppingCart) => ({
   type: types.updatedShoppingCart,
   payload: shoppingCart
});



/**calculate totals shoppingcart */

export const startCalculateTotalSale = () => {

   return async (dispatch, getState) => {
      const { cart, cartNotLogged, coupon } = getState().cart;
      const { logged } = getState().auth;

      let subtotalCart = 0;
      let subtotalWithCoupon = 0;
      let total = 0;

      if (logged) {
         subtotalCart = cart.map(prod => {
            const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(prod.product_id.discount, prod.product_id.price);

            prod.subtotal = totalWithDiscountApply * prod.quantity;
            return prod;
         }).reduce((prev, curr) => prev + Number(curr.subtotal), 0);

      } else {

         subtotalCart = cartNotLogged.map(prod => {
            const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(prod.product_id.discount, prod.product_id.price);

            prod.subtotal = totalWithDiscountApply * prod.quantity;
            return prod;
         }).reduce((prev, curr) => prev + Number(curr.subtotal), 0);


      }

      const shippingSelected = shippingCosts.filter((shipping) => shipping.minSale <= subtotalCart && shipping.maxSale >= subtotalCart);
      if (coupon) {
         subtotalWithCoupon = helpers.applyCoupon(subtotalCart, coupon.discount)
         total = Number(shippingSelected[0]?.shippingCosts) + Number(subtotalWithCoupon) || 0;
      } else {
         total = Number(shippingSelected[0]?.shippingCosts) + Number(subtotalCart) || 0;
      }
      dispatch(calculateTotalSale(subtotalWithCoupon, subtotalCart, total, shippingSelected))

   }
}

export const calculateTotalSale = (subtotalWithCoupon, subtotalCart, total, shippingSelected) => ({
   type: types.calculateTotalShoppingCart,
   payload: {
      subtotalWithCoupon,
      subtotalCart,
      total,
      shippingSelected
   }
});




/**Remove Products shopping cart */

export const startRemoveProductShoppingCart = (_id) => {
   return async (dispatch) => {
      try {
         let url = `/cart/product/${_id}`;
         const res = await client.delete(url);
         dispatch(removeProductShoppingCart(res.data.cart.products));
      } catch (error) {
         console.log(error);
      }
   }
}

export const removeProductShoppingCart = (shoppingCart) => ({
   type: types.removeProductShoppingCart,
   payload: shoppingCart
});


/**update quantity product cart */
export const startUpdatedProductQuantity = (product) => {
   return async (dispatch) => {
      try {
         let url = '/cart';
         const { data } = await client.post(url, product);
         dispatch(updatedProductQuantity(data.cart.products));
      } catch (error) {
         console.log(error);
      }
   }
}
export const updatedProductQuantity = (shoppingCart) => ({
   type: types.updatedProductQuantity,
   payload: shoppingCart
});




/**load shoppingCart from localStorage */
export const addShoppingCartFromLocalStorage = (shoppingCart) => ({
   type: types.loadShoppingCartFromLocalStorage,
   payload: shoppingCart
})

/**load subtotals , totals in shoppingcart */
export const loadTotalsFromCookies = (superTotal, withDiscount, withoutDiscount, shippingCosts, order_id) => ({
   type: types.loadTotalsFromCookies,
   payload: {
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts,
      order_id
   }
})


/**save shoppingcart in db */

export const startFinaliceSaleCheckout = (data) => {
   return async (dispatch, getState) => {

      const { shipping_costs } = getState().cart;
      try {
         const oldToken = Cookies.get('token');
         let url = '/orders/calculate/discount/web';
         const res = await client.post(url, data, {
            headers: {
               'Authorization': oldToken
            }
         });

         Cookies.set('superTotal', JSON.stringify(res.data.superTotal));
         Cookies.set('withDiscount', JSON.stringify(res.data.withDiscount));
         Cookies.set('withoutDiscount', JSON.stringify(res.data.withoutDiscount));
         Cookies.set('shippingCosts', JSON.stringify(shipping_costs || {}));
         Cookies.set('order_id', JSON.stringify(res.data.order_id));

         dispatch(finaliceSaleCheckout(res.data.superTotal,
            res.data.withDiscount,
            res.data.withoutDiscount,
            res.data.order_id,
         ));
      } catch (error) {
         console.log(error);
      }

   }
}

export const finaliceSaleCheckout = (superTotal, withDiscount, withoutDiscount, shippingCosts, order_id) => ({
   type: types.finaliceCheckoutCart,
   payload: {
      superTotal,
      withDiscount,
      withoutDiscount,
      shippingCosts,
      order_id,
   }
});




/** Usuarios no autenticados */
export const addProductToCartClientsNotLogged = (cartNotLogged) => ({
   type: types.addProductShoppingCartNoLoggued,
   payload: cartNotLogged
});

export const shoppingCartNotLoggedfromLocalStorage = (cartNotLogged) => ({
   type: types.loadShoppingCartNotLoggedFromLocalStorage,
   payload: cartNotLogged
});

export const updatedProductQuantityCartNotLogged = (product) => ({
   type: types.updatedProductQuantityCartNotLogged,
   payload: product
});

export const removeProductsShoppingCartNotLogged = (_id) => ({
   type: types.deleteProductShoppingCartNotLogged,
   payload: _id
});




/**shoppingCart Fussion */

export const startloadshoppingCartFussion = (shoppingCartNotLogged, token) => {
   return async (dispatch) => {
      try {
         let url = '/cart/fussion';
         const products = {
            "products": shoppingCartNotLogged
         }
         const { data } = await client.post(url, products, {
            headers: {
               'Authorization': token
            }
         });
         dispatch(loadShoppingCartFussion(data.cart.products));
      } catch (error) {
         console.log(error);
      }
   }
}

export const loadShoppingCartFussion = (fussionShoppingCart) => ({
   type: types.loadShoppingCartFussion,
   payload: fussionShoppingCart
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

export const addShippingAddressSelected = (address) => ({
   type: types.addAddressSelected,
   payload: address
})


/****************cupones*********************/

export const getCoupon = (subtotal, coupon) => {
   return async (dispatch) => {
      let url = `coupons/code/${coupon}`
      try {
         const res = await client.get(url);
         if (res.data.coupon) {
            const newSubtotal = await helpers.applyCoupon(subtotal, res.data.coupon.discount);
            dispatch(addCoupon(newSubtotal, res.data.coupon));
         }
         return {
            hasError: false,
            message: res.data.message,
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            return {
               hasError: true,
               message: error?.response?.data?.message
            }
         }

         return {
            hasError: true,
            message: "Parece que hubo un error - Intente más tarde"
         }
      }
   }
}

export const addCoupon = (subtotal, coupon) => ({
   type: types.add_coupon,
   payload: {
      subtotal,
      coupon
   }
})

export const removeCoupon = () => ({
   type: types.remove_coupon,
})