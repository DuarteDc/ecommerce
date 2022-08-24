import { useSelector, useDispatch } from 'react-redux';
import { helpers } from '../../helpers';


import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';


import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import ProductImageSlider from './ProductImageSlider';

const ProductDetail = () => {

    const { productDetail } = useSelector(state => state.orders);

    const dispatch = useDispatch()

    const { priceFormat } = helpers;

    const subtotal = priceFormat(productDetail.subtotal);
    const total = priceFormat(productDetail.total);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 font-Poppins flex items-center justify-center">
            <div className="overflow-hidden">
                <div>
                    <Slide>
                        {
                            productDetail?.product_id?.multimedia?.map(({ _id, path }) => (
                                <ProductImageSlider
                                    key={_id}
                                    path={path}
                                    _id={_id}
                                    name={productDetail.product_id.name}
                                />
                            ))
                        }
                    </Slide>
                </div>
            </div>
            <div className="col-span-2 md:pl-10 mt-5 md:mt-0 flex flex-col justify-center">
                <h2 className="text-2xl">{productDetail.product_id.name}</h2>
                <h3 className="mt-5 text-gray-500">{productDetail.product_id.description}</h3>
                <span className="flex items-center mt-2">
                    <p>Marca: </p>
                    <p className="ml-2 text-gray-500">{productDetail.product_id?.brand?.name}</p>
                </span>
                <span className="flex items-center my-2">
                    <p>SKU: </p>
                    <p className="ml-2 text-gray-500">{productDetail.product_id?.sku}</p>
                </span>
                <hr />
                <div className="mt-2">
                    <span className="flex items-center mt-2">
                        <p>Cantidad: </p>
                        <p className="ml-2 text-gray-500">{productDetail?.quantity} pzs</p>
                    </span>
                    <span className="flex items-center">
                        <p>Subtotal: </p>
                        <p className="ml-2 text-gray-500">{subtotal}</p>
                    </span>
                    <span className="flex items-center">
                        <p>Total: </p>
                        <p className="ml-2 text-gray-500">{total}</p>
                    </span>
                </div>
                {
                    productDetail?.canvasStatus && (
                        <div>
                            <hr />
                            <p className="my-2">Imágenes para tu canvas</p>
                            <div className="flex">
                                {
                                    productDetail.canvas_multimedia.map(({ _id, path }, index) => (
                                        <div className="flex flex-col justify-center items-center" key={_id}>
                                            <div className="border-2 border-red-600 mr-2 cursor-pointer overflow-hidden relative">
                                                <Zoom className="z-40 absolute">
                                                    <img
                                                        src={path}
                                                        alt="producto-canvas"
                                                        width="50"
                                                        className="p-0 overflow-hidden"
                                                        key={_id} />
                                                </Zoom>
                                            </div>
                                            <span className="text-xs my-1 flex items-center justify-center">{index + 1}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductDetail


