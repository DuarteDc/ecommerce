import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import BrandItem from './BrandItem';

import styles from '../styles.module.css'

const BrandsList = ({ brands, category, startSearchByQueryParams, paramsFilters }) => {

    const [open, setOpen] = useState(true);

    const { dimensions } = useSelector(state => state.ui);

    useEffect(() => {
      if (dimensions === 'sm') return setOpen(false);
      setOpen(true);
    }, [dimensions]);

    return (
        <div className="mb-5">
            <div className="flex cursor-pointer justify-between"
                onClick={() => setOpen(!open)}
            >
                <p className="font-bold uppercase text-xs md:text-sm">
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
                                brand={brand} 
                                setOpen={setOpen}                                                                
                                category={category}
                                startSearchByQueryParams={startSearchByQueryParams}
                                paramsFilters={paramsFilters}
                                dimensions={dimensions}
                            />
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    );
}

export default BrandsList;