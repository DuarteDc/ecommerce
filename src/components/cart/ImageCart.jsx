import React from 'react'

const ImageCart = () => {
    return (
        <div className="flex flex-col items-center absolute bottom-1/4 md:bottom-2/4">
            <img src="/assets/images/shop-cart.png" alt="shop-cart" className="w-96" />
            <p className="font-bold">No hay productos en el carrito</p>
        </div>
    )
}

export default ImageCart