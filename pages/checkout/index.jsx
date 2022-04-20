import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { loadTotalsFromCookies } from "../../src/actions/shoppingCartActions";
import Cookie from 'js-cookie';
import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";
import { BillingForm } from "../../src/components/checkout/billingForm";
import { OrderInfo } from "../../src/components/checkout/orderInfo";
import { CheckoutForm } from "../../src/components/checkout/checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useToggle } from "../../src/hooks/useToggle";
import { Modal } from "../../src/components/ui/modal";
import {FaCcStripe} from "react-icons/fa";
import {BiTransferAlt} from "react-icons/bi";
import {MdOutlineFileUpload} from "react-icons/md";
import { IconContext } from "react-icons";
import { addClientSecretFromCookies, loadBankAccountSelected, startLoadBanksAccounts, startLoadClientSecret } from "../../src/actions/checkoutActions";
import { CheckoutTransfer } from "../../src/components/checkout/checkoutTransfer";
import { UploadProofOfPayment } from "../../src/components/checkout/uploadProofOfPayment";
import { ShoppingCartDetails } from "../../src/components/checkout/shoppingCartDetails";
import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";

const Checkout = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { superTotal } = useSelector((state)=>state.cart);
    const { client_secret , bankAccountSelected , success } = useSelector((state)=>state.checkout);
    const [ clientSecretStripe , setClientSecret ] = useState('');
    const [ isTransfer , setIsTransfer ] = useState(false);
    const [ open , toggle ] = useToggle();
    const [ openTransfer , toggleTransfer] = useToggle();
    const [ openProofOfPayment , toggleProofOfPayment] = useToggle();

    const handleOpenCheckout = () =>{
      toggle();
    }

    const handleOpenTransfer = () =>{
      toggleTransfer();
    }

    const handleOpenProofOfPayment = () =>{
      toggleProofOfPayment();
    }

    const stripePromise = loadStripe("pk_test_51JQDmVCJKrEV4P25HqhKqz4fnKIZVF7d853icQ84CYZrCFxUorhPwAdjwyKhnP124hlGSaYfOEjZo7LibrwT6Azo002XEZChlH");

    useEffect(() => {
      if(bankAccountSelected){
        setIsTransfer(true);
      }else{
        setIsTransfer(false);
      }
    }, [bankAccountSelected]);

    useEffect(() => {
      const client_secret = Cookie.get('client_secret') ? JSON.parse(Cookie.get('client_secret')) : '';
      dispatch(addClientSecretFromCookies(client_secret));
    }, []);

    useEffect(() => {
      if(Object.keys(client_secret).length > 0){
       setClientSecret(client_secret);
      }
    }, [client_secret]);

    useEffect(() => {
      if(localStorage.getItem('bankAccountSelected')){
        const bankAccountSelected = JSON.parse(localStorage.getItem('bankAccountSelected'));
        dispatch(loadBankAccountSelected(bankAccountSelected))
      }
    }, []);

    useEffect(() => {
      if(success){
        router.push('/');
        Cookie.remove('superTotal'); 
        Cookie.remove('withDiscount');
        Cookie.remove('withoutDiscount');
        Cookie.remove('shippingCosts');
        Cookie.remove('order_id');
        localStorage.removeItem('cart')
      }
    }, [success]);



    useEffect(() => {
        if(!Object.keys(superTotal).length){
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
      theme:"stripe"
    }

    const options = {
        clientSecret:clientSecretStripe,
        appearance
    }

    const handleClickPaymentStripe = () =>{

      if(!Object.keys(client_secret).length){
        const token = Cookie.get('token') ? JSON.parse(Cookie.get('token')): '';
        dispatch(startLoadClientSecret(token));
      }
      toggle();
    }

    return (
        <Layout>
                <BannerImage
                    title="Realizar Pago"
                    imageBackground="bg-about-us"
               />
               <section className="max-w-[1480px] mx-auto my-20 px-[15px] w-full">
                   <div className="grid grid-cols-1 lg:grid-cols-12  md:my-10 gap-6">
                   <div className="col-span-7">
                     <ShoppingCartDetails/>
                   </div>
                   <div className=" col-span-12 lg:col-span-5 xl:col-span-5">
                     <h3 className="font-Poppins text-[20px] font-semibold leading-[1.4] text-[#333] mb-10 text-center">
                         Detalle de la ordén
                     </h3>
                     <div className="w-full mb-[20px] block">
                       <OrderInfo/>
                     </div>
                     {
                       isTransfer ?
                       <div>
                          <button className="bg-[#008cdd] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#1e90ff] mt-5 flex items-center justify-center"
                          onClick={()=>handleOpenProofOfPayment()}
                        >
                          <IconContext.Provider value={{className:"color-[#fff] , text-[40px] , mr-[30px]"}}>
                            <MdOutlineFileUpload/>
                          </IconContext.Provider>
                          <span>Comprobante de pago</span> 
                        </button>
                       </div>
                      
                       :
                      <div>
                        <button className="bg-[#008cdd] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#1e90ff] mt-5 flex items-center justify-center"
                          onClick={()=>handleClickPaymentStripe()}
                        >
                          <IconContext.Provider value={{className:"color-[#fff] , text-[40px] , mr-[30px]"}}>
                            <FaCcStripe/>
                          </IconContext.Provider>
                          <span>Pago con Tarjeta</span> 
                        </button>
                        <button  className="bg-[#fb8c00] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#e65100] mt-5 flex items-center justify-center"
                            onClick={()=>handleOpenTransfer()}
                        >
                              <IconContext.Provider value={{className:"color-[#fff] , text-[40px] , mr-[30px]"}}>

                                      <BiTransferAlt/>
                              </IconContext.Provider>
                              <span>Pago por transferencia</span>
                        </button>
                      </div>
                    }

                     {/* modal pago por stripe */}
                       <Modal
                        title="Proceder al Pago"
                        open={open}
                        handleOpenCheckout={handleOpenCheckout}
                        actions={false}
                       >
                        {clientSecretStripe && (
                        <Elements options={options} stripe={stripePromise}>
                         <CheckoutForm
                          handleOpenCheckout={handleOpenCheckout}
                         />
                        </Elements> 
                        )}
                       </Modal>
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
                      {/* modal comprobante de pago */}
                      <Modal
                       title="Sube tu comprobante de pago"
                       open={openProofOfPayment}
                       handleOpenCheckout={handleOpenProofOfPayment}
                       actions={false}
                       fullWidth={true}
                       maxWidth={'xs'}
                      >
                        <UploadProofOfPayment
                         setIsTransfer={setIsTransfer}
                         handleOpenProofOfPayment={handleOpenProofOfPayment}
                        />
                      </Modal>
                   </div>
                 </div> 
               </section>
        </Layout >
    )
}


export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadBanksAccounts());
    return{
        revalidate:3600
    }
});

export default Checkout
