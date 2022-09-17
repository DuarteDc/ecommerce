import { useSelector } from "react-redux";
import { helpers } from "../../helpers";

export const InfoShippingCosts = () => {
    const { shippingCosts } = useSelector((state) => state.cart);
    const shippingTotal = helpers.priceFormat(shippingCosts);
    return (
        <>
            <div className="w-[35%]">
                <span className="font-Poppins text-[15px] leading-[1.4] text-[#333]">
                    Gastos de Envío:
                </span>
            </div>
            <div className="w-[65%] pr-[18px] flex justify-end">
                <p className="font-Poppins text-[13px] text-lg leading-[1.6] text-[#333]">
                    {shippingTotal}
                </p>
            </div>
        </>
    )
}