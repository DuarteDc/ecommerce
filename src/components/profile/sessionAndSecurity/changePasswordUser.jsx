import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material"
import { startUpdateDataUser, startUpdatedPasswordClient } from "../../../actions/profileActions";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

export const ChangePasswordProfile = ({toggle}) =>{
    const dispatch = useDispatch();
    
    const initialValues = {
      actual_password: '',
      new_password: '',
      confirm_new_password:''

    }

    const validationSchema = {
      actual_password: Yup.string().required("La contraseña actual es requerida"),
      new_password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida"),
      confirm_new_password:Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Las contraseñas no coinciden')
  }

  const formik = useFormik({
      initialValues,
      validationSchema: Yup.object(validationSchema),
      onSubmit: (formData) => {
        handleSaveChangePassword(formData);
      }
  });



    const handleSaveChangePassword = (formData) =>{

            dispatch(startUpdatedPasswordClient(formData));
            toggle();
    }

    const handleCancelChanges = () =>{
        toggle();
    }

    return (
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} flex justifyContent="center" className="py-5">
             <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <TextField
                  name="actual_password"
                  type="password"
                  error={formik.touched.actual_password && formik.errors.actual_password ? true :false}
                  required
                  fullWidth={true}
                  id="outlined-required"
                  label="Ingresa tu contraseña actual"
                  helperText={formik.touched.actual_password && formik.errors.actual_password ? formik.errors.actual_password : ''}
                  onChange={formik.handleChange}
                />
             </Grid>
             <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <TextField
                  name="new_password"
                  error={formik.touched.new_password && formik.errors.new_password ? true : false}
                  type="password"
                  required
                  fullWidth={true}
                  id="outlined-required"
                  label="Ingresa tu nueva contraseña"
                  helperText={formik.touched.new_password && formik.errors.new_password ? formik.errors.new_password : ''}
                  onChange={formik.handleChange}
                />
             </Grid>
             <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                <TextField
                  name="confirm_new_password"
                  type="password"
                  error={formik.touched.confirm_new_password && formik.errors.confirm_new_password ? true : false}
                  required
                  fullWidth={true}
                  id="outlined-required"
                  label="Confirmar contraseña"
                  helperText={formik.touched.confirm_new_password && formik.errors.confirm_new_password ? formik.errors.confirm_new_password : ''}
                  onChange={formik.handleChange}
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
                type="submit"
                className="rounded-none bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
               >
                   Guardar
               </button>
             </Grid>
        </Grid>
        </form>
    )
}