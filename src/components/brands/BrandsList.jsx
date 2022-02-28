import BrandItem from "./BrandItem"

const BrandsList = ({ brands }) => {
    return (
        <div className="mb-5">
            <p className="text-xl font-bold uppercase">Marcas</p>
            <hr className="w-28" />
            <ul className="relative">
                {
                    brands.map(brand => (
                        <BrandItem
                            brand={brand}
                            key={brand._id}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default BrandsList