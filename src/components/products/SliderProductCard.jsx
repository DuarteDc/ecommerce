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
    <div style={{ width: "30px", marginRight: "-30px" }}>
      <ArrowBackIosIcon className="text-[#333] text-4xl cursor-pointer hover:text-slate-500" />
    </div>
  ),
  nextArrow: (
    <div style={{ width: "30px", marginLeft: "-30px" }}>
      <ArrowForwardIosIcon className="text-[#333] text-4xl cursor-pointer hover:text-slate-500" />
    </div>
  ),
};

const SliderProductCard = ({ images, handleShowProduct }) => {
  return (
    <Slide {...properties}>
      {images?.map(({ path, _id }) => (
        <div
          className={`${styles["each-slide-card"]}  cursor-pointer max-h-[30rem] h-[22rem] overflow-hidden`}
          key={_id}
        >
          <div onClick={handleShowProduct}>
            <img src={path} alt="product"  width = "90%" height = "320" />
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default SliderProductCard;
