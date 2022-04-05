import { useRouter } from 'next/router';

import { useDispatch, useSelector } from "react-redux";

import { startLoadProductsPerCategory } from '../../actions/productsAction';
import { helpersProducts } from '../../helpers';

const CategoryItem = ({ category }) => {

    const { filterSearch } = helpersProducts;

    const { categoriesSelected } = useSelector(state => state.products);

    const router = useRouter();

    const dispatch = useDispatch();

    const filterToCategory = (category_id, category_name) => {

        const categoriesInFilter = categoriesSelected.find(categorySelected => categorySelected._id === category_id);

        if (categoriesInFilter) {
            return;
        }

        dispatch(startLoadProductsPerCategory(category_id, category_name));
        filterSearch({ router, category: category_id })

    }

    const { _id, name } = category;

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => filterToCategory(_id, name)}
        >
            <p>{category.name} ({category.totalProducts})</p>  
        </li>
    )
}

export default CategoryItem