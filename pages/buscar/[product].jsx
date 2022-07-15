import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions"
import { startLoadFaqsCategories } from "../../src/actions/faqsActions"
import { startSearchProduct } from "../../src/actions/productsAction"
import Layout from "../../src/components/Layouts"
import { ProductCard } from "../../src/components/ui"
import { wrapper } from "../../src/store"

const Search = () => {

  const router = useRouter();

  const { categories } = useSelector(state => state.faqs);
  const { searchedProducts } = useSelector(state => state.products)

  return (
    <Layout categories={categories}>
      <section className="min-h-screen font-Poppins container mx-auto">
        <div className="px-3 md:px-0">
          <h2 className="text-4xl mt-28 mb-10">Mostrando resultados para {router.query.product}</h2>
          <div className="flex flex-row-reverse text-gray-500">
            <p>{searchedProducts.length} {searchedProducts.length > 1 ? 'resultados' : 'resultado'} para tu busqueda</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-20">
          {
            searchedProducts.map(product => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))
          }
        </div>
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (ctx) => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories())
    await store.dispatch(startSearchProduct(ctx.query.product));
  })
export default Search