import Layout from "../../src/components/Layouts"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CardProduct2 } from "../../src/components/ui/cardProduct2";
import {AiOutlineHeart} from 'react-icons/ai';



const index = () => {


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
            <section className="my-10 font-bold">
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <h2 className="text-xl mb-4">{brand.name}</h2>
                <Link href={{
                  pathname: '/brands/[id]',
                  query: { id: brand._id }
                }}>
                  <a className="cursor-pointer hover:text-black transition-all duration-700 ease-in-out">Ver mas...</a>
                </Link>
              </div>
              <div>
                <Swiper
                  slidesPerView={1}
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
                    <>
                      <div className="relative left-0 top-0 pb-[35px] animate__animated animate__zoomIn">
                        <div className="">
                          <div className="block-pick overflow-hidden relative flex justify-center items-center min-h-[400px] ">
                            <img
                              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                              className="w-full h-full transition-transform duration-[0.9s] ease-linear delay-0 hover:scale-[1.1] max-w-[300px] max-h-[400px]"
                            />

                            <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-[1] transition-all	duration-[0.4s] ease-linear delay-0">

                              <a className="addwishlist block absolute top-[26px] right-[20px] font-normal text-xl text-luz leading-none	scale-0 transition-all duration-[0.4s] ease-linear delay-0">
                                <AiOutlineHeart />
                              </a>
                              <div className="absolute left-2/4 translate-x-[-50%]  bottom-[-50px] w-[161px] transition-all	duration-[0.4s] ease-linear delay-0">
                                <button
                                  className="block-btn rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-10 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0"
                                >
                                  Ver más
                                </button>
                              </div>

                            </div>
                          </div>
                          <div className="flex items-start flex-wrap">
                            <div className="w-4/5">
                              <a className="font-Poppins text-base leading-[2.4] text-[#666] mb-16 ">
                                Hola mundo
                              </a>
                              <p className="font-Poppins text-base leading-[1] text-[#666]">
                                200
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <style jsx>
                        {`
          .block-pick:hover .block-btn {
            bottom: 100px;
          }

          .block-pick:hover .addwishlist{
              transform:scale(1);
          }
        `}
                      </style>
                    </>
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


export default index