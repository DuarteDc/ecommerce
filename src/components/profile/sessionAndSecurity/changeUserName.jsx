import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material"
import { startUpdateDataUser } from "../../../actions/profileActions";
import { useState } from "react";

export const ChangeUserName = ({fullname ,userInfo, setUserInfo , toggle}) =>{
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.auth);
    const [error , setError] = useState(false);
    const handleChangeName = (e) =>{
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const handleSaveChangeName = (e) =>{
           e.preventDefault();
           if(!Object.keys(fullname).length){
              setError(true);
              return
           }
           setError(false);
           const formData = new FormData();
           formData.append("fullname",fullname)
           dispatch(startUpdateDataUser(formData));
           toggle();
    }

    const handleCancelChanges = () =>{
         setUserInfo({
             ...userInfo,
             fullname:user?.fullname
         });
        toggle();
    }

    return (
        <Grid container spacing={3} flex justifyContent="center" className="py-5">
             <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <TextField
                  name="fullname"
                  error={error}
                  required
                  fullWidth={true}
                  id="outlined-required"
                  label="Nombre de Usuario"
                  helperText={error?"El campo nombre es requerido":""}
                  defaultValue={fullname}
                  onChange={(e)=>handleChangeName(e)}
                />
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
               <button 
                className="rounded-none bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
                onClick={handleCancelChanges}
               >
                   Cancelar
               </button>
             </Grid>
             <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
               <button 
                className="rounded-none bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
                onClick={handleSaveChangeName}
               >
                   Guardar
               </button>
             </Grid>
        </Grid>
    )
}