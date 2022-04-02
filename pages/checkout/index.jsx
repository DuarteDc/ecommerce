import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { loadTotalsFromCookies } from "../../src/actions/shoppingCartActions";
import Cookie from 'js-cookie';
import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui";
import { helpers } from "../../src/helpers";
import { wrapper } from "../../src/store";
import { BillingForm } from "../../src/components/checkout/billingForm";


const Checkout = () => {
    const dispatch = useDispatch();
    const { superTotal , withDiscount ,  withoutDiscount , shipping_costs } = useSelector((state)=>state.cart);

    const super_total = helpers.priceFormat(superTotal?.total || 0);
    const with_discount = helpers.priceFormat(withDiscount?.total || 0);
    const without_discount = helpers.priceFormat(withoutDiscount?.total || 0);
    const subtotal = helpers.priceFormat(withDiscount?.total + withoutDiscount?.total || 0);
    const shippingCosts = helpers.priceFormat(shipping_costs[0]?.shippingCosts || 0);



    useEffect(() => {
        if(!Object.keys(superTotal).length){
            const superTotal = Cookie.get('superTotal') ? JSON.parse(Cookie.get('superTotal')) : {};
            const withDiscount = Cookie.get('withDiscount') ? JSON.parse(Cookie.get('withDiscount')) : {};
             const withoutDiscount = Cookie.get('withoutDiscount') ? JSON.parse(Cookie.get('withoutDiscount')) : {};
             const shippingCosts = Cookie.get('shippingCosts') ? JSON.parse(Cookie.get('shippingCosts')) : {};
            dispatch(loadTotalsFromCookies(superTotal,withDiscount , withoutDiscount , shippingCosts));
        }
    }, []);

    return (
        <Layout>
                <BannerImage
                    title="Realizar Pago"
                    imageBackground="bg-about-us"
               />
               <section className="max-w-[1480px] mx-auto my-20 px-[15px] w-full">
                   <div className="grid grid-cols-1 lg:grid-cols-12  md:my-10 gap-6">
                   <div className="col-span-7">
                     <BillingForm/>
                   </div>
                   <div className="col-span-5">
                     <h3 className="font-Poppins text-[20px] font-semibold leading-[1.4] text-[#333] mb-10 text-center">
                         Detalle de la ordén
                     </h3>
                     <div className="w-full mb-[20px] block">
                       <table className="min-w-full leading-normal">
                           <thead>
                              <tr className="">
                                  <th className="bg-[#333] px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold text-[#fff] uppercase">
                                      Descripción
                                   </th>
                                  <th className="bg-[#333] px-5 py-3 border-b-2 border-gray-200 text-xs font-semibold uppercase text-[#fff]">
                                      Total
                                  </th>
                              </tr>
                           </thead>
                           <tbody>
                               <tr>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900 text-center">
                                         Subtotal productos con descuento
                                         </p>
                                  </td> 
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900 text-center">
                                        {with_discount}
                                         </p>
                                  </td>  
                               </tr>
                               <tr>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                         Subtotal productos sin descuento
                                         </p>
                                  </td> 
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                          {without_discount}
                                         </p>
                                  </td>  
                               </tr>
                               <tr>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                            Gastós de Envio
                                         </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                           {shippingCosts}
                                         </p>
                                  </td>
                              </tr>
                              <tr>
                               
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                         Subtotal del carrito
                                         </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                          {subtotal}
                                         </p>
                                  </td>
                              </tr>
                              <tr>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                         Total a pagar
                                         </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                         <p className="text-gray-900  text-center">
                                          {super_total}
                                         </p>
                                  </td>
                              </tr>
                           </tbody>
                       </table>

                       <div className="mt-[40px] border-t-[1px] border-[#eaedff]">
                         <button className="bg-[#333] text-luz py-[15px] px-[20px] w-full uppercase text-[15px] hover:bg-[#000]">
                             Procesar Pago
                        </button>
                       </div>

                     </div>
                   </div>
                 </div> 
               </section>
        </Layout >
    )
}


export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadAdministrableLogo());
    return{
        revalidate:3600
    }
});

export default Checkout
