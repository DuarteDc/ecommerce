import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import { clearAll, removeCategory, removeBrand } from '../../actions/productsAction';
import { useRouter } from "next/router";

const Filters = () => {

    const { categoriesSelected } = useSelector((state) => state.products);
    const { brandsSelected } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleRemoveCategory = (category) => {
        dispatch(removeCategory(category));
    }

    const handleRemoveBrand = (brand) => {
        dispatch(removeBrand(brand))
    }

    const handleClearFilters = () => {
        router.replace('/productos', undefined, { shallow: true });
        dispatch(clearAll());
    }

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
                    categoriesSelected?.map((param) => (
                        <span className="hover:border-black hover:text-black cursor-pointer 
                            mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                            key={param?._id}
                        >
                            {param?.name}
                            <CloseIcon className="hover:text-red-500" sx={{ fontSize: 15 }} onClick={() => handleRemoveCategory(param)} />
                        </span>
                    ))
                }
                {
                    brandsSelected?.map((param) => (
                        <span className="hover:border-black hover:text-black cursor-pointer 
                            mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                            key={param?._id}
                        >
                            {param?.name}
                            <CloseIcon className="hover:text-red-500" sx={{ fontSize: 15 }} onClick={() => handleRemoveBrand(param)} />
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

export default Filters;