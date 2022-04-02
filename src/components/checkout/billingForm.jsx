export const BillingForm = () =>{
    return (
        <>
        <h3 className="font-Poppins text-[20px] font-semibold leading-[1.4] text-[#333] text-center mb-6">
                         ¿Deseas Facturar?
                     </h3>
                     <div className="grid grid-col-1">
                      <div className="px-[60px]">
                        <div className="w-full mb-[20px] block">
                            <label className="block text-[#333] mb-[8px] text-[14px] font-Poppins">
                                Nombre físcal:
                            </label>
                            <input 
                               type="text" 
                               placeholder="Agrega Nombre Fiscal o Razón Social"
                               className="bg-transparent border-[1px] border-solid border-[#eee] w-full h-[45px] py-0 px-[15px] text-[14px] leading-normal text-[#333] rounded-none transition-all outline-none"
                            />
                        </div>
                        <div className="w-full mb-[20px] block">
                            <label className="block text-[#333] mb-[8px] text-[14px] font-Poppins">
                                RFC:
                            </label>
                            <input 
                              type="text" 
                              placeholder="Agrega un RFC valido"
                              className="bg-transparent border-[1px] border-solid border-[#eee] w-full h-[45px] py-0 px-[15px] text-[14px] leading-normal text-[#333] rounded-none transition-all outline-none"
                            />
                        </div>
                        <div className="w-full mb-[20px] block">
                            <label className="block text-[#333] mb-[8px] text-[14px] font-Poppins">Regimen Fiscal:</label>
                            <input 
                               type="text" 
                               placeholder="Selecciona tu regimen fiscal" 
                               className="bg-transparent border-[1px] border-solid border-[#eee] w-full h-[45px] py-0 px-[15px] text-[14px] leading-normal text-[#333] rounded-none transition-all outline-none"
                            />
                        </div>
                        <div className="w-full mb-[20px] block">
                            <label className="block text-[#333] mb-[8px] text-[14px] font-Poppins"> Nombre y/o Razón Social:</label>
                            <input 
                               type="text" 
                               placeholder="Agrega Nombre Fiscal o Razón Social" 
                               className="bg-transparent border-[1px] border-solid border-[#eee] w-full h-[45px] py-0 px-[15px] text-[14px] leading-normal text-[#333] rounded-none transition-all outline-none"
                            />
                        </div>
                        <div className="w-full mb-[20px] flex">
                           <div className="w-[50%]">
                           <label className="block text-[#333] mb-[8px] text-[14px] font-Poppins"> Correo Electronico:</label>
                           <input 
                               type="text" 
                               placeholder="Agrega Nombre Fiscal o Razón Social" 
                               className="bg-transparent border-[1px] border-solid border-[#eee] w-[95%] h-[45px] py-0 px-[15px] text-[14px] leading-normal text-[#333] rounded-none transition-all outline-none mr-[10px]"
                            /> 
                           </div>
                           <div className="w-[50%]">
                           <label className="block text-[#333] mb-[8px] text-[14px] font-Poppins"> Teléfono:</label>
                           <input 
                               type="text" 
                               placeholder="Agrega Nombre Fiscal o Razón Social" 
                               className="bg-transparent border-[1px] border-solid border-[#eee] w-full h-[45px] py-0 px-[15px] text-[14px] leading-normal text-[#333] rounded-none transition-all outline-none"
                            />
                           </div>
                        </div>
                        </div>
                     </div></>
    )
}