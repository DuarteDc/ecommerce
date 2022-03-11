import Layout from "../../src/components/Layouts"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { wrapper } from "../../src/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CardProduct2 } from "../../src/components/ui/cardProduct2";



const index = () => {
  const products = [
    { id: 1, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
    { id: 2, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
    { id: 3, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
    { id: 4, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
    { id: 5, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
    { id: 6, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
    { id: 7, name: "hoa", price: "120", principal_image: "https://images.ctfassets.net/2d5q1td6cyxq/4kmwcxuqXxUxUVfggQhbiI/650b0af104bfdf9979545eb326786243/Hero-hottoddy_.jpg" },
  ]

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
                    {
                      products.map(product => (
                        <CardProduct2 product={product} />
                      ))
                    }
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