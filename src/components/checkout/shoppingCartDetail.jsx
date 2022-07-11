import Image from "next/image"
import helpers from "../../helpers/helpers"

export const ShoppingCartDetail = ({ shopping }) => {

  const { totalWithDiscountApply, discountApply } = helpers.calculatNewTotalToPay(shopping.product_id.discount, shopping.product_id.price);
  const subtotal = helpers.priceFormat(Number(totalWithDiscountApply * shopping.quantity));
  const discount = helpers.priceFormat(Number(shopping.product_id.price))

  return (
    <div className="flex py-[30px] font-Poppins" key={shopping._id}>
      <div className="mr-[20px]">
        <img
          src={shopping?.product_id?.multimedia[0]?.path}
          alt={shopping?.product_id.name}
          className="min-w-[7rem] min-h-[7rem] h-[7rem] w-[7rem]"
        />
      </div>
      <div className="flex justify-between w-full">
        <div className="">
          <h4 className="font-Poppins font-normal leading-10 text-base text-[#333] capitalize">{shopping?.product_id?.name}</h4>
          <span className="font-Poppins leading-10 text-sm font-normal text-[#333]">
            Descuento: {shopping?.product_id?.discount}%
          </span>
          <p className="font-Poppins font-normal leading-10 text-sm text-[#333]">Cantidad: {shopping.quantity} piezas</p>
        </div>

        <div className="h-full block">
          {
            discountApply > 0 &&
            <p>
              Subtotal:{'  '}
              <span className="text-[#858585] text-[15px] line-through inline-block  mr-1">{discount}</span>
            </p>

          }
          <p>
            Total:{'  '}
            <span className="leading-10 text-[#333]"> {subtotal} </span>
          </p>
        </div>
      </div>
    </div>
  )
}