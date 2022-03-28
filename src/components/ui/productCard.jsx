import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import { IconContext } from "react-icons";
import {BiShowAlt} from "react-icons/bi";
import {BsHeart} from "react-icons/bs";
import {FcLike} from "react-icons/fc";


import { ToastContainer , toast } from "react-toastify";
import {helpers } from "../../helpers"

export const ProductCard = ({product}) =>{
    const { _id , name , price , url  } = product; 
    const history =  useRouter();
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
            <div className="mt-[20px]">
                <h3 className="text-[#333] mb-0 font-semibold text-[18px]">
                  {name}
                </h3>
                <div className="mt-[8px] mb-[12px]">
                  <span className="text-[#858585] text-[15px] line-through inline-block mr-1">
                    $230
                  </span>
                  <span className="text-[17px] inline-block">
                    {sale_price}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <div className="btn-area">
                    <button className="py-[10px] px-[20px] bg-transparent cursor-pointer text-[#333] border-[#333] border-[1px] border-solid border-transparent leading-normal rounded-none font-normal uppercase text-sm ">
                      Agregar al carrito
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <span className="w-[35px] h-[35px] leading-[38px] text-center  text-[#333] rounded-[50%] shadow-md flex justify-center items-center mr-4 hover:bg-[#333] cursor-pointer hover:transition"
                    onClick={()=>handleShowProduct()}
                    >
                    <IconContext.Provider 
                      value={{className:"text-[25px] text-[#888] w-[90%] z-[2]  hover:text-[#fff] hover:transition"}}
                    >
                        <BiShowAlt/>
                    </IconContext.Provider>
                    </span>

                    <span className={`w-[35px] h-[35px] leading-[38px] text-center  text-[#333] rounded-[50%] shadow-md flex justify-center items-center  hover:bg-[#333] hover:transition`}
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
            <ToastContainer />
        </div>
    )
}