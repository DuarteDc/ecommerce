import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadOffers } from "../../src/actions/offersActions";
import Layout from "../../src/components/Layouts";
import { wrapper } from "../../src/store";
import Image from "next/image";


const Offers = () => {

  const { offers } = useSelector(state => state.offers);

  return (
    <Layout>
      <section className="font-Poppins">
        {
          offers.map(offer => (
            <div className="w-full relative lg:min-h-screen max-h-screen h-4/6" key={offer._id}>
              <div className="opacity-50 bg-[#333] w-full h-full absolute z-20 "></div>
              <Image
                src={offer.imageWeb}
                alt={offer.text}
                layout="fill"
                blurDataURL
                placeholder="blur"
              />
              <div className="text-white lg:text-gray-900 absolute bottom-1/4 inset-x-1/4 lg:bottom-1/4 lg:left-40 z-30 lg:border-[10px] border-white p-1 lg:p-3 text-center w-7/12 lg:w-5/12 lg:mx-5">
                <div className="lg:bg-white p-2 lg:p-10">
                  <h2 className="text-lg md:text-xl lg:text-3xl uppercase font-bold mb-2">{offer.text}</h2>
                  <p className="text-sm md:text-base lg:text-lg capitalize hidden lg:block">{offer.short_text}</p>
                </div>
              </div>
            </div>

          ))
        }
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async (ctx) => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadOffers());
  })
export default Offers;