
const BrandItem = ({ brand, startSearchByQueryParams, paramsFilters, dimensions, setOpen }) => {

  const handleFilterProducts = async (brand) => {
    await startSearchByQueryParams({ brand_id: brand._id });
    await paramsFilters({ ...brand, type: 2 });
    if (dimensions === 'sm') setOpen(false);
  }

  return (
    <li
      className="hover:text-[#222] text-xs md:text-sm cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
      onClick={() => handleFilterProducts(brand)}
    >
      {brand.name}
    </li>
  );
};

export default BrandItem;
