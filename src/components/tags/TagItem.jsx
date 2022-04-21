import { useRouter } from "next/router";

import { helpersProducts } from "../../helpers"
import { useDispatch, useSelector } from "react-redux";

import { startloadProductsPerTags } from '../../actions/productsAction';
import { startloadProductsPerTagsInCategory } from "../../actions/categoryActions";
import { startloadProductsPerTagsInBrand } from "../../actions/brandsActions";

const TagItem = ({ tag, brand, setLoading }) => {

    const { categoryFilters } = useSelector(state => state.categories);
    const { filters } = useSelector(state => state.products);
    const { BrandFilters } = useSelector(state => state.brands);
    
    const { filterSearch } = helpersProducts;

    const router = useRouter();
    const dispatch = useDispatch()

    const handleFilterFromProducts = async (router, tag) => {
        setLoading(true);
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

    const handleFilterFromCategories = async (router, tag) => {
        setLoading(true);
        const tagInFilter = categoryFilters.find(tagSelected => tagSelected._id === tag._id);

        if (!tagInFilter) {
            await dispatch(startloadProductsPerTagsInCategory(tag));
            filterSearch({ router, tag_id: tag._id })
            setLoading(false)
            return;
        }

        setLoading(false);
        return;
    }

    const handleFilterFromBrands = async (router, tag) => {
        setLoading(true);
        const tagInFilter = BrandFilters.find(tagSelected => tagSelected._id === tag._id);

        if (!tagInFilter) {
            await dispatch(startloadProductsPerTagsInBrand(tag));
            filterSearch({ router, tag_id: tag._id })
            setLoading(false)
            return;
        }

        setLoading(false);
        return;
    }

    const handleFilterByTag = async (router, tag) => {


        if (router.pathname === '/productos') {
            await handleFilterFromProducts(router, tag)
            setLoading(false);
            return;
        }

        if (router.route.includes('/categorias')) {
            await handleFilterFromCategories(router, tag);
            setLoading(false);
            return;
        }


        if (router.route.includes('/marcas')) {
            await handleFilterFromBrands(router, tag);
            setLoading(false);
            return;
        }
    }

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => { handleFilterByTag(router, tag) }}
        >
            <p>{tag.name}</p>
        </li>
    )
}

export default TagItem