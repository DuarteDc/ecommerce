import React from 'react'
import { useDispatch } from "react-redux";
import { startLoadProductsPerCategory } from '../../actions/productsAction';

const CategoryItem = ({ category }) => {
    const dispatch = useDispatch();

    const handelAddCategory = (category) => {
        dispatch(startLoadProductsPerCategory(category))
    }
    return (
        <li className="hover:text-black cursor-pointer 
        mr-2 mt-2 py-2 transition-all duration-700 ease-out text-xs text-gray-500 ml-6"
            onClick={() => handelAddCategory(category)}
        >
            {category.name}
        </li>
    )
}

export default CategoryItem