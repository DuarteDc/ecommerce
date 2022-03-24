import { useRouter } from 'next/router';
import React from 'react'

import { useDispatch } from "react-redux";

import { startFilterProductsPerBrandAndCategory } from '../../actions/brandsActions';

const CategoryItem = ({ category, brand_id }) => {

    const router = useRouter();

    const dispatch = useDispatch();

    const filterToCategory = (brand_id, category_id, category_name) => {
        dispatch(startFilterProductsPerBrandAndCategory(brand_id, category_id, category_name));
    }

    const { _id, name } = category;

    return (
        <li
            className="hover:text-black cursor-pointer mr-2 mt-2 py-2 transition-all duration-700 ease-out text-xs text-gray-500 ml-6"
            onClick={() => filterToCategory(brand_id, _id, name)}
        >
            {category.name}
        </li>
    )
}

export default CategoryItem