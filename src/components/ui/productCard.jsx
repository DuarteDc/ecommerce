import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import {BiShowAlt} from "react-icons/bi";
import {BsHeart} from "react-icons/bs";
import {FcLike} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import Cookie from 'js-cookie';


import {toast } from "react-toastify";
import { addShoppingCart } from "../../actions/shoppingCartActions";
import {helpers } from "../../helpers"

export const ProductCard = ({product}) =>{
    const { _id , name , price , url , quantity  } = product; 

    const history =  useRouter();
    const dispatch = useDispatch();
    const [ isEnable , setIsEnable ] = useState(false);
  
    const { cart} = useSelector((state)=>state.cart)


    const [isInWhisList, setisInWhisList] = useState( helpers.existInWishList(_id));
    const notify = (message) =>toast(message)
    const sale_price = helpers.priceFormat(price);

    const handleShowProduct = () =>{
      history.push(`/productos/${url}`)
    }

    const handleToogleWishList = (_id) =>{
      const message =  helpers.toggleWishListProducts(_id);
      setisInWhisList(!isInWhisList);
      notify(message);
    }

    const addProductCard = (product) =>{
        const exists =  helpers.existInShoppingCart(product._id , cart);

        if(exists){
          notify('El producto ya ha sido agregado al carrito de compras');
          return;
        }

        const itemCart = { name:product.name,
                           price:product.price,
                           image:product.multimedia[0].path,
                           product_id:product._id,
                           stock:product.quantity,
                           quantity:1,
                           discount:product.discount
                          }

        const shoppingCart = [...cart , itemCart  ]

        dispatch(addShoppingCart(shoppingCart));

        Cookie.set('shoppingCart' , JSON.stringify(shoppingCart));
        notify('Producto agregado al carrito de compras');

    }

    useEffect(() => {
      const exists = helpers.existInShoppingCart(product._id , cart);
      setIsEnable(exists);
    }, [cart]);

    return(
        <div className="mb-[30px] relative card">
            <div className="relative overflow-hidden">
            <Image
              src='/assets/images/product-03.jpg'
              alt={'name'}
              width={250}
              height={300}
              layout="responsive"
              className="flex items-center"
            />

            {
              quantity === 0 &&
               <div className="text-center 
                               absolute 
                               top-[10px] 
                               left-[10px] 
                               bg-[#333] 
                               text-[#fff] 
                               w-[21%] 
                               h-[10%] 
                               leading-[50px] 
                               rounded-[50%] 
                               z-[3]">
                Agotado
               </div>
            }
           
            <div className="mt-[20px]">
                <h3 className="text-[#333] mb-0 font-semibold text-[18px]">
                  {name}
                </h3>
                <div className="mt-[8px] mb-[12px]">
                  <span className="text-[#858585] 
                                     text-[15px] 
                                     line-through 
                                     inline-block 
                                     mr-1"
                  >
                    $230
                  </span>
                  <span className="text-[17px] inline-block">
                    {sale_price}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="btn-area">
                    <button className={`${isEnable ? 
                                        'bg-[#333] text-[#fff]'
                                         : 
                                        'bg-[#fff] border-transparent'}
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
                                        text-sm`}
                    onClick={()=>addProductCard(product)}
                    >
                      {
                        !isEnable ?
                             'Agregar al carrito'
                             :
                             'Ya agregado al carrito'

                      }
                     
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="w-[35px] 
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
                    onClick={()=>handleShowProduct()}
                    >
                    <IconContext.Provider 
                      value={{className:"text-[25px] text-[#888] w-[90%] z-[2]  hover:text-[#fff] hover:transition"}}
                    >
                        <BiShowAlt/>
                    </IconContext.Provider>
                    </span>

                    <span className="w-[35px] 
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
                    onClick={()=>handleToogleWishList(_id)}
                    >
                      {
                        isInWhisList ? 
                         <IconContext.Provider 
                           value={{className:"text-[25px] w-[60%] z-[2] hover:text-[#fff] hover:transition cursor-pointer" }}
                          >
                           <FcLike/>
                         </IconContext.Provider>
                         : 
                          <IconContext.Provider 
                           value={{className:"text-[25px] text-[#888] w-[60%] z-[2] hover:text-[#fff] hover:transition cursor-pointer" }}
                          >
                           <BsHeart/>
                         </IconContext.Provider>

                      }
                    
                    </span>
                  </div>
                </div>
            </div>
            </div>
        </div>
    )
}