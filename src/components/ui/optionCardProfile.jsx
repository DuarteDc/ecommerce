import Image from "next/image"

export const OptionCardProfile = ({title , icon , description}) =>{
    return(
        <div className="w-full py-5 pl-10 pr-5 flex border-[1px] border-solid border-[#D5D9D9] cursor-pointer hover:bg-[#eee]">
        <div>
         <Image
          src={icon}
          width={150}
          height={150}
         />
        </div>
         <div className="ml-4 w-full">
          <h3 className="font-Poppins font-semibold text-lg leading-8">{title}</h3>
          <p className="text-[#565959] text-sm">{description}</p>
         </div>
        </div>
    )
}