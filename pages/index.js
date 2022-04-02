import { wrapper } from "../src/store";


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

export default function HomePage() {
  
  return (
    <>
      <Slider />
      <FacilityArea />
      <CategoryArea />
      <ProductsOfferArea />
      <ProductsArea />
      <Newsletter />
      <TestimonialArea />
      <PartnerArea />
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return (
    <Layout
      title="Wapizima - Inicio"
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

    return {
      revalidate: 120
    }
  });


