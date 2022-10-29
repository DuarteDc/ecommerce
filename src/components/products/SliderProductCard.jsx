import Image from "next/image";

import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const properties = {
  duration: 3000,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <div className="absolute z-20 left-0">
        <ArrowBackIosIcon className="text-[#333] text-4xl cursor-pointer hover:text-slate-500 hidden md:block" />
    </div>
  ),
  nextArrow: (
    <div className="absolute z-20 -right-2">
        <ArrowForwardIosIcon className="text-[#333] text-4xl cursor-pointer hover:text-slate-500 hidden md:block" />
    </div>

  ),
};

const SliderProductCard = ({ images, handleShowProduct }) => {
  return (
    <Slide {...properties} className="relative">
      {images?.map(({ path, _id }) => (
        <div
          key={_id}
          className="flex items-center justify-center mx-0"
        >
          <div onClick={handleShowProduct} className="w-full">
            <img src={path} alt="product"  width = "320" height = "320" className="h-[9.5rem] md:h-[17rem] w-full md:w-[24rem] ml-0 "/>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default SliderProductCard;
