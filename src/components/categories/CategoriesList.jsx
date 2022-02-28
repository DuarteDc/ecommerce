
import CategoryItem from "./CategoryItem"

const CategoriesList = ({ categories }) => {

    return (
        <div className="mb-5">
            <p className="text-xl font-bold uppercase">Categorías</p>
            <hr className="w-28" />
            <ul className="relative">
                {
                    categories.map(category => (
                        <CategoryItem
                            category={category}
                            key={category._id}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default CategoriesList