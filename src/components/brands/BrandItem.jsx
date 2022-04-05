import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux"

import { startLoadProductsPerBrand } from "../../actions/productsAction";

import { helpersProducts } from "../../helpers";

const BrandItem = ({ brand }) => {

    const {filterSearch} = helpersProducts;

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

        <li className="hover:text-[#222] cursor-pointer mr-2 mt-2 transition-all duration-500 ease-out text-base text-gray-400 ml-6"
            onClick={() => handleAddBrand(brand)}
        >
            {brand.name}
        </li>
    )
}

export default BrandItem