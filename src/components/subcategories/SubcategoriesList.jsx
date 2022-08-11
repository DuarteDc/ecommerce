import { useState, useEffect } from 'react';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import SubcategoryItem from './SubcategoryItem';

import styles from '../styles.module.css'


const SubcategoriesList = ({ subcategories, startSearchByQueryParams, paramsFilters }) => {

    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (screen.width < 767) {
            setOpen(false);
        }
    }, []);

    return (
        <div className="mb-5">
            <div className="flex cursor-pointer justify-between"
                onClick={() => setOpen(!open)}
            >
                <p className="text-lg font-bold uppercase">
                    Subcategorías
                </p>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <ul className={`relative max-h-72 overflow-y-auto ${styles.scrollbar}`}>
                {
                    subcategories.map(subcategory => (
                        <Collapse in={open} timeout="auto" unmountOnExit
                            key={subcategory._id}
                        >
                            <SubcategoryItem
                                subcategory={subcategory}
                                setOpen={setOpen}
                                startSearchByQueryParams={startSearchByQueryParams}
                                paramsFilters={paramsFilters}
                            />
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    )
}

export default SubcategoriesList