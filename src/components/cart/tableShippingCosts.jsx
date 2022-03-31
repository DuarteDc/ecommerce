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
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                              <strong>
                                  $150.00
                              </strong> 
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                                $0 - $15,000
                            </strong>
                            </td> 
                         </tr>
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                               $300.00
                               </strong>
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                                $15,001 - $30,000
                                </strong>
                            </td> 
                         </tr>
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                               $450.00
                            </strong>
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                <strong>

                                $30,001 - $45,000
                                </strong>
                            </td> 
                         </tr>
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                               $600.00
                            </strong>
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                <strong>
                                 $45,0001 - $60,000
                                </strong>
                            </td> 
                         </tr>
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                                <strong>
                                $750.00
                                </strong>
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                                $60,001 - $75,000
                            </strong>
                            </td> 
                         </tr>
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                               $900.00
                            </strong>
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                                $75,001 - $90,000
                            </strong>
                            </td> 
                         </tr>
                         <tr>
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                               $1050.00
                            </strong>
                            </td> 
                            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
                            <strong>
                                $90,001 - $105,000
                            </strong>
                            </td>
                            </tr> 
                            <tr>
                            <td className="px-3 py-2 text-sm bg-white">
                            <strong>
                               $1,200.00
                            </strong>
                            </td> 
                            <td className="px-3 py-3 text-sm bg-white text-center">
                            <strong>
                                $105,000 - Más
                            </strong>
                            </td> 
                         </tr>
                     </tbody>
                 </table>
    )
}