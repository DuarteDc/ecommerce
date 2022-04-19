import { helpers } from "../../helpers"

export const TotalShoppingCart = ({total = 0}) =>{
    const total_price = helpers.priceFormat(total)
    return (
        <>
        <div className="w-[35%]">
                <span className="font-Poppins text-[18px] leading-[1.3] text-[#333]">Total:</span>
            </div>
            <div className="w-[65%] flex justify-end">
                <span className="font-Poppins text-[18px] leading-[1.2]">{total_price}</span>
            </div>
        </>
    )
}