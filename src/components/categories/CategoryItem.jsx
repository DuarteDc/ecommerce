
const CategoryItem = ({ category, startSearchByQueryParams, paramsFilters, dimensions, setOpen }) => {

    const handleFilterProducts = async (category) => {
        await startSearchByQueryParams({ category_id: category._id });
        paramsFilters(category);
        if (dimensions === 'sm') setOpen(false);
    }

    return (
        <li
            className="hover:text-[#222] text-xs md:text-sm cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => handleFilterProducts(category)}
        >
            <p>{category.name}</p>
        </li>
    )
}

export default CategoryItem