import React from "react";
import { BsFilterSquareFill, BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";

export const Tabs = ({ tabActive, 
                       tabsData, 
                       handleResetData, 
                       handleSelectTab, 
                       filter, 
                       search,
                       handleOpenFilter,
                       handleOpenSearch,
                       tags
                       }) => {
  return (
    <div className="flex justify-between flex-wrap pb-12">
      <div className="flex flex-wrap justify-start items-center text-[#888]">
        <span
          className={`cursor-pointer border-solid font-Poppins text-medium leading-[1.2] hover:text-[#333] hover:border-[#797979] ${
            tabActive == null && "text-[#333] border-[#797979]"
          } border-b-[1px] border-transparent mx-1 mr-8  duration-[0.4s] transition-all`}
          onClick={() => handleResetData()}
        >
          Todos
        </span>
        {tabsData.map((tabData, index) => (
          <span
            className={`cursor-pointer border-solid font-Poppins text-medium leading-[1.9] hover:text-[#333] hover:border-[#797979] ${
              tabActive == index && "text-[#333] border-[#797979]"
            } border-b-[1px] border-transparent mx-1 mr-8  duration-[0.4s] transition-all`}
            key={tabData._id}
            onClick={() => handleSelectTab(index, tabData._id)}
          >
            {tabData.name}
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center my-3">
        {
          filter &&
        <div
          className="flex 
                        justify-center 
                        items-center 
                        font-Poppins 
                        text-[#888] 
                        text-base	
                        leading-[1.2] 
                        min-w-[100px]
                        h-10
                        mr-2
                        border-solid
                        border-[#e6e6e6]
                        border-[1px]	
                        rounded-[3px]
                        cursor-pointer
                        hover:text-luz
                        hover:bg-[#333]
                        duration-[0.4s] transition-all
                        "
                        onClick={handleOpenFilter}
        >
          <IconContext.Provider value={{ size: "15px", className: "mr-[6px]" }}>
            <BsFilterSquareFill />
          </IconContext.Provider>

          <span>Filtro</span>
        </div>
         }
         {
           search &&
        <div
          className="flex 
            justify-center 
            items-center 
            font-Poppins 
            text-[#888] 
            text-base 
            leading-[1.2]
            min-w-[100px]
            h-10
            border-solid
            border-[#e6e6e6]
            border-[1px]
            rounded-[3px]
            cursor-pointer
            hover:text-luz
            hover:bg-[#333]
            duration-[0.4s] transition-all
            "
            onClick={handleOpenSearch}
        >
          <IconContext.Provider value={{ size: "15px", className: "mr-[6px]" }}>
            <BsSearch />
          </IconContext.Provider>

          <span>Buscar</span>
        </div>
       }
      </div>
    </div>
  );
};

