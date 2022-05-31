import { useSelector } from "react-redux";
import { Slide } from 'react-slideshow-image';
import styles from './Slideshow.module.css'

export const Slider = () => {

  const { sliders } = useSelector((state) => state.sliders);

  const properties = {
    duration: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <Slide {...properties}>
      {sliders?.slider?.map((slideImage, index) => (
        <div className={styles["each-slide"]} key={index}>
          <div style={{
            'backgroundImage': `url(${slideImage.imageWeb})`,
          }}></div>
        </div>
      ))}
    </Slide>
  )
}