import Image from "next/image"
import {IconContext} from "react-icons";
import {helpers} from "../../../helpers";
import {GiCancel} from "react-icons/gi";
import { useDispatch } from "react-redux";
import { startOrderCancel } from "../../../actions/ordersActions";
import { Grid } from "@mui/material";

export const OrderProductsList = ({product ,index ,  status , handleCancelOrder}) =>{
    const {product:productList , quantity , subtotal} = product;
    const subtotalProduct =  helpers.priceFormat(subtotal);
    return(
        <div className="flex items-center justify-center flex-wrap">
            <Grid container spacing={3}>
             <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
               <div className="flex flex-wrap md:flex-nowrap justify-start">
                <Image
                 src={productList?.multimedia[0]?.path}
                 width={200}
                 height={200}
                />
                <div className="mt-6  ml-6 font-Poppins">
                  <h3 className="text-base text-[#333] leading-6 capitalice">
                      {productList.name}
                  </h3>
                  <p className="text-sm text-[#888] leading-7 truncate max-w-[400px]">
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
             </Grid>
             <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                 <div className="flex justify-end items-center h-3/4 w-full md:ml-7">
             
                  </div>
             </Grid>
            </Grid>
         </div>
    )
}