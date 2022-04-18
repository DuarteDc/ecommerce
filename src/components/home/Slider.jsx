import { useSelector } from "react-redux";
import Image from "next/image";

export const Slider = () => {
    const {slidersData} = useSelector((state)=>state.sliders);
    return (
       <section className="h-[610px] md:h-auto lg:h-auto xl:h-auto relative z-[1] bg-[#f1f1f1]  before:absolute before:top-0 before:left-0 min-h-[300px]">
        <Image
         src='/assets/images/slider.jpg'
         width={1920}
         height={610}
         layout="responsive"
        />
        <div className="w-full h-full table absolute top-[30%]">
            <div className="max-w-[1320px] w-full mx-auto px-[.75rem]">
              <div className="max-w-[550px]">
               <span className="text-[14px] text-[#666] block mb-[8px]">Nuevas Colecciones 2022</span>
               <h1 className="text-[32px] font-bold uppercase mb-[15px]">Productos hechos solo para ti!</h1>
               <p className="text-[18px] text-[#333] mb-[30px] leading-normal">Productos hechos solo para ti!</p>
              </div>
            </div>


        </div>
       </section>
    )
}