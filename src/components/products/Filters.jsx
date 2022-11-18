import { useSelector } from "react-redux";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

const Filters = ({ starClearQueryParams, endpoint, removeQueryParam, filters }) => {

  const handleClearFilters = async () => {
    if (!filters.length) return;
    await starClearQueryParams(endpoint);
  };
  
  return (
    <div className="mb-5">
      <p className="text-lg font-bold uppercase text-xs md:text-sm">Seleccion actual</p>
      <div className="flex flex-row-reverse text-sm mt-4">
        <span
          className="inline-flex text-gray-500 hover:text-gray-800 cursor-pointer items-center"
          onClick={handleClearFilters}
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          <p>Limpiar todo</p>
        </span>
      </div>
      <div>
        {filters?.map((filter) => (
          <span
            className="hover:border-red-500 hover:text-[#333] cursor-pointer 
                            mr-2 mt-2 py-3 border-2 border-gray-200 px-4 relative
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
            key={filter?._id}
            onClick={() => removeQueryParam(filter, endpoint)}
          >
            <span className="absolute top-0 right-0">
              <CloseIcon style={{
                fontSize: 15,
                fontWeight: 600
              }}
                className="hover:text-red-600"
              />
            </span>
            {filter?.name || `$${filter?.min} - $${filter?.max}`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Filters;
