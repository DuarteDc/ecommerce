
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addProductToCartClientsNotLogged, startAddProductShoppingCart } from "../../actions/shoppingCartActions";
import { addOneProduct, removeOneProduct } from "../../actions/wishListActions";
import { helpers } from "../../helpers";
import Cookies from "js-cookie";
import SliderProductCard from "../products/SliderProductCard";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { useCart } from "../../hooks/useCart";

export const ProductCard = ({ product }) => {

  const { logged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const { _id, name, price, url, quantity, discount } = product;

  const { addProduct, productInCart } = useCart(logged, 1, product, cart);

  const history = useRouter();
  const dispatch = useDispatch();

  const [isInWhisList, setisInWhisList] = useState(helpers.existInWishList(_id));
  // const [isEnable, setIsEnable] = useState(helpers.existInShoppingCart(_id, cart));

  const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(
    product.discount,
    product.price
  );
  const sale_price = helpers.priceFormat(price);
  const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);

  const handleShowProduct = () => {
    history.push(`/productos/${url}`);
  };

  const handleToogleWishList = (_id) => {
    const { message, existInWishList } = helpers.toggleWishListProducts(_id);
    setisInWhisList(!isInWhisList);
    notify(message);
    if (existInWishList) {
      dispatch(removeOneProduct(_id));
    } else {
      dispatch(addOneProduct(_id));
    }
  };

  const addProductCard = (product) => {
    const exists = false;
    if (logged) {
      exists = helpers.existInShoppingCart(product._id, cart);
      if (exists) {
        notify("El producto ya ha sido agregado al carrito de compras");
        return;
      }
    } else {
      exists = helpers.existInShoppingCart(product._id, cartNotLogged);
      if (exists) {
        notify("El producto ya ha sido agregado al carrito de compras");
        return;
      }
    }

    const itemCart = {
      product_id: {
        price: product.price,
        quantity: product.quantity,
        multimedia: product.multimedia,
        _id: product._id,
        name: product.name,
        discount: product.discount,
        product_type: product.product_type,
      },
      quantity: 1,
      _id: product._id,
    };

    if (logged) {
      const token = Cookies.get("token") || "";
      dispatch(startAddProductShoppingCart(itemCart, product.name, token));
      return;
    } else {
      let shoppingCart = [...cartNotLogged, itemCart];
      dispatch(addProductToCartClientsNotLogged(shoppingCart));
      localStorage.setItem("cartNotlogged", JSON.stringify(shoppingCart));
      Swal.fire({
        icon: "success",
        title: "¡¡Buen Trabajo!!",
        html: `<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }
  };

  return (
    <div className="mb-[30px] relative card px-1 animate__animated animate__zoomIn">
      <div className="relative overflow-hidden">
        <SliderProductCard
          images={product.multimedia}
          handleShowProduct={handleShowProduct}
        />
        {quantity === 0 && (
          <div
            className="text-center 
                               absolute 
                               top-[10px] 
                               left-[10px] 
                               bg-[#333] 
                               text-[#fff] 
                               w-[21%] 
                               h-[10%] 
                               leading-[50px] 
                               rounded-[50%] 
                               z-[3]"
          >
            Agotado
          </div>
        )}
        {discount > 0 && (
          <div
            className="text-center 
                               absolute 
                               top-[10px] 
                               left-[10px] 
                               bg-[#f57c00] 
                               text-[#fff] 
                               w-[15%] 
                               h-[10%] 
                               leading-[50px] 
                               rounded-[50%] 
                               z-[3]"
          >
            -{discount}%
          </div>
        )}

        <div className="">
          <h3 className="text-[#333] mb-0 font-semibold text-[18px] capitalize truncate">
            {name}
          </h3>
          <div className="mt-[8px] mb-[12px]">
            <span
              className="text-[#858585] 
                                     text-[15px] 
                                     line-through 
                                     inline-block 
                                     mr-1"
            >
              {product.discount > 0 && sale_price}
            </span>
            <span className="text-[17px] inline-block">
              {sale_price_discount}
            </span>
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="btn-area">
              <button
                onClick={addProduct}
                className={`${productInCart
                  ? "bg-[#333] text-[#fff]"
                  : "bg-[#fff] border-transparent"
                  }
                                        py-[10px] 
                                        px-[20px] 
                                        cursor-pointer 
                                        text-[#333] 
                                        border-[#333] 
                                        border-[1px] 
                                        border-solid 
                                        border-transparent 
                                        leading-normal 
                                        rounded-none 
                                        font-normal 
                                        uppercase 
                                        text-xs
                                        md:text-sm`}
              >
                {!productInCart ? (
                  <span
                    className="flex items-center font-Poppins"
                  >
                    Agregar
                    <AddShoppingCartIcon className="ml-3 text-base" />
                  </span>
                ) : (
                  "Ya agregado al carrito"
                )}
              </button>
            </div>
            <div className="flex justify-between">
              <span
                className="w-[35px] 
                                     h-[35px] 
                                     leading-[38px] 
                                     text-center  
                                     text-[#333] 
                                     rounded-[50%] 
                                     shadow-md 
                                     flex 
                                     justify-center 
                                     items-center mr-4 
                                     hover:bg-[#333] 
                                     cursor-pointer 
                                     hover:transition"
                onClick={() => handleShowProduct()}
              >
                <VisibilityIcon
                  className="text-[25px] text-[#888] w-[90%] z-[2]  hover:text-[#fff] hover:transition"
                />
              </span>

              <span
                className="w-[35px] 
                                     h-[35px] 
                                     leading-[38px] 
                                     text-center  
                                     text-[#333] 
                                     rounded-[50%] 
                                     shadow-md 
                                     flex justify-center 
                                     items-center  
                                     hover:bg-[#333] 
                                     hover:transition"
                onClick={() => handleToogleWishList(_id)}
              >
                {isInWhisList ? (
                  <FavoriteIcon className="text-[25px] text-red-600 w-[60%] z-[2] hover:text-red-600 hover:transition cursor-pointer" />
                ) : (
                  <FavoriteBorderIcon className="text-[25px] text-[#888] w-[60%] z-[2] hover:text-[#fff] hover:transition cursor-pointer" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
