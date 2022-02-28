import { startLoadCategoriesHome } from "../src/actions/categoryActions";
import { startLoadOffers } from "../src/actions/offersActions";
import {startLoadBrandsHome} from "../src/actions/brandsActions";
import HomeComponents from "../src/components/home/home";
import { wrapper } from "../src/store";

const Home = () => {
  return (
    <HomeComponents/>
  )
}
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async () => {
    await store.dispatch(startLoadCategoriesHome());
    await store.dispatch(startLoadOffers());
    await store.dispatch(startLoadBrandsHome())
  })

export default Home;