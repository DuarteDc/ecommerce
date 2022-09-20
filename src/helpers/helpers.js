import { toast } from 'react-toastify';
import Swal from "sweetalert2"
import Cookies from 'js-cookie';

const priceFormat = (number) => {
  const currency = Cookies.get('Currency') || 'MXN'
  const price = new Intl.NumberFormat(['es-MX', 'en-US', 'de-DE', 'en-IN', 'ja-JP', 'es-PE'], {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(number);

  return price;
}

const toggleWishListProducts = (_id) => {

  if (typeof window === 'undefined') return false;

  let wishListProducts = JSON.parse(localStorage.getItem('wishListProducts') || '[]');
  let message = '';
  let existInWishList = false;

  if (wishListProducts.find(wishList => wishList.product_id === _id)) {
    wishListProducts = wishListProducts.filter(product => product.product_id !== _id);
    message = "Producto eliminado de mi lista de deseos ";
    existInWishList = true;
  } else {
    wishListProducts.push({ product_id: _id });
    message = "Producto Agregado a lista de deseos";
    existInWishList = false;
  }

  localStorage.setItem('wishListProducts', JSON.stringify(wishListProducts));

  return { message, existInWishList };
}

const existInWishList = (_id) => {

  if (typeof window === 'undefined') return false;

  const wishList = JSON.parse(localStorage.getItem('wishListProducts' || '[]'));
  if (!wishList) {
    return false;
  }
  return wishList.find(product => product.product_id === _id);

}

const existInShoppingCart = (_id, ShoppingCart) => {
  const existProduct = ShoppingCart?.find(cart => cart?.product_id?._id === _id);

  if (existProduct) return true;
  return false;
}

const prepareProductsToFussion = (cartNoAuth) => {

  if (cartNoAuth?.length === 0) return;

  let products = cartNoAuth?.map(cart => ({
    product_id: cart?.product_id?._id,
    quantity: cart?.quantity,
  }));


  return products;

}

export const notify = (message) => toast(message);

export const successNotify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black', color: 'white' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

export const infoNotify = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black', color: 'white' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}
export const warningNotify = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black', color: 'white' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

export const errorNotify = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black', color: 'white' },
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

const applyCoupon = (subtotal, cuponDiscount) => {

  const discount = (subtotal * Number(cuponDiscount)) / 100;
  const newTotal = subtotal - discount.toFixed(3);

  return newTotal;

}

const getLastRoute = (destination = '') => {

  const reverse = destination.split("").reverse().join("");
  const index = reverse.search('=p');
  const newRoute = reverse.substring(0, index).split("").reverse().join("");

  if (newRoute.includes('auth') || newRoute.length < 1) return '/'

  return newRoute;

}

const getPDFName = (name = '') => {

  const nameReverse = name.split("").reverse().join("");
  const indexName = nameReverse.search('/');
  const newName = nameReverse.substring(0, indexName).split("").reverse().join("");
  return newName;

}

const textToRSSFeed = (str) => {
  return str.split(' ').map(item =>
    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
}

const SweetAlert = (icon = 'success', title = '', html = '') => {
  Swal.fire({
    icon,
    title,
    html,
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
}

const convertObjectToPlainText = (text = '') => {
  return Object.entries(text)
    .map(([key, value]) => key + ': ' + value)
    .join(' ');
}

const copyText = (text = '') => {
  navigator?.clipboard?.writeText(text).then(() => {
    successNotify('Información copiada correctamente');
  }, (error) => {
    errorNotify('No sé pudo copiar la información');
  })
}

const calculateTotalOfCart = (cart = []) => {

  const costs = cart.reduce(
    (prev, curr) => {
      const { product_id } = curr;
      if (product_id?.discount > 0 && product_id?.product_type === '1') {
        const { totalWithDiscountApply } = calculatNewTotalToPay(product_id?.discount, product_id?.price)
        const total = totalWithDiscountApply * curr.quantity;
        prev.productsDiscount = prev.productsDiscount + total;
      } else if (product_id?.discount === 0 && product_id?.product_type === '1') {
        const total = product_id?.price * curr?.quantity;
        prev.productsWithoutDiscount = prev.productsWithoutDiscount + total;
      } else {
        const total = product_id?.price * curr?.quantity;
        prev.productsCanvas = prev.productsCanvas + total;
      }
      return prev;
    },
    { productsDiscount: 0, productsWithoutDiscount: 0, productsCanvas: 0 },
  );

  return costs;

}

const prepareCartDataForLocalStorage = (product) => {
  const { _id, name, description, price, discount, multimedia, product_type, quantity } = product

  const product_id = {
    _id, name, description, price, discount, multimedia, product_type, quantity
  }
  return product_id;
}


export default {
  priceFormat,
  toggleWishListProducts,
  existInWishList,
  existInShoppingCart,
  successNotify,
  infoNotify,
  warningNotify,
  errorNotify,
  calculatNewTotalToPay,
  applyCoupon,
  prepareProductsToFussion,
  getLastRoute,
  getPDFName,
  SweetAlert,
  textToRSSFeed,
  convertObjectToPlainText,
  copyText,
  calculateTotalOfCart,
  prepareCartDataForLocalStorage,
}