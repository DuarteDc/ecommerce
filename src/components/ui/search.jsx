
import SearchIcon from '@mui/icons-material/Search';

export const Search = ({openSearch ,
                        placeholder,
                        setQuery,
                        onRequestSearch}) => {
    return (
        <div className={`w-full py-4 ${openSearch ? 'block' : 'hidden' } animate__animated animate__zoomIn`}> 
            <div className="w-full border-solid rounded-sm flex border-[1px] border-[#e6e6e6] pl-4">
              <button 
                className="w-[38px] h-[60px] text-[#333] flex justify-center items-center text-sm cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0"
                onClick={onRequestSearch}
              >
                  <SearchIcon />
              </button>
              <form onSubmit={onRequestSearch}  className="w-full">
                <input 
                  type="text" 
                  placeholder={placeholder} 
                  className="w-full h-[68px] font-Poppins text-medium leading-[1.6] text-[#333] pr-4 border-0 border-transparent outline-0"
                  onChange={(e)=>setQuery(e.target.value)}
                />
              </form>
            </div>
        </div>
    );
};
