import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { clearAll } from "../../actions/categoryActions";

const CategoryFilters = ({ starClearQueryParams, endpoint }) => {

    const { filters } = useSelector((state) => state.products);

    const handleClearFilters = async () => {
        if(!filters.length) return;
        await starClearQueryParams(endpoint);
    };

    return (
        <div className="mb-5">
            <p className="uppercase font-bold text-lg">Seleccion actual</p>
            <div className="flex flex-row-reverse text-sm mt-4">
                <span className="inline-flex text-gray-500 hover:text-gray-800 cursor-pointer items-center"
                    onClick={handleClearFilters}
                >
                    <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                    <p>Limpiar todo</p>
                </span>
            </div>
            <div>
                {
                    filters?.map((filter) => (
                        <span className="hover:border-black hover:text-black cursor-pointer 
                        mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                        text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                            key={filter?._id}
                        >
                            {filter?.name || `$${filter?.min} - $${filter?.max}`}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryFilters