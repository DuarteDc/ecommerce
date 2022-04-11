import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux"

import { startLoadProductsPerBrand } from "../../actions/productsAction";

import { helpersProducts } from "../../helpers";

const BrandItem = ({ brand, setLoading }) => {

    const { filterSearch } = helpersProducts;

    const { filters } = useSelector(state => state.products);

    const router = useRouter();

    const dispatch = useDispatch();

    const handleAddBrand = (brand) => {
        setLoading(true)
        const brandInFilter = filters.find(brandSelected => brandSelected._id === brand._id);

        if (brandInFilter) {
            setLoading(false)
            return;
        }

        dispatch(startLoadProductsPerBrand(brand));
        filterSearch({ router, brand_id: brand._id })

        setLoading(false);
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