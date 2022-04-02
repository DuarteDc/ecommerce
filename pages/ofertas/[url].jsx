import { wrapper } from "../../src/store";
import Layout from "../../src/components/Layouts";
// import { startLoadAdministrableData } from "../../src/actions/administrableActions";

const Offer = () =>{
   return(
       <Layout>
          <section>

          </section>
       </Layout>
   )
}

export default Offer;

// export const getServerSideProps = wrapper.getStaticProps((store) =>
//   async () => {
//     await store.dispatch(startLoadAdministrableData());
//     return{
//       revalidate:43200
//     }
// });