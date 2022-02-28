import {AiOutlineHeart} from 'react-icons/ai';
import { priceFormat } from '../../helpers/helpers';
const CardProduct1 = ({ product ,  handleClickModal }) => {
 const price_format = priceFormat(product.price);
  return (
    <>
      <div className="relative left-0 top-0 pb-[35px] animate__animated animate__zoomIn">
        <div className="mx-[56px]">
          <div className="block-pick overflow-hidden relative flex justify-center items-center min-h-[400px] ">
            <img
              src={product.principal_image}
              className="w-full h-full transition-transform duration-[0.9s] ease-linear delay-0 hover:scale-[1.1] max-w-[300px] max-h-[400px]"
            />
            <a
              className="block-btn rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-5 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0"
              onClick={()=>handleClickModal(product)}
            >
              Ver más
            </a>
          </div>
          <div className="flex items-start flex-wrap">
            <div>
              <a className="font-Poppins text-base leading-[2.4] text-[#666] mb-16 ">
                {product.name}
              </a>
              <p className="font-Poppins text-base leading-[1] text-[#666]">
                {price_format}
              </p>
            </div>
            {/* <div className="cursor-pointer w-8 flex justify-end pt-3 w-">
              <a className="relative block">
                <AiOutlineHeart/>  
              </a>
          </div> */}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .block-pick:hover .block-btn {
            bottom: 20px;
          }
        `}
      </style>
    </>
  );
};

export default CardProduct1;
