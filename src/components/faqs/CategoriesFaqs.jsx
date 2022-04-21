import { BiCategoryAlt } from "react-icons/bi"
import { IconContext } from "react-icons";
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from "react";

const CategoriesFaqs = ({ categories, faqActive, getFaqsPerCategoryId }) => {

    const [open, setOpen] = useState(true);

    return (
        <div className="lg:px-10 pt-10 mb-5">
            <div className="flex cursor-pointer justify-between"
                onClick={() => setOpen(!open)}
            >
                <p className="text-lg font-bold uppercase">Lista de contenido</p>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <ul className="relative">
                {
                    categories?.map(category => (
                        <Collapse in={open} timeout="auto" unmountOnExit
                            key={category._id}
                        >
                            <li
                                className="flex items-center cursor-pointer"
                                onClick={() => getFaqsPerCategoryId(category._id)}
                            >
                                <IconContext.Provider
                                    value={{ className: `text-[25px] text-[#888] ${category._id === faqActive ? "font-semibold text-black" : "text-gray-400"}` }}
                                >
                                    <BiCategoryAlt />
                                </IconContext.Provider>
                                <a
                                    className={`text-lg my-3 lg:my-4 px-2 ${category._id === faqActive ? "font-semibold text-black" : "text-gray-400 hover:text-[#222]"}`}>
                                    {category.name}
                                </a>
                            </li>
                        </Collapse>
                    ))
                }
            </ul>
        </div>
    )

    // return (
    //     // <div>
    //     //     <li
    //     //         className="flex items-center cursor-pointer"
    //     //         key={category._id}
    //     //         
    //     //     >
    //     //         <IconContext.Provider
    //     //             value={{ className: `text-[25px] text-[#888] ${category._id === faqActive ? "font-semibold text-black" : "text-gray-400"}` }}
    //     //         >
    //     //             <BiCategoryAlt />
    //     //         </IconContext.Provider>
    //     //         <a
    //     //             className={`text-lg my-1 lg:my-4 ${category._id === faqActive ? "font-semibold text-black" : "text-gray-400 hover:text-[#222]"}`}>
    //     //             {category.name}
    //     //         </a>
    //     //     </li>
    //     //     <Collapse in={open} timeout="auto" unmountOnExit
    //     //                     key={tag._id}
    //     //                 >
    //     //                     <TagItem tag={tag} brand={brand} setLoading={setLoading} />
    //     //                 </Collapse>
    //     // </div>
    // )
}

export default CategoriesFaqs