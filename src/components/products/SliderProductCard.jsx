import Image from "next/image";

import { Slide } from "react-slideshow-image";

import { IconContext } from "react-icons";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

import "react-slideshow-image/dist/styles.css";
import styles from "./ProductSlideshow.module.css";

const properties = {
  duration: 3000,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <div style={{ width: "30px", marginRight: "-30px" }}>
      <IconContext.Provider
        value={{
          className: "text-[#333] text-4xl cursor-pointer hover:text-slate-500",
        }}
      >
        <IoIosArrowBack />
      </IconContext.Provider>
    </div>
  ),
  nextArrow: (
    <div style={{ width: "30px", marginLeft: "-30px" }}>
      <IconContext.Provider
        value={{
          className: "text-[#333] text-4xl cursor-pointer hover:text-slate-500",
        }}
      >
        <IoIosArrowForward />
      </IconContext.Provider>
    </div>
  ),
};

const SliderProductCard = ({ images, handleShowProduct }) => {
  return (
    <Slide {...properties}>
      {images?.map(({ path, _id }) => (
        <div className={`${styles["each-slide-card"]}  cursor-pointer`} key={_id}>
        <div 
            onClick={handleShowProduct}
          >
            <img 
              src={path} 
              alt="product" 
            />
        </div>
      </div>
      ))}
    </Slide>
  );
};

export default SliderProductCard;
