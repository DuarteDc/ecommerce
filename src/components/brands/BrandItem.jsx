import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux"

import { startLoadProductsPerBrand } from "../../actions/productsAction";
import { filterSearch } from "../../helpers/filterSearch";


const BrandItem = ({ brand }) => {

    const { brandsSelected } = useSelector(state => state.products);

    const router = useRouter();

    const dispatch = useDispatch();

    const handleAddBrand = (brand) => {

        const brandInFilter = brandsSelected.find(brandSelected => brandSelected._id === brand._id);

        if (brandInFilter) {
            return;
        }

        dispatch(startLoadProductsPerBrand(brand));
        filterSearch({ router, brand: brand._id })

    }


    return (

        <li className="hover:text-black cursor-pointer 
        mr-2 mt-2 py-2 transition-all duration-700 ease-out text-xs text-gray-500 ml-6"
            onClick={() => handleAddBrand(brand)}
        >
            {brand.name}
        </li>
    )
}

export default BrandItem