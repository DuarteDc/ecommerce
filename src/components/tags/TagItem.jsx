import { useRouter } from "next/router";

import { helpersProducts } from "../../helpers"
import { useDispatch, useSelector } from "react-redux";

import { startloadProductsPerTags } from '../../actions/productsAction';
import { startFilterProducts } from '../../actions/brandsActions';

const TagItem = ({ tag, brand, setLoading }) => {

    const router = useRouter();

    const dispatch = useDispatch()

    const { filterSearch } = helpersProducts;

    const { filters } = useSelector(state => state.products);

    const handleFilterByTag = async (router, brand, tag) => {

        setLoading(true);

        const tagInFilter = filters.find(tagSelected => tagSelected._id === tag._id);

        if (tagInFilter) {
            return;
        }


        if (router.pathname === '/productos') {
            await dispatch(startloadProductsPerTags(tag));
            filterSearch({ router, tag_id: tag._id })
            return;
        }

        // if (router.pathname === '/marcas') {
        //     console.log("hola xD")
        //     //await dispatch(startFilterProducts(brand._id, tag._id))
        //     //filterSearch({ router, tag: tag._id })
        // }
        setLoading(false)
    }

    return (
        <li
            className="hover:text-[#222] cursor-pointer mr-2 py-2 transition-all duration-500 ease-out text-gray-400 ml-6"
            onClick={() => { handleFilterByTag(router, brand, tag) }}
        >
            <p>{tag.name}</p>
        </li>
    )
}

export default TagItem