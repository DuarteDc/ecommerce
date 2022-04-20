import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import {BiShowAlt} from "react-icons/bi";
import {BsHeart} from "react-icons/bs";
import {FcLike} from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";

import {toast } from "react-toastify";
import Swal from "sweetalert2";
import {addProductToCartClientsNotLogged, startAddProductShoppingCart } from "../../actions/shoppingCartActions";
import {helpers } from "../../helpers";
import {BsFillCartCheckFill} from "react-icons/bs";

export const ProductCard = ({product}) =>{
    const { _id , name , price , url , quantity , discount } = product; 

    const history =  useRouter();
    const dispatch = useDispatch();
    const { cart , cartNotLogged} = useSelector((state)=>state.cart);
    const { logged } = useSelector((state)=>state.auth);
    const [ isEnable , setIsEnable ] = useState(false);  



    const [isInWhisList, setisInWhisList] = useState( helpers.existInWishList(_id));
    const notify = (message) =>toast(message);
    const {totalWithDiscountApply} = helpers.calculatNewTotalToPay(product.discount ,product.price);
    const sale_price = helpers.priceFormat(price);
    const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);
    

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

        const itemCart = {product_id:{
                            price:product.price,
                            quantity:product.quantity,
                            multimedia:product.multimedia,
                            _id:product._id,
                            name:product.name,
                            discount:product.discount
                          },
                          quantity:1,
                          _id:product._id
                         }

        if(logged){
          let shoppingCart = [...cart  , itemCart ];
          localStorage.setItem('cart' , JSON.stringify(shoppingCart));
          dispatch(startAddProductShoppingCart(itemCart , product.name));
          return;
        }else{
          let shoppingCart = [...cartNotLogged  , itemCart ];
          dispatch( addProductToCartClientsNotLogged(shoppingCart));
          localStorage.setItem('cartNotlogged' , JSON.stringify(shoppingCart));
          Swal.fire({
            icon:"success",
            title:"¡¡Buen Trabajo!!",
            html:`<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
            timer:2000,
            timerProgressBar:true,
            showConfirmButton:false
         })
          return;
        }

    }

    useEffect(() => {
      if(logged){
        const exists = helpers.existInShoppingCart(product._id , cart);
         setIsEnable(exists);
      }else{
        const exists = helpers.existInShoppingCart(product._id , cartNotLogged);
         setIsEnable(exists);
      }
     
    }, [cart , cartNotLogged ]);



    return(
        <div className="mb-[30px] relative card px-2">
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
            {
              discount > 0 &&
               <div className="text-center 
                               absolute 
                               top-[10px] 
                               left-[10px] 
                               bg-[#f57c00] 
                               text-[#fff] 
                               w-[15%] 
                               h-[10%] 
                               leading-[50px] 
                               rounded-[50%] 
                               z-[3]">
                -{discount}%
               </div>
            }
           
            <div className="mt-[20px]">
                <h3 className="text-[#333] mb-0 font-semibold text-[18px] capitalize truncate	">
                  {name}
                </h3>
                <div className="mt-[8px] mb-[12px]">
                  <span className="text-[#858585] 
                                     text-[15px] 
                                     line-through 
                                     inline-block 
                                     mr-1"
                  >
                    {
                      product.discount > 0 && sale_price
                    }
                    
                  </span>
                  <span className="text-[17px] inline-block">
                    {sale_price_discount}
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
                             <span className="flex items-center font-Poppins">
                               Agregar
                               <IconContext.Provider value={{className:"ml-3 text-base"}}>
                                  <BsFillCartCheckFill/>
                               </IconContext.Provider>

                             </span>
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