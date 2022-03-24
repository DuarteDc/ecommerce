import Layout from "../../src/components/Layouts"
import BrandSlider from "../../src/components/brands/BrandSlider";
import { startLoadBrandsHome } from "../../src/actions/brandsActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";
import { BannerImage } from "../../src/components/ui/bannerImage";





const Brands = () => {
  const {brandsHome} = useSelector((state)=>state.brands);

  return (
    <Layout 
      title="Wapizima - Marcas"
      robots="noindex"
    >
      <BannerImage
        title="Marcas"
      />
      <section className="container mx-auto mt-20">
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
  await store.dispatch(startLoadAdministrableLogo());
  return{
      revalidate:3600
  }
});



export default Brands;