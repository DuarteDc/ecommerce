import { useSelector } from "react-redux"
import { ProductCard } from "./productCard";

export const ProductsMostSold = () => {

    const { productsMostSold } = useSelector(state => state.products);

    return (
        <section className="px-30 pt-20 container mx-auto">
            <h1 className="font-semibold uppercase lg:text-4xl text-lg text-center mb-10 bg-gray-50 py-2">Productos populares</h1>
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
}
