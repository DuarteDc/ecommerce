import Image from 'next/image';
import Link from 'next/link';
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
import InfoItem from '../../src/components/distribuidor/InfoItem';

const Distributor = () => {

  const { BusinessRules } = useSelector(state => state.cart);
  const { productsMostSold } = useSelector(state => state.products);
  // const { brands } = useSelector(state => state.brands);
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
        title=""
        banner="bg-banner18"
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
          <div className="col-span-2 mt-26 lg:mt-0">
            <div className="overflow-auto px-5 lg:overflow-visible border-2 border-gray-200 rounded-lg py-16 md:px-10 shadow-md flex flex-col items-center hover:bg-gray-50">
              <h2 className="text-4xl font-semibold text-center mb-10">Aprovecha los descuentos de distribuidor</h2>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-white uppercase bg-[#333]">
                  <tr>
                    <th scope="col" className="py-3 md:px-6 px-2">
                      AL COMPRAR
                    </th>
                    <th scope="col" className="py-3 md:px-6 px-2">
                      HASTA
                    </th>
                    <th scope="col" className="py-3 md:px-6 px-2">
                      DESCUENTO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    BusinessRules.map(({ minimum_money, maximum_money, discount, _id }) => (
                      <tr className="bg-white border-b hover:bg-gray-100" key={_id}>
                        <td className="py-4 px-6">
                          {priceFormat(minimum_money)}
                        </td>
                        <td className="py-4 px-6">
                          {priceFormat(maximum_money)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-600">%{discount}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2">
          <InfoItem
            title="REGISTRATE"
            text={<p className="md:text-lg">
              Dirigite al apartado <Link href="/auth/register" passHref><b className="text-[#e91e63] cursor-pointer">REGISTRATE</b></Link>, Ingresa tus datos para poder crear tu perfil.
            </p>}
            image="/assets/icons/user.png"
          />
          <InfoItem
            title="Accede a ser distribuidor"
            text={<p className="md:text-lg">
              Observa los descuentos que tenemos para tí, en la tabla que se encuentra en la parte superior.
            </p>}
            image="/assets/icons/delivery-truck-icon.svg"
          />
          <InfoItem
            title="Revisa nuestro catalogo"
            text={<p className="md:text-lg">
              Dirigete a nuestro apartado de <Link href="/productos" passHref><b className="text-[#e91e63] cursor-pointer">PRODUCTOS</b></Link>, ahí podrás observar todo nuestro catalogo que tenemos para tí.
            </p>}
            image="/assets/icons/catalog.png"
          />
          <InfoItem
            title="Comienza a comprar"
            text={<p className="md:text-lg">
              Una vez revisado nuestro catalogo, agrega los productos de tu preferencia a tu carrito.
            </p>}
            image="/assets/icons/add-cart.png"
          />
          <InfoItem
            title="Verifica tus pedidos"
            text={<p className="md:text-lg">
              Dentro de tu carrito verifica tus productos y sus cantidades. Si todo está bien deberas continuar.
            </p>}
            image="/assets/icons/trolley.png"
          />
          <InfoItem
            title="Proceder a pagar"
            text={<p className="md:text-lg">
              Para pagar tendras 2 métodos de pago <b className="text-[#000]">(transferencia o pago con tarjeta)</b> y en el detalle de orden podras ver tus productos.
            </p>}
            image="/assets/icons/wallet.png"
          />
        </div>
      </section>
      {/* <section className="container mx-auto mb-20">
        <h3 className="py-3 bg-gray-100 text-xl font-bold text-center uppercase">Productos</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 md:gap-4">
          {
            productsMostSold.map((product) => (
              <ProductCard
                key={product.product._id}
                product={product.product}
              />
            ))
          }
        </div>
      </section> */}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadBusinessRules());
  // await store.dispatch(startLoadProductsMostSold(ctx.req?.cookies?.Currency || 'MXN'));
  // await store.dispatch(startLoadBrands())
});


export default Distributor



