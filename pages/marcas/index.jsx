import Layout from "../../src/components/Layouts"
import BrandSlider from "../../src/components/brands/BrandSlider";
import { startLoadBrandsHome } from "../../src/actions/brandsActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";
import { BannerImage } from "../../src/components/ui/bannerImage";
import Image from "next/image";
import { CardProduct } from "../../src/components/ui";
import { Newsletter } from "../../src/components/home";
import { useRouter } from "next/router";


const Brands = () => {
  const {brandsHome} = useSelector((state)=>state.brands);
  const history = useRouter()


  const handleClickCard = (url) =>{
       history.push(`marcas/${url}`)
  }

  return (
    <Layout 
      title="Wapizima - Marcas"
      robots="noindex"
    >
      <BannerImage
        title="Marcas"
      />
      <section className=" max-w-[1490px] mx-auto my-20">
        <div className="grid grid-cols-5 gap-3">
          {
          brandsHome.map(brand => (
           <CardProduct
             key={brand._id}
             image={brand.image}
             name={brand.name}
             url={brand.url}
             titleButton="Ver más.."
             handleClickCard={handleClickCard}
             width={250}
             height={250}
           /> 
            
          ))
        }
        </div>
      </section>
      <Newsletter/>
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