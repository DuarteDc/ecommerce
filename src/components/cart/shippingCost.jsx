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
    <div className="w-[35%]">
          <span className="font-Poppins text-[15px] leading-[1.4] text-[#333]">Gastos de Envío:</span>
      </div>
      <div className="w-[65%] pr-[18px]">
         <p className="font-Poppins text-[13px] text-lg leading-[1.6] text-[#888]">
            {shippingTotal}
         </p>
      </div>
      </>
  )
}
