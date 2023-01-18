import { useState, memo } from 'react';
import Image from 'next/image';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SelectCurrency = memo(({ currencies, onChange, value }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="-mr-4 md:mr-1">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                title="Pais"
                className="p-0"
            >
                <img src={value.image} width="20" height="10" className="mr-2" alt="pais" />
                <KeyboardArrowDownIcon
                    className="dark:text-white"
                    sx={{
                        color: '#333',
                        fontSize: 20
                    }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className="py-0 my-0"
            >
                {
                    currencies.map(({ currency, image }) => (
                        <MenuItem
                            onClick={(e) => { handleClose(e); onChange(currency, image) }}
                            key={currency}
                            className="dark:bg-[#333]"

                        >
                            <Image src={image} width="20" height="10" className="mr-2" alt="pais" /> {currency}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
});

export default SelectCurrency
SelectCurrency.displayName = 'SelectCurrency';