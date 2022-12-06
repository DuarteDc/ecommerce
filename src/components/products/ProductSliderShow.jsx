import { useRef, useState } from 'react';

import Image from 'next/image';


import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import styles from './ProductSlideshow.module.css';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductSliderShow = ({ slideImages, product }) => {

    const slideRef = useRef();
    const [previousIndex, setPreviousIndex] = useState(null);
    const [nextIndex, setNextIndex] = useState(null);

    const handleChangeImage = (index) => {
        slideRef.current.goTo(parseInt(index, 10));
    }

    const properties = {
        autoplay: false,
        indicators: true,
        onChange: (previous, next) => {
            setPreviousIndex(previous);
            setNextIndex(next);
        }
    };

    return (
        <>
            <Slide {...properties} ref={slideRef}>
                {slideImages.map((slideImage, index) => (
                    <div className={`${styles["each-slide"]} w-full h-full`} key={index + 1}>
                        <div>
                            <Zoom zoomMargin={45}>
                                <picture>
                                    <img src={slideImage.path} alt={product.name}  width="auto" height="auto" loading="lazy" />
                                </picture>
                            </Zoom>
                        </div>
                    </div>
                ))}
            </Slide>
            <div className="flex mt-2">
                {
                    product?.multimedia.map((multimedia, index) => (
                        <div key={index}
                            className="overflow-hidden border-2 border-gray-300 w-24 h-24 mr-2 cursor-pointer"
                        >  
                            <img
                                src={multimedia?.images?.original}
                                alt={product.name}
                                onClick={e => handleChangeImage(index)}
                                className="w-full h-full object-fill"
                                width={200}
                                height={200}
                                loading="lazy"
                            />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ProductSliderShow