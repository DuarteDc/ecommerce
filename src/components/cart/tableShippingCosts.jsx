import { useSelector } from "react-redux"
import { shippingCosts } from "../../staticData/shippingCosts";
import { ShippingCost } from "./shippingCost";

export const TableShippingCosts = () =>{
    return(
        <table className="w-full leading-normal">
             <thead>
              <tr>
              <th className="text-[#333]">Precios de envío</th>
              <th className="text-[#333]">Total venta</th>
              </tr>
             </thead>
             <tbody className="text-[#888]">
                {
                   shippingCosts.map(shipping=>(
                     <tr key={shipping.id}>
                     <ShippingCost
                       shipping={shipping}
                     />
                     </tr>
                   ))
                }
                </tbody>
            </table>
    )
}