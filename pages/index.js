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

export default function HomePage() {
  const dispatch = useDispatch();
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

HomePage.getLayout = function getLayout(page) {
  return (
    <Layout
     title="Wapizima - Inicio"
     keywords=""
     description="Tienda en linea de distribución de productos profesionales para uñas acrilicas y semipermanente de calidad. Venta Menudeo y Mayoreo. Promociones , descuentos y mucho más."
     ogTitle=""
     ogType=""
     ogUrl=""
     ogImage=""
     robots="noindex"
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


