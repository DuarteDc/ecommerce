import React from 'react'
import { useSelector } from 'react-redux';
import { helpers } from '../../helpers'

export const ShippingCost = ({shipping}) => {
  const { shipping_costs } = useSelector((state)=>state.cart);
  const shippingTotal =  helpers.priceFormat(shipping.shippingCosts)
  const shippingMin =  helpers.priceFormat(shipping.minSale)
  const shippingMax =  helpers.priceFormat(shipping.maxSale)
  return (
    <>
      <td className={`px-3 
                      py-3 
                      border-b 
                      border-gray-200 
                      bg-white 
                      text-sm 
                      text-center 
                      ${shipping_costs[0]?.shippingCosts === shipping.shippingCosts ? 
                      'text-[#333]' 
                      : 
                      'text-[#888]'
                       }`}
    >
                       <strong>
                          {shippingTotal}
                       </strong> 
                     </td> 
                     <td className={`px-3 py-3 border-b border-gray-200 bg-white text-sm text-center ${shipping_costs[0]?.shippingCosts === shipping.shippingCosts ? 'text-[#333]' : 'text-[#888]' }`}>
                     <strong>
                        {shippingMin} 
                         {' '}
                           - 
                         {' '}
                        {shipping.maxSale === 99999999999 ?
                          'Más'  
                          :
                           shippingMax
                        }
                     </strong>
                     </td> 
    </>
  )
}
