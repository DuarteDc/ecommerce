import React from 'react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';

const SliderImage = ({slider}) => {
    return (
       <>
         <div className='main-banner flex items-center'>
             <div className='max-w-[1320px] pl-[200px]'>
               <div className='max-w-[520px] relative'>
                   {
                       slider?.short_text &&
                        <span className='text-base text-[#fff] block mb-3'>
                          {slider.short_text}
                        </span>
                   }
               
                {
                 slider?.text &&
                 <h1 className="text-[34px] font-bold text-luz uppercase mb-4 animate__animated animate__tada ">
                   {slider.text}
                 </h1>
                }
                {
                    slider?.alternative_text &&
                     <p className='leading-normal text-[#fff] text-[18px] mb-[20%]'>
                      Meet our weekly new arrivals
                     </p>
                }
                {
                    slider?.text &&
                    <Link href={`/offers/${slider.url}`}>
                        <span className='cursor-pointer mr-[10px] text-xl text-luz bg-[#333] border-[1px] border-solid border-transparent px-[25px] py-[11px] leading-normal rounded-none font-normal '>
                            Comprar Ahora !!
                        </span>
                    </Link>
                }
               
                
               
               </div>
             </div>
         </div>
         <style jsx>{
            `
            .main-banner {
               background-color:#000;
               position:relative;
               height:75vh;
               width:100vw;
            }
            .main-banner::before{
                content:' ';
                display:block;
                position:absolute;
                left:0;
                top:0;
                width:100%;
                height:100%;
                z-index:0;
                opacity:0.8;
                background-image:url(${slider.imageWeb});
                background-position:center;
                background-size:cover;
                background-repeat:no-repeat;
                min-height:400px;
                height:75vh;
                width:100vw;

            }
            @media(max-width:1024px){
                .main-banner {
                min-height:400px;
                }
            }

            @media(max-width:600px){
                .main-banner {
                min-height:200px;
                }
            }
            `
        }

        </style>  
        </>              
    );
};

export default SliderImage;