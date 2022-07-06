
const BrandItem = ({ brand, startSearchByQueryParams, paramsFilters }) => {

  const handleFilterProducts = async (brand) =>{
      await startSearchByQueryParams({brand_id: brand._id});
      await paramsFilters(brand);
  } 

  return (
    <li
      className="hover:text-[#222] cursor-pointer mr-2 mt-2 transition-all duration-500 ease-out text-base text-gray-400 ml-6"
      onClick={() => handleFilterProducts(brand)}
    >
      {brand.name}
    </li>
  );
};

export default BrandItem;
