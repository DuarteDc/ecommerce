import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableAbout, startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts";
import { BannerImage } from "../../src/components/ui";
import { wrapper } from "../../src/store";
import Cookie from 'js-cookie';
import { addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage } from "../../src/actions/shoppingCartActions";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";

const AboutPage = () => {
  const dispatch = useDispatch();
  const { aboutUs, mission } = useSelector((state) => state.administrable);
  const { logged } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.faqs);

  useEffect(() => {
    if (!logged) {
      let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged, dispatch]);

  return (
    <>
      <BannerImage
        title="Acerca de Nosotros"
        imageBackground="bg-about-us"
      />
      <section>
        <div className="w-full  lg:max-w-[1220px] m-auto px-4">
          <div className="grid grid-cols-1 lg:grid-rows-2 gap-10 my-20">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-12 lg:col-span-8">
                <div className="pr-[85px] pt-2">
                  <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
                    <h3 className="font-semibold text-2xl leading-[1.2] color-[#333] pb-4">Nuestra Historia</h3>
                  </div>
                  <div className="font-Poppins text-sm leading-7 text-[#888] pb-6" dangerouslySetInnerHTML={{ __html: aboutUs.aboutThat }}></div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="relative z-[1] before:bottom-[-21px] before:left-[-21px] before:block before:absolute before:z-[-1] before:w-full before:h-full before:border-solid before:border-[#ccc] before:border-[3px]">
                  <div className="block overflow-hidden">
                    <Image
                      src={aboutUs.image}
                      className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.1] "
                      width={400}
                      height={500}
                      alt="acerca de nosotros"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-12 lg:col-span-4">
                <div className="relative z-[1] before:bottom-[-21px] before:left-[-21px] before:block before:absolute before:z-[-1] before:w-full before:h-full before:border-solid before:border-[#ccc] before:border-[3px]">
                  <div className="block overflow-hidden">
                    <Image
                      src={mission.image}
                      className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.1] "
                      width={400}
                      height={500}
                      alt="nuestra misión"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-8">
                <div className="pr-[85px] pt-2">
                  <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
                    <h3 className="font-semibold text-2xl leading-[1.2] color-[#333] pb-4">Nuestra Misión</h3>
                  </div>
                  <div className="font-Poppins text-sm leading-7 text-[#888] pb-6" dangerouslySetInnerHTML={{ __html: mission.mission }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

AboutPage.getLayout = function getLayout(page, categories) {
  return (
    <Layout
      title="Wapizima - Acerca de"
      robots="noindex"
      categories={categories}
    >
      {page}
    </Layout>
  );
};


export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadAdministrableAbout());
  await store.dispatch(startLoadFaqsCategories());

});

export default AboutPage
