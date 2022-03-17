import Layout from "../../src/components/Layouts"

import client from "../../src/config/axiosConfig";
import BrandSlider from "../../src/components/brands/BrandSlider";





const Brands = ({ brands }) => {

  return (
    <Layout>
      <section className="container mx-auto mt-20">
        <h1 className="my-20 text-center text-xl uppercase font-bold py-3 bg-gray-50">Marcas</h1>
        {
          brands.map(brand => (
            brand.products.length > 0 && (
              <BrandSlider brand={brand} />
            )
          ))
        }
      </section>
    </Layout>
  )
}


export const getStaticProps = async () => {

  const { data } = await client.get('/brands/products/brand');

  const brands = data.brands;

  return {
    props: {
      brands,
    },
    revalidate: 3600
  }
}



export default Brands;