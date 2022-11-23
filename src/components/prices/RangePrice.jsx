import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RangePriceItem from "./RangePriceItem";

import styles from "../styles.module.css";

const RangePrice = ({ startSearchByQueryParams, paramsFilters, currencyPrices }) => {

  const [open, setOpen] = useState(true);
  const { dimensions } = useSelector(state => state.ui);

  useEffect(() => {
    if (dimensions === 'sm') return setOpen(false);
    setOpen(true);
  }, [dimensions]);


  return (
    <div className="mb-5">
      <div
        className="flex cursor-pointer justify-between"
        onClick={() => setOpen(!open)}
      >
        <p className="font-bold uppercase text-xs md:text-sm">Precios</p>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      <ul className={`relative max-h-60 overflow-y-auto ${styles.scrollbar}`}>
        {currencyPrices.prices.map((price) => (
          <Collapse in={open} timeout="auto" unmountOnExit key={price._id}>
            <RangePriceItem
              price={price}
              startSearchByQueryParams={startSearchByQueryParams}
              paramsFilters={paramsFilters}
              setOpen={setOpen}
              dimensions={dimensions}
            />
          </Collapse>
        ))}
      </ul>
    </div>
  );
};

export default RangePrice;
