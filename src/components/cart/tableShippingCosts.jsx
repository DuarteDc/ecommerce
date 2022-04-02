import { useSelector } from "react-redux"
import { shippingCosts } from "../../staticData/shippingCosts";

export const TableShippingCosts = () =>{
    const { shipping_costs } = useSelector((state)=>state.cart);

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
                     <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                       <strong>
                          {shipping.shippingCosts}
                       </strong> 
                     </td> 
                     <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                     <strong>
                         ${shipping.minSale} - ${shipping.maxSale}
                     </strong>
                     </td> 
                  </tr>
                   ))
                }
                </tbody>
            </table>
    )
}