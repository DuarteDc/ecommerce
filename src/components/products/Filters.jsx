import { memo } from "react";

import { useDispatch, useSelector } from "react-redux";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import { clearAll, removeItemFromFilters } from '../../actions/productsAction';
import { useRouter } from "next/router";

const Filters = () => {

    const { filters } = useSelector((state) => state.products);

    const { filtersBrand } = useSelector((state) => state.brands);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleRemoveFilter = (filter) => {
        const asArray = Object.entries(router.query);
        const newQuerys = asArray.filter(([key, value]) => value !== filter._id);
        const justStrings = Object.fromEntries(newQuerys);
        router.push({ pathname: '/productos', query: justStrings }, undefined, { shallow: true });
        dispatch(removeItemFromFilters(filter))
    }

    const handleClearFilters = () => {
        if (router.asPath.includes('/productos')) {
            router.replace('/productos', undefined, { shallow: true });
            dispatch(clearAll());
            return;
        }
        if (router.asPath.includes('/marcas')) {
            router.replace('/marcas', undefined, { shallow: true });
            dispatch(clearAll());
            return;
        }

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
                {router.asPath.includes('/productos') ?
                    (
                        filters?.map((filter) => (
                            <span className="hover:border-black hover:text-black cursor-pointer 
                            mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                                key={filter?._id}
                            >
                                {filter?.name}
                                <CloseIcon className="hover:text-red-500" sx={{ fontSize: 15 }} onClick={() => handleRemoveFilter(filter)} />
                            </span>
                        ))
                    ) :
                    (
                        filtersBrand?.map((filter) => (
                            <span className="hover:border-black hover:text-black cursor-pointer 
                            mr-2 mt-2 py-2 border-2 border-gray-200 px-2
                            text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                                key={filter?._id}
                            >
                                {filter?.name}
                                <CloseIcon className="hover:text-red-500" sx={{ fontSize: 15 }} onClick={() => handleRemoveFilter(filter)} />
                            </span>
                        ))
                    )

                }
            </div>
        </div>
    )
}

export default Filters;