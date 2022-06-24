import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import BrandItem from './BrandItem';

import styles from '../styles.module.css'

const BrandsList = ({ brands, setLoading, category, startSearchByQueryParams }) => {

    const [open, setOpen] = useState(true);

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
            <ul className={`relative max-h-60 overflow-y-auto ${styles.scrollbar}`}>
                {
                    brands.map(brand => (
                        <Collapse in={open} timeout="auto" unmountOnExit
                            key={brand._id}
                        >
                            <BrandItem
                                brand={brand} setOpen={setOpen}
                                setLoading={setLoading}
                                category={category}
                                startSearchByQueryParams={startSearchByQueryParams}
                            />
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    );
}

export default BrandsList;