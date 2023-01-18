import { memo } from "react";
import { ProductCard } from "./productCard";

const ProductsMostSold = memo(({ productsMostSold }) => {

    return (
        <section className="px-30 pt-20 container mx-auto">
            <h1 className="font-semibold uppercase lg:text-4xl text-lg text-center mb-10 bg-gray-50 py-2 dark:bg-[#222] dark:text-white">Productos populares</h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {
                    productsMostSold.map((product) => (
                        <ProductCard
                            product={product.product}
                            key={product._id}
                        />
                    ))
                }
            </div>
        </section>
    )
});

export default ProductsMostSold;

ProductsMostSold.displayName = 'ProductsMostSold';