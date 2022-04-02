import { useRouter } from 'next/router';
import React from 'react'

import { useDispatch, useSelector } from "react-redux";

import { startLoadProductsPerCategory } from '../../actions/productsAction';
import { filterSearch } from '../../helpers/filterSearch';

const CategoryItem = ({ category }) => {

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
            className="hover:text-black cursor-pointer mr-2 mt-2 py-2 transition-all duration-700 ease-out text-xs text-gray-500 ml-6"
            onClick={() => filterToCategory( _id, name)}
        >
            {category.name}
        </li>
    )
}

export default CategoryItem