import Image from 'next/image';
import { wrapper } from '../../src/store';

import Layout from '../../src/components/Layouts'
import { BannerImage, ProductCard } from '../../src/components/ui'

import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { startLoadCurrencies } from '../../src/actions/countryAcctions'
import { startLoadBusinessRules } from '../../src/actions/shoppingCartActions'
import { useSelector } from 'react-redux'

import { helpers } from '../../src/helpers'
import { startLoadProductsMostSold } from '../../src/actions/productsAction';
import { startLoadBrands } from '../../src/actions/brandsActions';


const Distributor = () => {

  const { BusinessRules } = useSelector(state => state.cart);
  const { productsMostSold } = useSelector(state => state.products);
  const { brands } = useSelector(state => state.brands);
  const { priceFormat } = helpers;

  return (
    <Layout
      title="Wapizima - Distribuidor"
      keywords="Wapizima"
      // description={product?.description}
      ogTitle="Wapizima"
      ogType="Product"
    // ogUrl={origin}
    // ogImage={product?.multimedia[0]?.path}
    // robots="index, follow"
    // canonical={origin}
    // price={product?.price}
    // curren="MXN"
    // structuredData={structuredData}
    >
      <BannerImage
        title="Ser distribuidor nunca fue tan facil"
        banner="bg-banner8"
      />
      <section className="flex justify-center container mx-auto my-20 lg:px-24 font-Poppins">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="px-5">
            <div className="border-2 border-gray-200 rounded-lg py-16 px-2 shadow-md flex flex-col items-center hover:bg-gray-50 cursor-pointer">
              <Image
                src="/assets/icons/logistic-truck-icon.svg"
                alt="Distribuidor"
                width={120}
                height={120}
              />
              <h2 className="text-4xl mt-8 mb-10 font-bold text-center">Convierte en distribuidor</h2>
              <p className="text-center text-lg text-gray-600 mb-10 px-4">
                Forma parte de nuestra red de distribuidores y goza de los grandes beneficios que Wapizima tiene para ti.
              </p>
            </div>
          </div>
          <div className="col-span-2">
            <div className="overflow-auto lg:overflow-visible border-2 border-gray-200 rounded-lg py-16 px-10 shadow-md flex flex-col items-center hover:bg-gray-50 cursor-pointer relative">
              <figure className="absolute -top-10 -right-10">
                <img src="/assets/icons/buen-fin.jpg" alt="" width="110" />
              </figure>
              <h2 className="text-4xl font-semibold text-center mb-10">Aprovecha los descuentos del Buen Fin</h2>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#333]">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      COMPRA MÍNIMA
                    </th>
                    <th scope="col" className="py-3 px-6">
                      COMPRA MÁXIMA
                    </th>
                    <th scope="col" className="py-3 px-6">
                      DESCUENTO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    BusinessRules.map(({ minimum_money, maximum_money, discount, _id }) => (
                      <tr className="cursor-pointer bg-white border-b hover:bg-gray-100" key={_id}>
                        <td className="py-4 px-6">
                          {priceFormat(minimum_money)}
                        </td>
                        <td className="py-4 px-6">
                          {priceFormat(maximum_money)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-600 hover:underline">{priceFormat(discount)}</span>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto">
        <h3 className="py-3 bg-gray-100 text-xl font-bold text-center">Productos</h3>
        <div className="grid grid-cols-4 mt-10 gap-4">
        {
            productsMostSold.map((product) => (
              <ProductCard
                key={product.product._id}
                product={product.product}
              />
            ))
          }
        </div>
      </section>
      <section className="flex justify-between  bg-gray-50 px-24 my-20">
        {
          brands.map(brand => (
            <img src={brand.image} alt="" srcset="" width={100}/>
          ))
        }
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadBusinessRules());
  await store.dispatch(startLoadProductsMostSold(ctx.req?.cookies?.Currency || 'MXN'));
  await store.dispatch(startLoadBrands())
});


export default Distributor



