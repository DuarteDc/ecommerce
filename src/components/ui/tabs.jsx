import React from 'react';

const Tabs = ({tabActive , tabsData , handleResetData , handleSelectTab}) => {
    return (
        <div className="flex justify-between flex-wrap pb-12">
                <div className="flex flex-wrap justify-start items-center">
                   <span 
                    className={`cursor-pointer border-solid ${tabActive == null && 'text-[#222] border-[#797979]'} border-b-[1px] border-transparent font-Poppins text-medium leading-[1.2] text-[#666] mx-1 mr-8 hover:text-[#222] hover:border-[#797979] duration-[0.4s] transition-all`}
                    onClick={()=>handleResetData()}
                   >
                     Todos
                   </span>
                   {
                       tabsData.map((tabData , index)=>(
                        <span className={`cursor-pointer border-solid border-b-[1px] ${tabActive === index && 'text-[#222] border-[#797979] '} border-transparent font-Poppins text-medium leading-[1.2] text-[#666] mx-1 mr-8 hover:text-[#222] hover:border-[#797979] duration-[0.4s] transition-all`}
                        key={tabData.id}
                        onClick={()=>handleSelectTab(index , tabData._id)}
                        >
                        {tabData.name}
                        </span> 
                       ))
                   }
                </div>
                <div>

                </div>
              </div>
    );
};

export default Tabs;