import {AiOutlineHeart} from 'react-icons/ai';
import { priceFormat } from '../../helpers/helpers';

export const CardProduct2 = ({image , product }) => {

    const price_format = priceFormat(product.price);
    
    return (
        <>
      <div className="relative left-0 top-0 pb-[35px] animate__animated animate__zoomIn">
        <div className="">
          <div className="block-pick overflow-hidden relative flex justify-center items-center min-h-[400px] ">
            <img
              src={image}
              className="w-full h-full transition-transform duration-[0.9s] ease-linear delay-0 hover:scale-[1.1] max-w-[300px] max-h-[400px]"
            />

            <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-[1] transition-all	duration-[0.4s] ease-linear delay-0">
            
             <a className="addwishlist block absolute top-[26px] right-[20px] font-normal text-xl text-luz leading-none	scale-0 transition-all duration-[0.4s] ease-linear delay-0">
             <AiOutlineHeart/>
             </a>
             <div className="absolute left-2/4 translate-x-[-50%]  bottom-[-50px] w-[161px] transition-all	duration-[0.4s] ease-linear delay-0">
               {/* <Link to={`products/${product.url}`}> */}
               <button
              className="block-btn rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-10 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0"
            >
              Ver más
            </button>
               {/* </Link> */}
            </div>

            </div>
          </div>
          <div className="flex items-start flex-wrap">
            <div className="w-4/5">
              <a className="font-Poppins text-base leading-[2.4] text-[#666] mb-16 ">
                {product.name}
              </a>
              <p className="font-Poppins text-base leading-[1] text-[#666]">
                {price_format}
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
    );
};