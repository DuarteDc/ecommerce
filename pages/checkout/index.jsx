import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { loadTotalsFromCookies } from "../../src/actions/shoppingCartActions";
import Cookie from 'js-cookie';
import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";
import { OrderInfo } from "../../src/components/checkout/orderInfo";
import { CheckoutForm } from "../../src/components/checkout/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToggle } from "../../src/hooks/useToggle";
import { Modal } from "../../src/components/ui/modal";
import { FaCcStripe } from "react-icons/fa";
import { BiTransferAlt } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import { IconContext } from "react-icons";
import { startLoadBanksAccounts, startLoadClientSecret } from "../../src/actions/checkoutActions";
import { CheckoutTransfer } from "../../src/components/checkout/checkoutTransfer";
import { ShoppingCartDetails } from "../../src/components/checkout/shoppingCartDetails";
import { useRouter } from "next/router";
import LoadingScreen from "../../src/components/LoadingScreen";

const stripePromise = loadStripe("pk_test_51JQDmVCJKrEV4P25HqhKqz4fnKIZVF7d853icQ84CYZrCFxUorhPwAdjwyKhnP124hlGSaYfOEjZo7LibrwT6Azo002XEZChlH");

const Checkout = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const { superTotal } = useSelector((state) => state.cart);
  const { client_secret, bankAccountSelected, success } = useSelector((state) => state.checkout);
  const [isTransfer, setIsTransfer] = useState(false);
  const [open, toggle] = useToggle();
  const [openTransfer, toggleTransfer] = useToggle();
  const [loadingForm, setLoadingForm] = useState(false);

  const handleOpenTransfer = () => {
    toggleTransfer();
  }

  useEffect(() => {
    setLoadingForm(true);
    handleClickPaymentStripe();
  }, [])

  useEffect(() => {
    if (bankAccountSelected) {
      setIsTransfer(true);
    } else {
      setIsTransfer(false);
    }
  }, [bankAccountSelected]);

  useEffect(() => {
    if (success) {
      router.push('/?successTransfer=true');
      Cookie.remove('superTotal');
      Cookie.remove('withDiscount');
      Cookie.remove('withoutDiscount');
      Cookie.remove('shippingCosts');
      Cookie.remove('order_id');
      localStorage.removeItem('cart')
    }
  }, [success]);



  useEffect(() => {
    if (!Object.keys(superTotal).length) {
      const superTotal = Cookie.get('superTotal') ? JSON.parse(Cookie.get('superTotal')) : {};
      const withDiscount = Cookie.get('withDiscount') ? JSON.parse(Cookie.get('withDiscount')) : {};
      const withoutDiscount = Cookie.get('withoutDiscount') ? JSON.parse(Cookie.get('withoutDiscount')) : {};
      const shippingCosts = Cookie.get('shippingCosts') ? JSON.parse(Cookie.get('shippingCosts')) : {};
      const order_id = Cookie.get('order_id') ? JSON.parse(Cookie.get('order_id')) : ''

      dispatch(loadTotalsFromCookies(superTotal,
        withDiscount,
        withoutDiscount,
        shippingCosts,
        order_id
      ));

    }
  }, []);

  const appearance = {
    labels: 'floating',
    theme: 'flat',
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '3px',
      colorBackground: '#F6F8FA',
      colorPrimaryText: '#262626'
    },
    rules: {
      '.Block': {
        backgroundColor: 'var(--colorBackground)',
        boxShadow: 'none',
        padding: '12px'
      },
      '.Input:focus': {
        padding: '12px',
        border: '1px solid #e91e63',
        boxShadow: '-4px 1px 31px -14px rgba(233,30,99,0.59)'
      },
      '.Input:disabled, .Input--invalid:disabled': {
        color: '#a31545'
      },
      '.Tab': {
        padding: '10px 12px 8px 12px',
        border: 'none'
      },
      '.Tab:hover': {
        border: 'none',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Tab--selected, .Tab--selected:focus, .Tab--selected:hover': {
        border: 'none',
        backgroundColor: '#fff',
        boxShadow: '0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)'
      },
      '.Label': {
        fontWeight: '500'
      }
    }
  };

  const options = {
    clientSecret: client_secret,
    appearance
  }

  const handleClickPaymentStripe = async () => {

    const token = await Cookie.get('token') || '';

    await dispatch(startLoadClientSecret(token));

  }

  return (
    <Layout>
      {
        loadingForm && (<LoadingScreen />)
      }
      <BannerImage
        title="Realizar Pago"
        imageBackground="bg-about-us"
      />
      <section className="max-w-[1480px] mx-auto my-20 px-[15px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12  md:my-10 gap-6">
          <div className="col-span-7">
            <ShoppingCartDetails />
          </div>
          <div className=" col-span-12 lg:col-span-5 xl:col-span-5">
            <h3 className="font-Poppins text-[20px] font-semibold leading-[1.4] text-[#333] mb-10 text-center">
              Detalle de la órden
            </h3>
            <div className="w-full mb-[20px] block">
              <OrderInfo />
            </div>
            {
              isTransfer ?
                <div>
                  <button className="bg-[#008cdd] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#1e90ff] mt-5 flex items-center justify-center"
                    onClick={() => handleOpenProofOfPayment()}
                  >
                    <IconContext.Provider value={{ className: "color-[#fff] , text-[40px] , mr-[30px]" }}>
                      <MdOutlineFileUpload />
                    </IconContext.Provider>
                    <span>Comprobante de pago</span>
                  </button>
                </div>

                :
                <div>
                  <div>
                    {client_secret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm
                          loadingForm={loadingForm}
                          setLoadingForm={setLoadingForm}
                        />
                      </Elements>
                    )}
                  </div>
                  <button className="bg-[#fb8c00] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#e65100] mt-5 flex items-center justify-center"
                    onClick={() => handleOpenTransfer()}
                  >
                    <IconContext.Provider value={{ className: "color-[#fff] , text-[40px] , mr-[30px]" }}>

                      <BiTransferAlt />
                    </IconContext.Provider>
                    <span>Pago por transferencia</span>
                  </button>
                </div>
            }

            {/* modal pago por transferencia */}
            <Modal
              title="Pago Por Transferencia"
              open={openTransfer}
              handleOpenCheckout={handleOpenTransfer}
              actions={false}
              fullWidth={true}
              maxWidth={'xs'}
            >
              <CheckoutTransfer
                handleOpenTransfer={handleOpenTransfer}
              />

            </Modal>
          </div>
        </div>
      </section>
    </Layout >
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadBanksAccounts());
});

export default Checkout
