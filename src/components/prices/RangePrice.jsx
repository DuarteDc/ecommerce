import { useState } from "react";

import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RangePriceItem from "./RangePriceItem";

import styles from "../styles.module.css";

const prices = [
  { _id: "1", min: 0, max: 50 },
  { _id: "2", min: 50, max: 100 },
  { _id: "3", min: 100, max: 500 },
  { _id: "4", min: 500, max: 1000 },
  { _id: "5", min: 1000, max: 10000 },
];

const RangePrice = ({ startSearchByQueryParams, paramsFilters }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-5">
      <div
        className="flex cursor-pointer justify-between"
        onClick={() => setOpen(!open)}
      >
        <p className="text-lg font-bold uppercase">Precios</p>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <ul className={`relative max-h-60 overflow-y-auto ${styles.scrollbar}`}>
        {prices.map((price) => (
          <Collapse in={open} timeout="auto" unmountOnExit key={price._id}>
            <RangePriceItem 
              price={price} 
              startSearchByQueryParams={startSearchByQueryParams}
              paramsFilters={paramsFilters}
              />
          </Collapse>
        ))}
      </ul>
    </div>
  );
};

export default RangePrice;
