import { useEffect } from "react";
import { wrapper } from "../src/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../src/components/Layouts";

/**Actions */
import { startLoadCategoriesHome } from "../src/actions/categoryActions";
import { startLoadAdministrableLogo } from "../src/actions/administrableActions";

/**Actions */
import Swal from "sweetalert2";
import { startLoadReviews } from "../src/actions/reviewsActions";
import { startLoadCurrencies } from "../src/actions/countryAcctions";
import { startFilterProducts, startLoadProductsMostSold } from "../src/actions/productsAction";

import Cookies from "js-cookie";

const endpoint = '/brands/with/categories';


/***************************************Components*************************************** */

import ProductsMostSold from '../src/components/ui/ProductsMostSold';

import loadable from '@loadable/component';

const ProductsAreaComponent = loadable(() => import('../src/components/home/ProductsArea'));
const ProductsOfferAreaComponent = loadable(() => import('../src/components/home/ProductsOfferArea'));
// const PartnerAreaComponent = loadable(() => import('../src/components/home/PartnerArea'));
const NewsletterComponent = loadable(() => import('../src/components/home/Newsletter'));
const TestimonialAreaComponenet = loadable(() => import('../src/components/home/testimonialArea'));


export default function HomePage() {

  const router = useRouter();

  const { logo } = useSelector((state) => state.administrable);
  const { productsMostSold, products } = useSelector(state => state.products);

  useEffect(() => {
    if (router.query.redirect_status === 'succeeded' || router.query.successTransfer === 'true') {
      Cookies.remove("client_secret");
      Swal.fire({
        icon: "success",
        title: "Venta finalizada con éxito",
        text: "Tus productos serán enviados una vez sean empaquetados y se les asigne un número de rastreo.",
        confirmButtonText: "Cerrar",
        cancelButtonText: "Ver mis pedidos",
        cancelButtonColor: "#1565c0",
        showCancelButton: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isDismissed) return router.replace("/perfil/mis-pedidos");
        router.push(
          {
            pathname: router.path,
          },
          undefined,
          { shallow: true },
        );
      });
    }
  }, [router]);

  const origin = typeof window === "undefined" ? "" : window.location.origin;

  return (
    <Layout
      title="Wapizima"
      keywords="nails,cosmetic nails,uñas,gel uñas, fantasy nails, bonita, uñas, material uñas, productos uñas, gel nail, decoraciones uñas, decoracion uñas,cursos uñas,lampara uñas"
      description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más."
      ogTitle="Wapizima, Tienda en línea distribuidora de productos para uñas profesionales"
      ogType="website"
      ogUrl={origin}
      ogImage={logo}
      robots="index, follow"
      canonical={origin}
    >
      {/* <Slider />
      <FacilityArea /> */}
      <ProductsMostSold productsMostSold={productsMostSold} />
      <ProductsAreaComponent products={products} />
      <ProductsOfferAreaComponent />
      {/* <PartnerAreaComponent /> */}
      <NewsletterComponent />
      <TestimonialAreaComponenet />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadCategoriesHome());
  await store.dispatch(startLoadReviews());
  await store.dispatch(startFilterProducts(endpoint, undefined, ctx.req?.cookies?.Currency || 'MXN'));
  await store.dispatch(startLoadProductsMostSold(ctx.req?.cookies?.Currency || 'MXN'));

});
