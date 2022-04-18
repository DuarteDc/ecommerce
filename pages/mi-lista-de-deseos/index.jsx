import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadShoppingCart } from "../../src/actions/shoppingCartActions";
import Layout from "../../src/components/Layouts";
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";

const WhishList = () =>{
   return(
    <Layout>
    <BannerImage
      title="Mi Lista de deseos"
      imageBackground="bg-about-us"
   />
   <section>
      <div>
          
      </div> 
   </section>
   </Layout>
   )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async(ctx)=>{
    await store.dispatch(startLoadAdministrableLogo());  
    await store.dispatch(startLoadShoppingCart(ctx.req.cookies.token));
});

export default WhishList;