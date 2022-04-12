import { useState } from "react";
import { useRouter } from "next/router";

import { helpersProducts } from "../../helpers"
import { useDispatch, useSelector } from "react-redux";

import { startloadProductsPerTags } from '../../actions/productsAction';
import { startFilterProducts } from '../../actions/brandsActions';
import { startFilterProductsFromCategories } from "../../actions/categoryActions";

const TagItem = ({ tag, brand, setLoading }) => {
    const { category } = useSelector(state => state.categories);
    const { filters } = useSelector(state => state.products);

    const router = useRouter();
    const dispatch = useDispatch()

    const { filterSearch, getQueryParams } = helpersProducts;

    const handleFilterFromProducts = async (router, tag) => {

        const { filters } = useSelector(state => state.products);
        const tagInFilter = filters.find(tagSelected => tagSelected._id === tag._id);

        if (!tagInFilter) {
            await dispatch(startloadProductsPerTags(tag));
            filterSearch({ router, tag_id: tag._id })
            setLoading(false)
            return;
        }

        setLoading(false);
        return;
    }

    const handleFilterFromCategories = async (router, tag, category) => {


        filterSearch({ router, tag_id: tag._id, category_id: category._id })

        const count = await Object.keys(router.query).length - 1;
        const query = await getQueryParams(router.asPath);
        await dispatch(startFilterProductsFromCategories(query, count));
        setLoading(false)
        return;


        setLoading(false);

    }

    const handleFilterFromBrands = async (router, tag) => {

        const { filters } = useSelector(state => state.products);
        const tagInFilter = filters.find(tagSelected => tagSelected._id === tag._id);

        if (!tagInFilter) {
            await dispatch(startloadProductsPerTags(tag));
            filterSearch({ router, tag_id: tag._id })
            setLoading(false)
            return;
        }

        setLoading(false);
        return;
    }

    const handleFilterByTag = async (router, brand, tag) => {



        if (router.pathname === '/productos') {
            await handleFilterFromProducts()
            setLoading(false);
            return;
        }

        if (router.asPath.includes('/categorias')) {
            await handleFilterFromCategories(router, tag, category);
            setLoading(false);
            return;
        }
    }

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => { handleFilterFromCategories(router, tag, category) }}
        >
            <p>{tag.name}</p>
        </li>
    )
}

export default TagItem