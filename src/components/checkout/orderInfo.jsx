import { useSelector } from "react-redux";
import { helpers } from "../../helpers";

export const OrderInfo = () => {
       const { superTotal, withDiscount, withoutDiscount, shipping_costs } = useSelector((state) => state.cart);

       const super_total = helpers.priceFormat(superTotal?.total || 0);
       const with_discount = helpers.priceFormat(withDiscount?.total || 0);
       const without_discount = helpers.priceFormat(withoutDiscount?.total || 0);
       const subtotal = helpers.priceFormat(withDiscount?.total + withoutDiscount?.total || 0);
       const shippingCosts = helpers.priceFormat(shipping_costs[0]?.shippingCosts || 0);

       return (
              <table className="min-w-full leading-normal">
                     <thead>
                            <tr className="">
                                   <th className="bg-[#333] px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-[#fff] uppercase">
                                          Descripción
                                   </th>
                                   <th className="bg-[#333] px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold uppercase text-[#fff]">
                                          Total
                                   </th>
                            </tr>
                     </thead>
                     <tbody>
                            <tr>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333] text-center font-Poppins capitalize">
                                                 Subtotal productos con descuento
                                          </p>
                                   </td>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                          <p className="text-[#333] text-center font-Poppins">
                                                 {with_discount}
                                          </p>
                                   </td>
                            </tr>
                            <tr>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins capitalize">
                                                 Subtotal productos sin descuento
                                          </p>
                                   </td>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins">
                                                 {without_discount}
                                          </p>
                                   </td>
                            </tr>
                            <tr>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins capitalize">
                                                 Gastós de Envio
                                          </p>
                                   </td>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins">
                                                 {shippingCosts}
                                          </p>
                                   </td>
                            </tr>
                            <tr>

                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins capitalize">
                                                 Subtotal del carrito
                                          </p>
                                   </td>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins">
                                                 {subtotal}
                                          </p>
                                   </td>
                            </tr>
                            
                            <tr>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins capitalize">
                                                 Total a pagar
                                          </p>
                                   </td>
                                   <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                          <p className="text-[#333]  text-center font-Poppins">
                                                 {super_total}
                                          </p>
                                   </td>
                            </tr>
                     </tbody>
              </table>
       )
}