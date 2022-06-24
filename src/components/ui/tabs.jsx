import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";

export const Tabs = ({
  tabsData,
  handleSelectTab,
  search,
  handleOpenSearch,
  queryParams,
}) => {
  return (
    <div className="flex justify-between flex-wrap pb-12">
      <div className="flex flex-wrap justify-start items-center text-[#888]">
        {tabsData.map(({ _id, name }) => (
          <span
            className={`cursor-pointer border-solid font-Poppins text-medium leading-[1.9] hover:text-[#333] hover:border-[#797979] ${
              queryParams.includes(_id) && "text-[#333] border-[#797979]"
            } border-b-[1px] border-transparent mx-1 mr-8  duration-[0.4s] transition-all`}
            key={_id}
            onClick={() => handleSelectTab(_id)}
          >
            {name}
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center my-3">
        {search && (
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
            <IconContext.Provider
              value={{ size: "15px", className: "mr-[6px]" }}
            >
              <BsSearch />
            </IconContext.Provider>

            <span>Buscar</span>
          </div>
        )}
      </div>
    </div>
  );
};
