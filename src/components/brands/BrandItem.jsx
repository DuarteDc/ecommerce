
const BrandItem = ({ brand, startSearchByQueryParams }) => {
  return (
    <li
      className="hover:text-[#222] cursor-pointer mr-2 mt-2 transition-all duration-500 ease-out text-base text-gray-400 ml-6"
      onClick={() => startSearchByQueryParams({ brand_id: brand._id })}
    >
      {brand.name}
    </li>
  );
};

export default BrandItem;
