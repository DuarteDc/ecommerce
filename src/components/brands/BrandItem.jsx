import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux"
import { startFilterProductsPerBrandAndCategory } from "../../actions/categoryActions";

import { startLoadProductsPerBrand } from "../../actions/productsAction";

import { helpersProducts } from "../../helpers";

const BrandItem = ({ brand, setLoading, category }) => {

    const { filterSearch } = helpersProducts;

    const { filters } = useSelector(state => state.products);
    const { BrandFilters } = useSelector((state) => state.brands);

    const router = useRouter();

    const dispatch = useDispatch();

    const addBranInproducts = async () => {
        setLoading(true)
        const brandInFilter = filters.find(brandSelected => brandSelected._id === brand._id);
        if (brandInFilter) {
            setLoading(false)
            return;
        }
        await dispatch(startLoadProductsPerBrand(brand));
        filterSearch({ router, brand_id: brand._id })
        setLoading(false);
    }

    const addBranInCategory = async (category) => {
        setLoading(true)
        const brandInFilterFromCategory = BrandFilters.find(brandSelected => brandSelected._id === brand._id);
        if (brandInFilterFromCategory) {
            setLoading(false)
            return;
        }
        await dispatch(startFilterProductsPerBrandAndCategory(brand, category._id));
        filterSearch({ router, brand_id: brand._id })
        setLoading(false);
    }

    const handleAddBrand = async (category) => {

        if (router.route === '/productos') {
            await addBranInproducts()
            return;
        }
        await addBranInCategory(category);
    }


    return (

        <li className="hover:text-[#222] cursor-pointer mr-2 mt-2 transition-all duration-500 ease-out text-base text-gray-400 ml-6"
            onClick={() => handleAddBrand(category)}
        >
            {brand.name}
        </li>
    )
}

export default BrandItem