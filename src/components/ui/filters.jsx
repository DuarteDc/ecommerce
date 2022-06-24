import React, { useEffect, useState } from "react";

const order = [
  { name: "Precio: Bajo a Alto", value: "lowToHigh" },
  { name: "Precio: Alto a Bajo", value: "highToLow" },
];

const prices = [
  { min: 0, max: 50 },
  { min: 50, max: 100 },
  { min: 100, max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: 10000 },
];

export const FiltersArea = ({
  brands,
  openFilter,
  tags,
  brandQuery,
  tagQuery,
  priceQuery,
  orderBy,
  getDataToFilterTag,
  getDataToFilterBrand,
  getDataToFilterLowPrice,
  getDataToFilterOrder,
  startSearchByQueryParams,
}) => {
  return (
    <div
      className={`w-full py-[30px] ${
        openFilter ? "block" : "hidden"
      } animate__animated animate__zoomIn`}
    >
      <div className="grid-col-4 bg-[#f2f2f2] flex flex-wrap w-full px-10 pt-7">
        <div className="w-full lg:w-[25%] pr-2 pb-7">
          <div className="text-[#333] pb-[15px] font-Poppins font-semibold">
            {" "}
            Ordernar Por
          </div>
          <ul>
            {order.map((order, index) => (
              <li
                className="pb-[6px] cursor-pointer"
                key={index}
                onClick={() => startSearchByQueryParams({ order: order.value })
                }
              >
                <a
                  className={`${
                    orderBy === order.value ? "text-[#222]" : "text-[#aaa]"
                  } font-Poppins text-base leading-[1.2] border-b-[1px] border-b-solid border-transparent`}
                >
                  {order.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-[25%] pr-2 pb-7">
          <div className="text-[#333] pb-[15px] font-Poppins font-semibold">
            Precio
          </div>
          <ul>
            {prices.map((price, index) => (
              <li
                className="pb-[6px] cursor-pointer"
                key={index}
                onClick={() => getDataToFilterLowPrice(price.min, price.max)}
              >
                <a
                  className={`${
                    priceQuery.lowPrice === price.min &&
                    priceQuery.maxPrice === price.max
                      ? "text-[#222]"
                      : "text-[#aaa]"
                  } font-Poppins text-base leading-[1.2] border-b-[1px] border-b-solid border-transparent`}
                >
                  {`$${price.min} - $${price.max}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-[25%] pr-2 pb-7">
          <div className="text-[#333] mb-[15px] font-Poppins font-semibold">
            {" "}
            Marca
          </div>
          <ul>
            {brands.map((brand) => (
              <li
                className="pb-[6px] cursor-pointer"
                key={brand._id}
                onClick={() =>
                  startSearchByQueryParams({ brand_id: brand._id })
                }
              >
                <a
                  className={`${
                    brandQuery === brand._id ? "text-[#222]" : "text-[#aaa]"
                  } font-Poppins text-base leading-[1.2] border-b-[1px] border-b-solid border-transparent`}
                >
                  {brand.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-[25%] pr-2 pb-7">
          <div className="text-[#333] mb-[15px] font-Poppins font-semibold">
            {" "}
            Tags
          </div>
          <ul>
            {tags.map((tag) => (
              <li
                className="pb-[6px] cursor-pointer"
                key={tag._id}
                onClick={() => getDataToFilterTag(tag._id)}
              >
                <a
                  className={`${
                    tagQuery == tag._id ? "text-[#222]" : "text-[#aaa]"
                  } font-Poppins text-base leading-[1.2] border-b-[1px] border-b-solid border-transparent`}
                >
                  {tag.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
