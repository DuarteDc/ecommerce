import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { getCoupon, removeCoupon, startFinaliceSaleCheckout } from "../../actions/shoppingCartActions"
import { InfoShippingCosts } from "./infoShippingCosts"
import { SubtotalInfo } from "./subtotalInfo"
import { ShippingAddress } from "./shippingAddress"
import { TotalShoppingCart } from "./totalShoppingCart"
import { toast } from "react-toastify";
import Swal from "sweetalert2"
import jsCookie from "js-cookie"
import { useState, useEffect } from "react"
import CouponDetails from "./CouponDetails"

export const CartTotals = ({ handleOpenFormAddress }) => {
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.auth);
  const { cart, subtotal, total, shipping_costs, shippingAddress, addressSelected, coupon, subtotalWithCoupon } = useSelector((state) => state.cart);
  const router = useRouter();

  const [inputCoupon, setInputCoupon] = useState('')

  const notify = (message) => toast(message);

  const proceedToCheckout = () => {
    if (!logged) {
      router.push(`/auth/login?p=${router.asPath}`);
      return;
    }

    if (!shippingAddress.length) {
      Swal.fire({
        icon: 'error',
        title: 'Ups , hubo un problema',
        text: 'Al parecer no tienes direcciones de envío registradas , agrega una dirección y vuelve a intentarlo',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      router.push('/perfil/direcciones');
      return;
    }

    if (shippingAddress.length > 0 && !Object.keys(addressSelected).length) {
      Swal.fire({
        icon: 'error',
        title: 'Ups , hubo un problema',
        text: 'Selecciona una dirección de envío',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }

    let productsDiscount = cart.filter(product => product.product_id.discount > 0);
    let productsWithoutDiscount = cart.filter(product => product.product_id.discount === 0);

    if (!productsDiscount.length && !productsWithoutDiscount.length) {
      notify('Debes agregar almenos un producto al carrito de compras')
      return;
    }

    const data = {
      "productsDiscount": productsDiscount,
      "productsWithoutDiscount": productsWithoutDiscount,
      "shipment": shipping_costs[0]?.shippingCosts,
      "coupon_id": coupon ? coupon._id : "",
      "shippment_direction": addressSelected
    }
    dispatch(startFinaliceSaleCheckout(data));
  }

  const handleApplyCoupon = async (event) => {
    event.preventDefault();
    const { hasError, message } = await dispatch(getCoupon(subtotal, inputCoupon));
    if (hasError) {
      Swal.fire({
        icon: 'error',
        title: 'Ups , hubo un problema',
        text: message,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      return;
    }
  }

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
  }


  return (
    <div className="mx-[25px] border-[1px] border-solid border-[#888] py-[60px] px-[30px]">
      <h4 className="font-Poppins text-[20px] text-center leading-[1.3] uppercase pb-[30px]">Total Carrito</h4>
      <div className="border-b-[1px] flex justify-start flex-wrap pb-[13px]">
        <SubtotalInfo
          subtotal={subtotal}
        />
      </div>
      <div className="border-b-[1px] border-dashed border-[#d9d9d9] flex flex-wrap flex-start pt-[20px]">
        <InfoShippingCosts />
        <div className="w-full flex justify-center flex-wrap my-[20px]">
          <ShippingAddress handleOpenFormAddress={handleOpenFormAddress} />
        </div>
        <div className="w-full">
          <CouponDetails
            handleApplyCoupon={handleApplyCoupon}
            setInputCoupon={setInputCoupon}
            coupon={coupon}
            handleRemoveCoupon={handleRemoveCoupon}
            subtotalWithCoupon={subtotalWithCoupon}
          />
        </div>
        <div className=" flex flex-wrap items-start pb-[33px] pt-[27px] justify-aound w-full">
          <TotalShoppingCart
            total={total}
          />
        </div>
        <button className="rounded-[25px] bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
          onClick={() => proceedToCheckout()}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}