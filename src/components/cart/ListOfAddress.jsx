import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';

import { startGetDirections } from '../../actions/shoppingCartActions';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const ListOfAddress = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const loadAddress = async () => {
        setLoading(true);
        const token = Cookies.get('token');
        await dispatch(startGetDirections(token))
        setLoading(false);
    }

    useEffect(() => {
        loadAddress();
    }, []);

    const { shippingAddress } = useSelector(state => state.cart);

    return (
        <div className="w-full">
            <p className="text-center font-semibold uppercase">Selecciona tu dirección de envío</p>
            <FormControl className="w-full">
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="country"
                >
                    {
                        shippingAddress.map(({ _id, name, street, postalcode, no_ext }) => (
                            <span
                                className="py-2 rounded-full hover:bg-gray-50 px-5 my-1 cursor-pointer transition-all duration-700 ease-in-out"
                                key={_id}
                            >
                                <FormControlLabel value={_id} control={<Radio />} label={`${name}, ${street} #${no_ext}, ${postalcode}`} className="w-full" />
                            </span>
                        ))
                    }
                </RadioGroup>
                <span className="w-full py-3 text-center bg-[#333] text-white font-semibold mt-2 cursor-pointer rounded-full">
                    Continuar
                </span>
            </FormControl>
        </div>
    )
}

export default ListOfAddress