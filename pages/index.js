import { wrapper } from "../src/store";
import { useSelector } from 'react-redux';

import Layout from "../src/components/Layouts";

/**Actions */
import { startLoadOffers } from "../src/actions/offersActions";
import { startLoadBrandsHome } from "../src/actions/brandsActions";
import { startLoadDataSliders } from "../src/actions/slidersActions";
import { startLoadCategoriesHome } from "../src/actions/categoryActions";

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
  const { offers } = useSelector((state) => state.offers);
  return (
    <>
      <Slider />
      <FacilityArea />
      <CategoryArea />
      {offers.length && <ProductsOfferArea /> || null}
      <ProductsArea />
      <Newsletter />
      <TestimonialArea />
      <PartnerArea />
    </>
  )
}

HomePage.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async () => {
    await store.dispatch(startLoadCategoriesHome());
    await store.dispatch(startLoadOffers());
    await store.dispatch(startLoadBrandsHome());
    await store.dispatch(startLoadDataSliders());
  })


