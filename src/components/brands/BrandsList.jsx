import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import BrandItem from './BrandItem';

const BrandsList = ({ brands }) => {
    
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-5">
            <div className="flex cursor-pointer justify-between"
                onClick={() => setOpen(!open)}
            >
                <p className="text-lg font-bold uppercase">
                    Marcas
                </p>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <ul className="relative">
                {
                    brands.map(brand => (
                        <Collapse in={open} timeout="auto" unmountOnExit
                            key={brand._id}
                        >
                            <BrandItem
                                brand={brand}
                            />
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    );
}

export default BrandsList;