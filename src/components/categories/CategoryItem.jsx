
const CategoryItem = ({ category, startSearchByQueryParams, paramsFilters }) => {


    const handleFilterProducts = async (category) =>{
        startSearchByQueryParams({category_id: category._id});
        await paramsFilters(category);
    } 

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => handleFilterProducts(category)}
        >
            <p>{category.name}</p>
        </li>
    )
}

export default CategoryItem