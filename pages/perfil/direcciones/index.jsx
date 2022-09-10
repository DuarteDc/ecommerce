import { useState } from "react";
import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../../src/actions/administrableActions";
import { startLoadFaqsCategories } from "../../../src/actions/faqsActions";
import { startGetDirections } from "../../../src/actions/profileActions";
import Layout from "../../../src/components/Layouts"
import DirectionsSeccion from "../../../src/components/profile/ui/DirectionsSeccion";
import { wrapper } from "../../../src/store";
import { BannerImage } from "../../../src/components/ui/bannerImage";
import { useToggle } from "../../../src/hooks/useToggle";
import { Modal } from "../../../src/components/ui/modal";
import FormCountry from "../../../src/components/ui/FormCountry";
import { startLoadCountries, startLoadCurrencies } from "../../../src/actions/countryAcctions";

const MyDirections = () => {

  const { categories } = useSelector(state => state.faqs);
  const { directions } = useSelector(state => state.profile);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [openSelectCountry, toggleSelectCountry] = useToggle();

  return (
    <Layout
      categories={categories}
    >
      <BannerImage title="Mis direcciones" banner="bg-banner6" />
      <section className="container mx-auto my-20 min-h-screen">
        <DirectionsSeccion
          directions={directions}
          showForm={showForm}
          setShowForm={setShowForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          toggleSelectCountry={toggleSelectCountry}
        />
      </section>
      <Modal
        open={openSelectCountry}
        handleOpenCheckout={toggleSelectCountry}
        actions={false}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <FormCountry
          toggleSelectCountry={toggleSelectCountry}
          setShowForm={setShowForm}
          setIsEditing={setIsEditing}
          />
      </Modal>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (ctx) => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startGetDirections(ctx));
    await store.dispatch(startLoadFaqsCategories());
    await store.dispatch(startLoadCountries());
    await store.dispatch(startLoadCurrencies());
  })

export default MyDirections