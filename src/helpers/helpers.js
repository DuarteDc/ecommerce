import { toast } from 'react-toastify';

const priceFormat = (number) =>{
    const price = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      }).format(number);
    return price;
}

const toggleWishListProducts = (_id) =>{

  if( typeof window === 'undefined') return false;
  
  let wishListProducts = JSON.parse(localStorage.getItem('wishListProducts') || '[]');
  let message = '';

  if(wishListProducts.includes(_id)){
    
    wishListProducts = wishListProducts.filter(productId => productId !== _id);
    message = "Producto eliminado de mi lista de deseos ";
  }else{
    wishListProducts.push(_id);
    message = "Producto Agregado a lista de deseos";
  }

  localStorage.setItem('wishListProducts', JSON.stringify(wishListProducts));

  return message;
}

const existInWishList = (_id) =>{

  if( typeof window === 'undefined') return false;

  const wishList = JSON.parse(localStorage.getItem('wishListProducts' || '[]'));
  if(!wishList){
     return false;
  }
  return wishList.includes(_id);

}

const existInShoppingCart = (_id , ShoppingCart) =>{

  const existProduct = ShoppingCart.filter(cart=>cart.product_id._id === _id );

   if(!existProduct.length){
     return false;
   }else{
     return true;
   }
}


export const successNotify = (message) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

export const infoNotify = (message) => {
  toast.info(message, {
     position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}
export const warningNotify = (message) => {
  toast.warn(message, {
     position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

export const errorNotify = (message) => {
  toast.error(message, {
     position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

/**funcion que nos permite calcular el descuento del subtotal de la venta */
export const calculatNewTotalToPay = (porcentage, subtotal) => {
  let totalWithDiscountApply = 0;
  let discountApply = 0;
  /**Obtenemos la cantidad a descontar */
  discountApply = (subtotal * Number(porcentage)) / 100;
  //obtenemos el total a pagar de la venta de menudeo con el descuento ya aplicado
  totalWithDiscountApply = (subtotal - discountApply).toFixed(3);
  return {
    totalWithDiscountApply,
    discountApply,
  };
};


export default {
  priceFormat,
  toggleWishListProducts,
  existInWishList,
  existInShoppingCart,
  successNotify,
  infoNotify,
  warningNotify,
  errorNotify,
  calculatNewTotalToPay


}