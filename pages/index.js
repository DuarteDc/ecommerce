import { useEffect } from "react";
import { wrapper } from "../src/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../src/components/Layouts";

/**Actions */
import { startLoadBrandsWithCategories, } from "../src/actions/brandsActions";
import { startLoadCategoriesHome } from "../src/actions/categoryActions";
import { startLoadAdministrableLogo } from "../src/actions/administrableActions";

/************************     RSS FEED  ********************** */
// import getRSS from "../src/lib/generateRSS";

/**Components */
import {
  Newsletter,
  PartnerArea,
  ProductsArea,
  ProductsOfferArea,
  TestimonialArea,
} from "../src/components/home";

/**Actions */
import Swal from "sweetalert2";
import { startLoadReviews } from "../src/actions/reviewsActions";
import { startLoadCurrencies } from "../src/actions/countryAcctions";
import getRSSForGoogle from "../src/lib/generateRSSForGoogle";
import { startFilterProducts, startLoadProductsMostSold } from "../src/actions/productsAction";
import { ProductsMostSold } from "../src/components/ui";

import Cookies from "js-cookie";



const endpoint = '/brands/with/categories';

export default function HomePage() {

  const router = useRouter();

  const { logo } = useSelector((state) => state.administrable);
    // useEffect(() => {
  //   if (router.query.successTransfer === "true") {
  //     localStorage.removeItem("cart");
  //     Cookie.remove("client_secret");
  //     Swal.fire({
  //       icon: "success",
  //       title: "Venta finalizada con exito",
  //       text: "Revisa el apartado mis pedidos para subir los comprobantes de pago y una vez verificada la información enviaremos tus productos.",
  //       confirmButtonText: "Cerrar",
  //       cancelButtonText: "Ver mis pedidos",
  //       cancelButtonColor: "#1565c0",
  //       showCancelButton: true,
  //       allowOutsideClick: false,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router.push(
  //           {
  //             pathname: router.path,
  //           },
  //           undefined,
  //           { shallow: true }
  //         );
  //       }

  //       if (result.isDismissed) {
  //         router.push({
  //           pathname: "/perfil/mis-pedidos",
  //         });
  //       }
  //     });
  //   }
  // }, [router]);

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
  // useEffect(() => {
  //   const modalOfferOpen = Cookie.get("modalOfferOpen");

  //   if (modalOfferOpen === "false") {
  //     setOpen(false);
  //   }
  // }, []);

  // const handleButtonCloseModalOffers = () => {
  //   Cookie.set("modalOfferOpen", false);
  //   setOpen(false);
  // };

  // const handleOpenModalOffers = () => {
  //   setOpen(!open);
  // };

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
      <ProductsMostSold />
      <ProductsArea />
      {/* <CategoryArea /> */}
      <ProductsOfferArea />
      <PartnerArea />
      <Newsletter />
      <TestimonialArea />
      {/* {offers.length && (
        <Modal
          showTitle={false}
          open={open}
          fullWidth={true}
          maxWidth="sm"
          actions={false}
          handleOpenCheckout={handleOpenModalOffers}
          background="bg-offers opacity-[0.9]"
        >
          <Container>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                  variant="h3"
                  className="font-Poppins font-normal text-[30px] text-primary text-center uppercase mb-6"
                >
                  Ofertas del dia
                </Typography>
              </Grid>
              {offers.map((offer) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  key={offer._id}
                >
                  <OfferCard offer={offer} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div className="w-full flex justify-center">
                <button
                  className="bg-[#333] text-secondary py-4 px-10 rounded-none w-full hover:bg-[#000]"
                  onClick={handleButtonCloseModalOffers}
                >
                  Cerrar
                </button>
              </div>
            </Grid>
          </Container>
        </Modal>
      )} */}
    </Layout>
  );
}

// HomePage.getLayout = function getLayout(page) {

//   return (
//     <Layout
//       title="Wapizima"
//       keywords="nails,cosmetic nails,uñas,gel uñas, fantasy nails, bonita, uñas, material uñas, productos uñas, gel nail, decoraciones uñas, decoracion uñas,cursos uñas,lampara uñas"
//       description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más."
//       ogTitle="Wapizima, Tienda en línea distribuidora de productos para uñas profesionales"
//       ogType="website"
//       ogUrl={origin}
//       ogImage={logo}
//       robots="index, follow"
//       canonical={origin}
//     >
//       {page}
//     </Layout>
//   );
// };

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadCategoriesHome());
  await store.dispatch(startLoadReviews());
  await store.dispatch(startFilterProducts(endpoint, undefined, ctx.req?.cookies?.Currency || 'MXN'));
  await store.dispatch(startLoadProductsMostSold(ctx.req?.cookies?.Currency || 'MXN'));

});
