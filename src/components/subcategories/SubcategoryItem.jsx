
const SubcategoryItem = ({ subcategory, startSearchByQueryParams, paramsFilters, dimensions, setOpen }) => {


  const handleFilterProducts = async (subcategory) =>{
    await startSearchByQueryParams({subcategory_id: subcategory._id});
    await paramsFilters(subcategory);
    if (dimensions === 'sm') setOpen(false);
  } 

  return (
    <li
    className="hover:text-[#222] text-xs md:text-sm cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
      onClick={() => handleFilterProducts(subcategory)}
    >
      {subcategory.name}
    </li>
  );
};

export default SubcategoryItem;
