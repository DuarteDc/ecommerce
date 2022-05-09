import { useSelector } from "react-redux";
import Image from "next/image";

export const Slider = () => {
  const { slidersData } = useSelector((state) => state.sliders);
  return (
    <section className="h-44 md:h-60 lg:h-[610px] relative z-[1] bg-[#f1f1f1]  before:absolute before:top-0 before:left-0 min-h-[300px]  bg-img slider-area">
      <div className="w-full h-full table absolute top-[30%]">
        <div className="max-w-[1320px] w-full mx-auto px-[.75rem]">
          <div className="max-w-[550px]">
            <span className="text-[14px] text-[#666] block mb-[8px]">Nuevas Colecciones 2022</span>
            <h1 className="font-lg lg:text-[32px] font-bold uppercase mb-[15px]">Productos hechos solo para ti!</h1>
            <p className="text-[18px] text-[#333] mb-[30px] leading-normal">Productos hechos solo para ti!</p>
          </div>
        </div>
      </div>
      <style jsx>{
                `
            .bg-img{
              background-image:url('/assets/images/slider.jpg');
              padding:12rem 0rem;
            }
            .slider-area{
              position:relative;
              z-index:1;
              background-position:50%;
              background-size:cover;
              background-repeat:no-repeat;
            }

            `
            }
            </style>
    </section>
  )
}