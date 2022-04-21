import { useEffect } from "react";
import { wrapper } from "../src/store";
import { useDispatch, useSelector } from 'react-redux';
import Layout from "../src/components/Layouts";

/**Actions */
import { startLoadOffers } from "../src/actions/offersActions";
import { startLoadBrandsHome, startLoadBrands } from "../src/actions/brandsActions";
import { startLoadDataSliders } from "../src/actions/slidersActions";
import { startLoadCategoriesHome } from "../src/actions/categoryActions";
import { startLoadAdministrableLogo } from "../src/actions/administrableActions";
import { startLoadTags } from "../src/actions/tagsActions";
import Cookie from 'js-cookie';

/**Components */
import {
  Slider,
  Newsletter,
  PartnerArea,
  CategoryArea,
  FacilityArea,
  ProductsArea,
  ProductsOfferArea,
  TestimonialArea
} from '../src/components/home';

/**Actions */
import {addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage } from "../src/actions/shoppingCartActions";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { logged } = useSelector((state)=>state.auth);
  
  useEffect(() => {
    if (!logged){
    let cartNotLogged =  localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
    dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged]);

  useEffect(() => {
    if (logged){
      const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      dispatch(addShoppingCartFromLocalStorage(shoppingCart))
    }
  }, [logged]);

  useEffect(() => {
    if(router.query.redirect_status === 'succeeded'){
       localStorage.removeItem('cart');
       Cookie.remove('client_secret');
       Swal.fire({
         icon:"success",
         title:"Venta finalizada con exito",
         text:"Revisa el apartado mis pedidos para obtener más detalles del envio de tus productos",
         confirmButtonText:"Cerrar",
       }).then((result)=>{
         if(result.isConfirmed){
           
         }
       })
    }
  }, [router]);


  return (
    <>
      <Slider />
      <FacilityArea />
      <ProductsArea />
      <CategoryArea />
      <ProductsOfferArea />
      <PartnerArea />
      <Newsletter />
      <TestimonialArea />
      
    </>
  )
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

HomePage.getLayout = function getLayout(page) {
  return (
    <Layout
     title="Wapizima , Tienda en linea distribuidora de productos para uñas profesionales"
     keywords="nails,cosmetic nails,uñas,gel uñas,fantasy nails,bonita,uñas,material uñas,productos uñas,gel nail,decoraciones uñas,decoracion uñas,cursos uñas,lampara uñas"
     description="Tienda en linea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones , descuentos y mucho más."
     ogTitle="Wapizima , Tienda en linea distribuidora de productos para uñas profesionales"
     ogType="website"
     ogUrl={origin}
     ogImage=""
     robots="noindex , nofollow"
     canonical={origin}
    >
      {page}
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadCategoriesHome());
    await store.dispatch(startLoadDataSliders());
    await store.dispatch(startLoadOffers());
    await store.dispatch(startLoadBrandsHome());
    await store.dispatch(startLoadTags());
    await store.dispatch(startLoadBrands());

    return{
      revalidate:3600
    }
  });


