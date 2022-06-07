import { useDispatch, useSelector } from "react-redux"
import Select from "react-select";
import { addShippingAddressSelected } from "../../actions/shoppingCartActions";

export const ShippingAddress = ({ handleOpenFormAddress }) => {

    const dispatch = useDispatch();
    const { shippingAddress } = useSelector((state) => state.cart);
    const { logged } = useSelector(state => state.auth);

    const address = shippingAddress.map(address => {
        let add = {
            label: `${address.street} , ${address.municipality?.name || address?.municipality} , ${address?.state?.name || address?.state}`,
            value: address._id
        }
        return add;
    });

    const handleChangeAddress = (value) => {
        const shippingAddressSelected = shippingAddress.filter(shipping => shipping._id === value.value);
        if (shippingAddressSelected.length > 0) {
            dispatch(addShippingAddressSelected(shippingAddressSelected[0]));
            return;
        }
    }

    return (
        <>
            <div className="w-full">
                <span className="font-Poppins text-[15px] leading-[1.4] text-[#333]">
                    Dirección de Envío:
                </span>
            </div>
            <div className="w-full mt-5 flex items-center">
                <Select
                    placeholder="Selecciona una dirección envío"
                    options={address}
                    onChange={(value) => handleChangeAddress(value)}
                />
                <button
                    className="w-full bg-[#222] py-[5.5px] text-white ml-2 w-4/12 border-2 border-[#222]"
                    onClick={handleOpenFormAddress}
                >
                    Agregar
                </button>
            </div>
        </>
    )
}