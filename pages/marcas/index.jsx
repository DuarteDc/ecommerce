import Layout from "../../src/components/Layouts"

import client from "../../src/config/axiosConfig";
import BrandSlider from "../../src/components/brands/BrandSlider";
import { startLoadBrandsHome } from "../../src/actions/brandsActions";
import { startLoadAdministrableData } from "../../src/actions/administrableActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";





const Brands = () => {
  const {brandsHome} = useSelector((state)=>state.brands);

  return (
    <Layout>
      <section className="container mx-auto mt-20">
        <h1 className="my-20 text-center text-xl uppercase font-bold py-3 bg-gray-50">Marcas</h1>
        {
          brandsHome.map(brand => (
            brand.products.length > 0 && (
              <BrandSlider brand={brand} />
            )
          ))
        }
      </section>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
  await store.dispatch(startLoadBrandsHome());
  await store.dispatch(startLoadAdministrableData());
  return{
      revalidate:3600
  }
});



export default Brands;