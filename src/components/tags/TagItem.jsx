import { useRouter } from "next/router";

import { helpersProducts } from "../../helpers"

import { startFilterProducts } from '../../actions/brandsActions';
import { useDispatch } from "react-redux";

const TagItem = ({ tag, brand }) => {

    const router = useRouter();

    const dispatch = useDispatch()

    const { filterSearch } = helpersProducts;

    const handleFilterByTag = async (router, brand, tag) => {

        await dispatch(startFilterProducts(brand._id, tag._id))
        filterSearch({ router, tag: tag._id })
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