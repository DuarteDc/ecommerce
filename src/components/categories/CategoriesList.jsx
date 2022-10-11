import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import CategoryItem from "./CategoryItem";
import styles from "../styles.module.css";

const CategoriesList = ({ categories, startSearchByQueryParams, paramsFilters }) => {

  const [open, setOpen] = useState(true);

  const { dimensions } = useSelector(state => state.ui);

  useEffect(() => {
    if (dimensions === 'sm') return setOpen(false);
    setOpen(true);
  }, [dimensions]);

  return (
    <div className={`mb-5`}>
      <div
        className={`flex cursor-pointer justify-between`}
        onClick={() => setOpen(!open)}
      >
        <p className="text-lg font-bold uppercase text-xs md:text-sm">Categorías</p>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <ul className={`relative max-h-60 overflow-y-auto ${styles.scrollbar}`}>
        {categories?.map((category) => (
          <Collapse in={open} timeout="auto" unmountOnExit key={category._id}>
            <CategoryItem
              category={category}
              paramsFilters={paramsFilters}
              startSearchByQueryParams={startSearchByQueryParams}
              setOpen={setOpen}
              dimensions={dimensions}
            />
          </Collapse>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
