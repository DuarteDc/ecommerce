import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from './sliderProduct.module.css';

const ProductImageSlider = ({ path = '', _id = '', name = 'product name'}) => {
    return (
        <div className={`${styles["each-slide"]}`}>
            <div>
                <Zoom>
                    <img
                        src={path}
                        alt={name}
                        width="300"
                        height="300"
                        className="w-[18rem] h-[18rem]"
                    />
                </Zoom>
            </div>
        </div>
    )
}

export default ProductImageSlider