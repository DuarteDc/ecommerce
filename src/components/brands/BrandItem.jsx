import { useDispatch } from "react-redux"
import { addBrandToParams } from "../../actions/productsAction";

const BrandItem = ({ brand }) => {
    const dispatch = useDispatch();
    const handleAddBrand = (brand) => {
        dispatch(addBrandToParams(brand));
    }
    return (
        <li className="hover:text-black cursor-pointer 
        mr-2 mt-2 py-2 transition-all duration-700 ease-out text-xs text-gray-500 ml-6"
            onClick={() => handleAddBrand(brand)}
        >
            {brand.name}
        </li>
    )
}

export default BrandItem