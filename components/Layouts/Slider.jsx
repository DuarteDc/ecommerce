import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
const Slider = () => {
    return (
        <Carousel>
            <div>
                <img src="https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?format=jpg&quality=90&v=1614559651" alt="image1" />
                <p className="legend">Image 1</p>

            </div>
            <div>
                <img src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/12/online-shopping-products.png" alt="image2" />
                <p className="legend">Image 2</p>

            </div>
        </Carousel>
    )
}

export default Slider;