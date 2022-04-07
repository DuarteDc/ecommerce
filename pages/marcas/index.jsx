import Layout from "../../src/components/Layouts"
import { startLoadBrandsHome } from "../../src/actions/brandsActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { CardProduct } from "../../src/components/ui";
import { Newsletter } from "../../src/components/home";
import { useRouter } from "next/router";
import LoadingScreen from "../../src/components/LoadingScreen";


const Brands = () => {
  const { brandsHome } = useSelector((state) => state.brands);
  const history = useRouter()


  const handleClickCard = (url) => {
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
      <section className="container mx-auto relative mt-20 max-w-[1290px]">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 px-2'>
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
      <Newsletter />
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(startLoadBrandsHome());
  await store.dispatch(startLoadAdministrableLogo());
  return {
    revalidate: 3600
  }
});



export default Brands;