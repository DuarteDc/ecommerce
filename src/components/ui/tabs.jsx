import SearchIcon from '@mui/icons-material/Search';

export const Tabs = ({
  tabsData,
  handleSelectTab,
  search,
  handleOpenSearch,
  queryParams,
}) => {
  return (
    <div className="flex justify-between flex-wrap pb-10">
      <div className="flex flex-wrap justify-start items-center text-lg text-[#888]">
        {tabsData.map(({ _id, name }) => (
          <span key={_id} className='font-sans text-xl text-pink-500 font-normal hover:font-semibold'>
            {name}
          </span>
          // <span
          //   className={`cursor-pointer border-solid font-Poppins text-medium leading-[1.9] hover:text-[#D80D82] hover:border-[#D80D82] ${
          //     queryParams.includes(_id) && "text-[#D80D82] border-[#D80D82]"
          //   } border-b-[1px] border-transparent mx-1 mr-8  duration-[0.1s] transition-all`}
          //   key={_id}
          //   onClick={() => handleSelectTab(_id)}
          // >
          //   {name}
          // </span>
        ))}
      </div>

    
      {/* <div className="flex justify-center items-center my-3">
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
            <SearchIcon  className="mr-[6px]"/>
            <span>Buscar</span>
          </div>
        )}
      </div> */}
    </div>
  );
};
