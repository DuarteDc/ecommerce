import Layout from "../../src/components/Layouts"
import Slider from "../../src/components/Layouts/Slider"
import { Swiper, SwiperSlide } from "swiper/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Pagination } from "swiper";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";
import Link from "next/link";



const Brands = () => {

  const { brands } = useSelector((state) => state.brands);

  return (
    <Layout>
      <section className="container mx-auto">
        <h1 className="my-20 text-center text-xl uppercase font-bold py-3 bg-gray-50">Marcas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div className="bg-gray-50 overflow-hidden relative h-[30rem]">
            <img
              src="https://images.unsplash.com/photo-1620987278429-ab178d6eb547?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHByb2R1Y3R8ZW58MHx8MHx8&w=1000&q=80"
              alt="hola"
              className="w-full h-full object-fill hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer"
            />
            <div className="absolute bottom-1/3 ml-5">
              <p className="uppercase mb-3 font-bold">Lorem ipsum dolor sit amet.</p>
              <p className="mb-5">500 Productos</p>
              <button className=" bg-black mr-10 px-6 py-3 border-2 border-black transition-all duration-700 ease-in-out 
            hover:bg-transparent text-white cursor-pointer hover:text-black font-bold">
                Ver Productos
              </button>
            </div>
          </div>
          <div className="bg-gray-50 overflow-hidden relative h-[30rem]">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="hola"
              className="w-full h-full object-fill hover:scale-110 transition-all duration-700 ease-in-out cursor-pointer"
            />
            <div className="absolute bottom-1/3 ml-5">
              <p className="uppercase mb-3 font-bold">Lorem ipsum dolor sit amet.</p>
              <p className="mb-5">500 Productos</p>
              <button className=" bg-black mr-10 px-6 py-3 border-2 border-black transition-all duration-700 ease-in-out 
            hover:bg-transparent text-white cursor-pointer hover:text-black font-bold">
                Ver Productos
              </button>
            </div>
          </div>
        </div>
        {
          brands.map(brand => (
            <section className="my-10 font-bold" key={brand._id}>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <h2 className="text-xl mb-4">{brand.name}</h2>
                <p className="cursor-pointer">Ver mas...</p>
              </div>
              <div className="w-full py-10">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={2}
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  className={"mySwiper"}
                  modules={[Pagination]}
                  breakpoints={{
                    250: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div className="h-[30rem] cursor-pointer px-5 mb-10 ">
                      <img
                        src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX472_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1570119352353"
                        className="h-2/3 w-full"
                      />
                      <div className="px-2 py-5">
                        <p className="mt-5">Lorem ipsum dolor sit.</p>
                        <p>$300</p>
                        <div className="flex justify-between flex-row items-center mt-5">
                          <button className="text-xs lg:text-sm text-white mx-1 bg-black font-bold py-2 px-2 border-2 hover:bg-white hover:text-black hover:border-2 border-black transition-all duration-700 ease-in-out">
                            Agregar a carrito
                          </button>
                          <Link href={{
                            pathname: 'brands/[id]',
                            query: { id: brand._id }
                          }}>
                            <p className="text-gray-500">Ver detalles</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </section>
          ))
        }
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async () => {
    await store.dispatch(startLoadBrands());

  })


export default Brands;