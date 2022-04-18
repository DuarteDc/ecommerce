import { useDispatch, useSelector } from "react-redux"
import Select from "react-select";
import { addShippingAddressSelected } from "../../actions/shoppingCartActions";

export const ShippingAddress = () =>{
    const dispatch = useDispatch();
    const { shippingAddress } = useSelector((state)=>state.cart);

    const address = shippingAddress.map(address => {
        let add = {
            label:`${address.street} , ${address.municipality?.name} , ${address.state?.name}`,
            value:address._id
        }
        return add;
    });

    const handleChangeAddress = (value) =>{
        dispatch(addShippingAddressSelected(value));
    }

    return(
      <>
      <div className="w-full">
        <span className="font-Poppins text-[15px] leading-[1.4] text-[#333]">
            Dirección de Envío:
        </span>
        </div>
        <div className="w-full pr-[18px] mt-5">
          <Select
           placeholder="Selecciona una dirección envío"
           options={address}
           onChange={(value)=>handleChangeAddress(value)}
          />
        </div>
        </>
    )
}