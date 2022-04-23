import { useEffect } from "react";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts"
import {BannerImage, ContactInfo} from "../../src/components/ui";
import {wrapper} from "../../src/store";
import {MdOutlineMailOutline} from "react-icons/md";
import {IconContext} from "react-icons";
import {GoLocation} from "react-icons/go";
import {BsTelephone} from "react-icons/bs";

import { addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage,  } from "../../src/actions/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";

const ContactUs = () =>{
    const dispatch = useDispatch();
    const { logged } = useSelector((state)=>state.auth);
    const { categories } = useSelector((state)=>state.faqs);

    useEffect(() => {
      if (!logged){
      let cartNotLogged =  localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
        dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
      }
    }, [logged]);

    return (
        <Layout 
          title="Wapizima - Contácto"
          robots="noindex"
          categories={categories}
        >
           <BannerImage
              title="Contáctanos"
              imageBackground="bg-about-us"
           />
           <section className="bg-luz py-26">
               <div className=" max-w-[1380px] mx-auto w-full">
                 <div className="flex flex-wrap">
                     <div className="border-solid border-[2px] border-[#e6e6e6] w-full lg:w-1/2 xl:w-1/2 p-16 flex justify-center flex-wrap items-center">
                        <form className="w-full">
                            <h4 className="font-Poppins text-[24px] leading-[1.5] text-[#333] text-center pb-[30px]">Envianos un mensaje</h4>

                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-6">
                            <IconContext.Provider 
                               value={{className:"text-[25px] text-[#888] w-[20%] "}}
                            >
                               <MdOutlineMailOutline/>
                              </IconContext.Provider>
                              <input type="text" name="email" placeholder="Ingresa tu correo electronico" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"/>
                            </div>
                            <div className="border border-solid boder-[1px] border-[#e6e6e6] rounded-sm mb-[30px]">
                              <textarea placeholder="¿Como podemos ayudarte?" name="message" className="w-full min-h-[199px] font-Poppins text-xs leading-[1-6923] text-[#333] px-[28px] pt-[25px] block outline-0"></textarea>
                            </div>
                        </form>
                     </div>
                     <div className="border-solid border-[2px] border-[#e6e6e6] w-full lg:w-1/2 xl:w-1/2 p-16 flex justify-center flex-wrap items-center">
                       
                       <ContactInfo
                         icon={<GoLocation/>}
                         title="Dirección"
                         text="Dr. Andrés Benavides 304, Residencial Colón y Col Ciprés, 50120 Toluca de Lerdo, Méx."
                       />

                       <ContactInfo
                         icon={<BsTelephone/>}
                         title="Hablemos"
                         text="+52 (7292420885)"
                       />

                       <ContactInfo
                         icon={<MdOutlineMailOutline/>}
                         title="Soporte de Venta"
                         text="pruebitas.test@gmail.com"
                       />
                     </div>
                 </div>
               </div>
           </section>
           <section className="w-full">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.14544889983!2d-99.66265068578412!3d19.276040050664797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89a337ab3863%3A0xe5209d75006ddf53!2sDr.%20Andr%C3%A9s%20Benavides%20304%2C%20Residencial%20Col%C3%B3n%20y%20Col%20Cipr%C3%A9s%2C%2050120%20Toluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1650566416705!5m2!1ses-419!2smx" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
           className="border-0 w-full"
           ></iframe>
           </section>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());

    return{
      revalidate:3600
    }
});


export default ContactUs; 