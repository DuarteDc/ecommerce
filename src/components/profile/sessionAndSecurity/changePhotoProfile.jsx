import { useRef } from "react";
import { Grid, Typography } from "@mui/material"
import Image from "next/image";

export const ChangePhotoProfile = ({isLoadImage , urlPhoto , handleChangeImage , handleSavePhotoImage}) =>{
    const inputImageRef = useRef();

    const handleClickInputImage = () =>{
        inputImageRef.current.click();
    }

    return (
        <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                       <Typography variant="subtitle1" className="text-center">
                           Cambiar Foto de Perfil
                       </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="flex justify-center">
                            {
                                    isLoadImage && 
                                    <span  className="relative m-auto text-[#008cdd]">
                                        Cargando imagen...
                                    </span>
                            }
                            {
                                !isLoadImage &&
                                <Image
                                 src={urlPhoto}
                                 width={150}
                                 height={150}
                                />
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="flex justify-center">
                          <button 
                           className="bg-[#ff9100] text-luz py-2 px-10 w-[50%]"
                           onClick={()=>handleClickInputImage()}
                          >
                               Subir Imagen
                          </button>   
                          <input 
                             type="file" 
                             className="hidden" 
                             ref={inputImageRef}
                             onChange={(e)=>handleChangeImage(e)}
                          />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="flex justify-center">
                          <button 
                             className="bg-[#01579b] text-luz py-2 px-10 w-[50%]"
                             onClick={()=>handleSavePhotoImage()}
                          >
                                Guardar
                          </button>   
                        </div>
                    </Grid>
                  </Grid>
    )
}