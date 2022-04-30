import { Grid, TextField } from "@mui/material"
import { useFormik } from "formik";
import Select from "react-select";
import { taxt_system } from "../../../staticData/text_system";
import * as Yup from 'yup';

export const FormFiscalAddressProfile = () =>{

    const initialValues = {
        legal_name: '',
        tax_id: '',
        email:'',
        phone:'',
        tax_system:{},
        street:'',
        interior:'',
        neighborhood:'',
        city:'',
        state:{},
        municipality:{}
    }


    const validationSchema = {
      email: Yup.string().email("La dirección de correo no es valida").required("El correo es requerido"),
      password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida")
  }

  const formik = useFormik({
      initialValues,
      validationSchema: Yup.object(validationSchema),
      onSubmit: (formData) => {
          handleLoginUser(formData);
      }
  });



    return (
      <form className="">
           <div className="border-b-solid border-dashed text-lg font-Poppins leading-8 text-center px-5 py-5 border-b-2">
           <h2 className="text-[#333]">Agrega tus Datos Fiscales</h2>
        </div>
        <div className="p-10 font-Poppins text-[#888]">
       <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                name="legal_name"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="Nombre fiscal o Razón Social"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                name="tax_id"
                fullWidth={true}
                required
                id="outlined-required"
                label="RFC"
                size="small"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                name="email"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="Correo Electronico"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                name="phone"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="Número Telefonico"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Select
                name="tax_system"
                placeholder="Selecciona un regimen fiscal"
                options={taxt_system}
                onChange={formik.handleChange}
              />
            </Grid>
       </Grid>
       </div>
       <div className="border-dashed text-lg font-Poppins leading-8 text-center px-5 py-5 border-y-2">
           <h2 className="text-[#333]">Dirección Fiscal</h2>
        </div>
        <div className="p-10 font-Poppins text-[#888]">
       <Grid container spacing={3} flex justifyContent="center">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                name="street"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="Calle"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <TextField
                name="interior"
                fullWidth={true}
                required
                id="outlined-required"
                label="No.Int"
                size="small"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <TextField
                name="exterior"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="No.Ext"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <TextField
                name="neighborhood"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="Colonia"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
                name="city"
                fullWidth={true}
                required
                size="small"
                id="outlined-required"
                label="Ciudad"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Select
                name="state"
                placeholder="Selecciona un estado"
                options={taxt_system}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Select
                name="municipality"
                placeholder="Selecciona un municipio"
                options={taxt_system}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <div className="flex justify-center">
                    <button className="rounded-none bg-[#333] w-[100%] h-[50px] font-Poppins text-[15px] leading-[1.4] uppercase text-[#fff] flex  items-center  justify-center hover:bg-[#000] hover:transition-all"
                    type="submit"
                    >
                    Guardar
                    </button>
                </div>
            </Grid>
       </Grid>
       </div>
       </form>
    )
}