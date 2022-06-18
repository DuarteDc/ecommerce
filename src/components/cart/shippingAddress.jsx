import { useDispatch, useSelector } from "react-redux"

import { addShippingAddressSelected, removeAddressFromCart } from "../../actions/shoppingCartActions";

import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

export const ShippingAddress = ({ handleOpenFormAddress }) => {

    const dispatch = useDispatch();
    const { shippingAddress, addressSelected } = useSelector((state) => state.cart);

    const { logged } = useSelector(state => state.auth);

    const address = shippingAddress.map(address => {
        let add = {
            label: `${address.street} #${address.no_ext}, ${address.postalcode}, ${address?.state?.name || address?.state}`,
            value: address._id
        }
        return add;
    });

    const handleChangeAddress = (value) => {
        const shippingAddressSelected = shippingAddress.filter(shipping => shipping._id === value);
        if (shippingAddressSelected.length > 0) {
            dispatch(addShippingAddressSelected(shippingAddressSelected[0]));
        }
    }

    const handleRemoveAddress = () => {
        dispatch(removeAddressFromCart());
    }

    return (
        <>
            <div className="w-full">
                <span className="font-Poppins text-[15px] leading-[1.4] text-[#333]">
                    Dirección de Envío:
                </span>
            </div>
            <div className="w-full mt-1 flex items-center">
                {
                    Object.keys(addressSelected).length > 0 ? (
                        <p className="w-full font-semibold">{addressSelected.street} #{addressSelected.no_ext}, {addressSelected.postalcode}, {addressSelected?.state?.name}</p>
                    ) : (
                        <FormControl size="small" fullWidth>
                            <InputLabel id="demo-simple-select-label">Dirección de envío</InputLabel>
                            <Select
                                placeholder="Dirección de envío"
                                value={addressSelected}
                                label="Dirección de envío"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(event) => handleChangeAddress(event.target.value)}
                            >
                                {
                                    address.map(({ label, value }) => (
                                        <MenuItem key={label} value={value} className="truncate">{label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                }
                {!Object.keys(addressSelected).length ? (
                    <button
                        className="w-full bg-[#222] py-[5.5px] text-white ml-2 w-4/12 border-2 border-[#222]"
                        onClick={handleOpenFormAddress}
                    >
                        Agregar
                    </button>
                ) : (
                    <div onClick={handleRemoveAddress}>
                        <IconContext.Provider
                            value={{ className: "text-xl cursor-pointer ml-2 hover:text-red-600 " }}
                        >
                            <AiOutlineCloseCircle />
                        </IconContext.Provider>
                    </div>
                )
                }
            </div>
        </>
    )
}