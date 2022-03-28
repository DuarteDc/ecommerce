import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts"
import {BannerImage, ContactInfo} from "../../src/components/ui";
import {wrapper} from "../../src/store";
import {MdOutlineMailOutline} from "react-icons/md";
import {IconContext} from "react-icons";
import {GoLocation} from "react-icons/go";
import {BsTelephone} from "react-icons/bs";

const ContactUs = () =>{
    return (
        <Layout 
          title="Wapizima - Contácto"
          robots="noindex"
        >
           <BannerImage
              title="Contáctanos"
              imageBackground="bg-about-us"
           />
           <section className="bg-luz py-32">
               <div className=" max-w-[1380px] mx-auto w-full">
                 <div className="flex flex-wrap">
                     <div className="border-solid border-[2px] border-[#e6e6e6] w-1/2 p-16 flex justify-center flex-wrap items-center">
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
                     <div className="border-solid border-[2px] border-[#e6e6e6] w-1/2 p-16 flex justify-center flex-wrap items-center">
                       
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
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadAdministrableLogo());
    return{
        revalidate:3600
    }
});


export default ContactUs; 