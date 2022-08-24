import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { selectedCountry } from '../../actions/countryAcctions';
import { clearDirection } from '../../actions/profileActions';

const FormCountry = ({ toggle, toggleSelectCountry, type = 1, setShowForm, setIsEditing }) => {

    const { countries, country } = useSelector(state => state.countries);
    const dispatch = useDispatch();

    const handleChangeCountry = ({ target }) => {
        dispatch(selectedCountry(target.value));
        if (type === 2) {
            toggle();
            toggleSelectCountry();
            return;
        }
        setShowForm(true);
        setIsEditing(false);
        dispatch(clearDirection())
        toggleSelectCountry();
    }

    return (
        <div className="font-Poppins">
            <h2 className="text-center font-semibold text-lg">Selecciona tu pais</h2>
            <FormControl className="w-full">
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="country"
                    value={country._id}
                    onChange={handleChangeCountry}
                >
                    {
                        countries.map(({ _id, name }) => (
                            <span
                                className="py-2 rounded-full hover:bg-red-300 px-5 my-1 cursor-pointer transition-all duration-700 ease-in-out"
                                key={_id}
                            >
                                <FormControlLabel value={_id} control={<Radio />} label={name} className="w-full" />
                            </span>
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default FormCountry