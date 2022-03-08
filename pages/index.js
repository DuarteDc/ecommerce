import { useSelector } from "react-redux";
import { startLoadOffers } from "../src/actions/offersActions";
import Content from "../src/components/Layouts/Content";
import { wrapper } from "../src/store";

const Home = () => {

  const { offers } = useSelector((state) => state.offers);
  return (
    <Content offers={offers} />
  )
}
export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async () => {
    await store.dispatch(startLoadOffers())
  })

export default Home;