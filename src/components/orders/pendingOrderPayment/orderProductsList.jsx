import Image from "next/image"
import { helpers } from "../../../helpers";

export const OrderProductsList = ({product}) =>{
    const { product:productList , quantity , subtotal} = product;
    const subtotalProduct =  helpers.priceFormat(subtotal);
    return(
        <>
        <div className="w-3/4 px-5 py-5 flex">
                <Image
                 src={'/assets/images/decoracion3.png'}
                 width={150}
                 height={150}
                />
                <div className="ml-6 font-Poppins">
                  <h3 className="text-base text-[#333] leading-6 capitalice">
                      {productList.name}
                  </h3>
                  <p className="text-sm text-[#888] leading-9">
                     {productList.description}
                  </p>
                  <p className="text-sm leading-6">
                      Cantidad: {quantity} pzs
                  </p>
                  <p className="text-sm leading-6">
                      Subtotal: {subtotalProduct}    
                  </p>
                </div>
              </div>
              <div className="w-1/4">
     
              </div>
              </>
    )
}