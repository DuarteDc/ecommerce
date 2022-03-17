import { useState } from 'react';

import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import CategoryItem from "./CategoryItem"
import { useDispatch } from 'react-redux';

import { addCategoryToParams } from '../../actions/productsAction';

const CategoriesList = ({ categories }) => {

    const [open, setOpen] = useState(true);

    const dispatch = useDispatch();

    

    return (
        <div className="mb-5">
            <div className="flex cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <p className="text-xl font-bold uppercase">Categorías</p>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <hr className="w-10" />
            <ul className="relative">
                {
                    categories?.map(category => (
                        <Collapse in={open} timeout="auto" unmountOnExit
                            key={category._id}
                        >
                            <CategoryItem
                                category={category}
                            />
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    )
}

export default CategoriesList