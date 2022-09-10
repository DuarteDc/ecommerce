

const SelectCurrency = ({ currencies, onChange, value }) => {
    return (
        <select onChange={onChange} value={value} >
            {
                currencies.map(({ currency, image }) => (
                    <option style={{ backgroundImage: `url(${image})` }}>{currency}</option>
                ))
            }
        </select>
    )
}

export default SelectCurrency