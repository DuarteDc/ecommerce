import { CircularProgress } from "@mui/material";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

export const CheckoutForm = ({handleOpenCheckout}) =>{
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });
      }, [stripe]);
    
      console.log(stripe?.elements)

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://test.wapizima.com/'
          },
        });
    
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occured.");
        }
    
        setIsLoading(false);
      };

    return(
        <form className="mt-[10px] border-t-[1px] border-[#eaedff]" id="payment-form" onSubmit={handleSubmit}>
          
             <PaymentElement id="payment-element"/>
            <button 
              type="submit"
              className="bg-[#333] 
                         text-luz 
                           py-[15px] 
                           px-[20px] 
                           w-full 
                           uppercase 
                           text-[15px] 
                         hover:bg-[#000]
                           mt-5
                        "
              disabled={isLoading || !stripe || !elements}
              id="submit"
            >
                <span id="button-text">
                    {
                        isLoading ?
                        <div className="flex justify-center items-center"> 
                          <CircularProgress className="mr-5"/>
                          <span> Espere un momento</span> 
                         
                        </div> 
                        : 
                        'Pagar Ahora'
                    }
                
                </span>
            </button>
            <button
              className="bg-[#333]
                         text-luz 
                         py-[15px] 
                         px-[20px] 
                         w-full 
                         uppercase 
                         text-[15px] 
                       hover:bg-[#000]
                         mt-5"
              onClick={()=>handleOpenCheckout()}
              disabled={isLoading}
            >
               Cancelar
            </button>
            {/* Show any error or success messages */}
           {message && <div id="payment-message">{message}</div>}
        </form>
    )
}