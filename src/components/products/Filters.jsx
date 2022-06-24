import { useDispatch, useSelector } from "react-redux";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";

import { clearAll, removeItemFromFilters } from "../../actions/productsAction";
import { useRouter } from "next/router";

const Filters = ({ starClearQueryParams, endpoint }) => {

console.log(endpoint)
  const { filters } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleRemoveFilter = (filter) => {
    const asArray = Object.entries(router.query);
    const newQuerys = asArray.filter(([key, value]) => value !== filter._id);
    const justStrings = Object.fromEntries(newQuerys);
    router.push({ pathname: "/productos", query: justStrings }, undefined, {
      shallow: true,
    });
    dispatch(removeItemFromFilters(filter));
  };

  const handleClearFilters = async (endpoint) => {
    alert(endpoint)
    // router.push("/productos", undefined, { shallow: true });
    await starClearQueryParams(endpoint);
  };

  return (
    <div className="mb-5">
      <p className="uppercase font-bold text-lg">Seleccion actual</p>
      <div className="flex flex-row-reverse text-sm mt-4">
        <span
          className="inline-flex text-gray-500 hover:text-gray-800 cursor-pointer items-center"
          onClick={()=>{handleClearFilters(endpoint)}}
        >
          <DeleteOutlineIcon sx={{ fontSize: 18 }} />
          <p>Limpiar todo</p>
        </span>
      </div>
      <div>
        {filters?.map((filter) => (
          <span
            className="hover:border-black hover:text-black cursor-pointer 
                            mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
            key={filter?._id}
          >
            {filter?.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Filters;
