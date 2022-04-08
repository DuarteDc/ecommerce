import { useRouter } from 'next/router';

import { useDispatch, useSelector } from "react-redux";
import { startFilterProductsPerBrandAndCategory } from '../../actions/brandsActions';

import { startLoadProductsPerCategory } from '../../actions/productsAction';
import { helpersProducts } from '../../helpers';

const CategoryItem = ({ category, setLoading, brand }) => {

    const { filterSearch } = helpersProducts;

    const { filters } = useSelector(state => state.products);
    const { filtersBrand } = useSelector(state => state.brands);

    const router = useRouter();

    console.log(router);
    const dispatch = useDispatch();

    const filterToCategory = async (category) => {

        setLoading(true)

        const categoriesInFilter = filters.find(categorySelected => categorySelected._id === category._id);
        const categoriesInFilterBrand = filtersBrand.find(categorySelected => categorySelected._id === category._id);


        if (!categoriesInFilter) {
            if (router.pathname.includes('/productos')) {
                await dispatch(startLoadProductsPerCategory(category));
                filterSearch({ router, category_id: category._id });
                setLoading(false);
                return;
            }
        }

        if (!categoriesInFilterBrand) {
            if (router.pathname.includes('/marcas')) {
                await dispatch(startFilterProductsPerBrandAndCategory(brand._id, category));
                filterSearch({ router, category_id: category._id });
                setLoading(false);
                return;
            }
        }


    }

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => filterToCategory(category)}
        >
            <p>{category.name} ({category.totalProducts})</p>
        </li>
    )
}

export default CategoryItem