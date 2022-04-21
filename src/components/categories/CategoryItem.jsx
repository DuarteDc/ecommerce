import { useRouter } from 'next/router';

import { useDispatch, useSelector } from "react-redux";
import { startFilterProductsPerBrandAndCategory } from '../../actions/brandsActions';

import { startLoadProductsPerCategory } from '../../actions/productsAction';
import { helpersProducts } from '../../helpers';

const CategoryItem = ({ category, setLoading, brand }) => {

    const { filterSearch } = helpersProducts;

    const { filters } = useSelector(state => state.products);
    const { BrandFilters } = useSelector(state => state.brands);

    const router = useRouter();

    const dispatch = useDispatch();


    const addCategoryInProducts = async (category) => {
        setLoading(true);
        const categoriesInFilter = filters.find(categorySelected => categorySelected._id === category._id);

        if (categoriesInFilter) {
            setLoading(false);
            return;
        }
        await dispatch(startLoadProductsPerCategory(category));
        filterSearch({ router, category_id: category._id });
        setLoading(false);
        return;
    }

    const addCategoryInBrands = async (brand, category) => {
        setLoading(true);
        const categoriesInFilter = BrandFilters.find(categorySelected => categorySelected._id === category._id);

        if (categoriesInFilter) {
            setLoading(false);
            return;
        }
        await dispatch(startFilterProductsPerBrandAndCategory(brand, category));
        filterSearch({ router, category_id: category._id });
        setLoading(false);
        return;
    }

    const filterToCategory = async (brand, category) => {
        if (router.route === ('/productos')) {
            await addCategoryInProducts(category)
            return;
        }
        await addCategoryInBrands(brand, category);
    }

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => filterToCategory(brand, category)}
        >
            <p>{category.name}</p>
        </li>
    )
}

export default CategoryItem