import React from 'react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SliderImage = ({slider}) => {
    return (
       <>
        <div className='h-[600px]'>

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
                background-image:url('./assets/images/slider.jpg');
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