import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../../src/actions/administrableActions";
import { startLoadFaqsCategories } from "../../../src/actions/faqsActions";
import { startGetDirections } from "../../../src/actions/profileActions";
import Layout from "../../../src/components/Layouts"
import DirectionsSeccion from "../../../src/components/profile/ui/DirectionsSeccion";
import { wrapper } from "../../../src/store";
import { BannerImage } from "../../../src/components/ui/bannerImage";

const MyDirections = () => {

  const { categories } = useSelector(state => state.faqs);
  const { directions } = useSelector(state => state.profile);

  return (
    <Layout
      categories={categories}
    >
      <BannerImage title="Mis direcciones" banner="bg-banner6"/>
      <section className="container mx-auto my-20 min-h-screen">
        <DirectionsSeccion
          directions={directions}
        />
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (ctx) => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startGetDirections(ctx));
    await store.dispatch(startLoadFaqsCategories());
  })

export default MyDirections