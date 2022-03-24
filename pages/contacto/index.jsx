import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";

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
                     <div className="border-solid boder-[1px] border-[#e6e6e6] w-1/2 p-16 ">
                        
                     </div>
                     <div className="border-solid boder-[1px] border-[#e6e6e6] w-1/2 p-16 ">

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