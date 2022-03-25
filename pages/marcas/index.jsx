import Layout from "../../src/components/Layouts"

import BrandSlider from "../../src/components/brands/BrandSlider";
import { wrapper } from "../../src/store";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { useSelector } from "react-redux";

const Brands = () => {

  const { brands } = useSelector((state) => state.brands);

  return (
    <Layout>
      <section className="container mx-auto">
        <h1 className="my-20 text-center text-xl uppercase font-bold py-3 bg-gray-50">Marcas</h1>
        {
          brands.map(brand => (
            brand.products.length > 0 && (
              <BrandSlider brand={brand} key={brand?._id} />
            )
          ))
        }
      </section>
    </Layout>
  )
}


export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadBrands());
    return {
      revalidate: 3600
    }
  }
)
export default Brands;