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

export default {
  priceFormat,
  toggleWishListProducts,
  existInWishList
}