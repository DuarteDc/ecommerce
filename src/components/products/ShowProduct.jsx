import {  useState, useEffect } from "react";
import { getProduct } from "../../actions/productActions";

import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import LoadingIcon from "../LoadingIcon";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ProductDetails from "./ProductDetails";

const ShowProduct = ({ isOpen, closeModal, product_id }) => {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState(null);

    const loadProduct = async () => {
        const _product = await getProduct(product_id);
        setProduct(_product);
    }
    useEffect(() => {
        setLoading(true);
        loadProduct();
        setLoading(false);
    }, []);

    return (
        <section>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {
                    loading ? (
                        <Fade in={isOpen}>
                            <Box className="overflow-hidden drop-shadow-2xl w-11/12 md:w-4/12 rounded-xl border-2 mx-auto p-8 bg-white mt-5">
                                <LoadingIcon />
                            </Box>
                        </Fade>
                    ) : (
                        <Fade in={isOpen}>
                            <Box className="overflow-hidden drop-shadow-2xl w-11/12 md:w-8/12 rounded-xl border-2 mx-auto p-8 bg-white mt-5">
                                <span className="flex flex-row-reverse cursor-pointer" onClick={closeModal}>
                                    <CloseIcon />
                                </span>
                                <ProductDetails product={product}/>
                            </Box>
                        </Fade>
                    )
                }
            </Modal>
        </section >
    )
}

export default ShowProduct;

