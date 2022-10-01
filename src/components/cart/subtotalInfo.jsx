import { helpers } from "../../helpers"

export const SubtotalInfo = ({subtotal = 0}) =>{
   const subtotal_price = helpers.priceFormat(subtotal)
    return (
        <>
        <div className="w-[34.5%]">
                <span className="font-Poppins text-xs leading-[1.4] text-[#333]">
                    Subtotal:
                </span>
            </div>
            <div className="w-[65%] pr-[18px] flex justify-end">
                <span className="font-Poppins text-sm leading-[1.2] text-[#333]">
                 {subtotal_price}
                </span>
            </div>
        </>
    )
}