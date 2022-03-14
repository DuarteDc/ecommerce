import React from 'react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SliderImage = ({image}) => {
    return (
       <>
         <div className='main-banner'>
         </div>
         <style jsx>{
            `
            .main-banner {
               background-image:url(${image});
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