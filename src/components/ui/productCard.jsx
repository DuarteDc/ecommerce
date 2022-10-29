
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";


import { addOneProduct, removeOneProduct } from "../../actions/wishListActions";
import { helpers } from "../../helpers";
import SliderProductCard from "../products/SliderProductCard";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { notify } from "../../helpers/helpers";

import { useCart } from "../../hooks/useCart";
import { ButtonGroup } from "./buttonGroup";
import { useEffect, useState, useLayoutEffect } from "react";

export const ProductCard = ({ product }) => {

  const { logged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const { _id, name, price, url, quantity, discount } = product;

  // const currentQuantity = cart.find(product => product.product_id._id === _id);
  // const [aaa, setAaa] = useState(currentQuantity?.quantity);

  // useEffect(() => {

  //   const currentQuantity = cart.find(product => product.product_id._id === _id);
  //   setAaa(currentQuantity?.quantity)
  // }, [])


  const { addProduct, productInCart, updateProductQuantity, handleChangeProductQuantity, quantity: inputQuantity } = useCart(logged, 1, product, cart, undefined, true);

  const history = useRouter();
  const dispatch = useDispatch();

  const [isInWhisList, setisInWhisList] = useState(helpers.existInWishList(_id));

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
              {/* {
                productInCart ? (
                  // <ButtonGroup
                  //   quantity={inputQuantity}
                  //   increaseDecreaseQuantityProduct={updateProductQuantity}
                  //   handleChangeQuantity={handleChangeProductQuantity}
                  //   product={product}
                  // />
                  <span className=" bg-[#fff]">
                    Agregado
                  </span>
                ) : (
                  <button
                    onClick={addProduct}
                    className="
                
                   bg-[#fff]
                                        py-[10px] 
                                        px-[20px] 
                                        cursor-pointer 
                                        text-[#333] 
                                        border-[#333] 
                                        border-[1px] 
                                        border-solid 
                                         
                                        leading-normal 
                                        rounded-lg 
                                        font-normal 
                                        uppercase 
                                        text-xs
                                        md:text-sm"
                  >
                    <span
                      className="flex items-center font-Poppins"
                    >
                      Agregar
                      <AddShoppingCartIcon className="ml-3 text-base" />
                    </span>
                  </button>
                )
              } */}
              {
                product.quantity > 0 && (
                  <button
                    onClick={addProduct}
                    className={`${productInCart
                      ? "bg-[#333] text-[#fff]"
                      : "bg-[#fff] "
                      }
                                          py-[10px] 
                                          px-[20px] 
                                          cursor-pointer 
                                          text-[#333] 
                                          border-[#333] 
                                          border-[1px] 
                                          border-solid 
                                           
                                          leading-normal 
                                          rounded-lg 
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
                      "Agregado"
                    )}
                  </button>
                )
              }
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
    </div >
  );
};
