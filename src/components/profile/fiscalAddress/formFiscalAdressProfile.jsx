import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Grid, TextField, InputLabel } from "@mui/material"
const Select = dynamic(() => import('react-select'), { ssr: false });
import { taxt_system } from "../../../staticData/text_system";
import { startAddFiscalAddress, startGetMunicipality, startUpdateFiscalAddress } from '../../../actions/profileActions';
import { useEffect } from 'react';


export const FormFiscalAddressProfile = () => {
  const dispatch = useDispatch();
  const { states, municipalities, stateSelected, municipalitySelected } = useSelector((state) => state.profile);
  const { fiscalAddress } = useSelector((state) => state.profile);
  const taxt_selected = taxt_system.filter(taxt => taxt.value === fiscalAddress.tax_system);

  const initialValues = {
    legal_name: fiscalAddress.legal_name || '',
    tax_id: fiscalAddress.tax_id || '',
    email: fiscalAddress.email || '',
    phone: fiscalAddress.phone || '',
    tax_system: taxt_selected[0] || '',
    street: fiscalAddress?.address?.street || '',
    interior: fiscalAddress?.address?.interior || '',
    exterior: fiscalAddress?.address?.exterior || '',
    neighborhood: fiscalAddress?.address?.neighborhood || '',
    city: fiscalAddress?.address?.city || '',
    state: { label: stateSelected.name, value: stateSelected._id } || '',
    municipality: { label: municipalitySelected.name, value: municipalitySelected._id } || '',
    zip: fiscalAddress?.address?.zip || ''
  }

  useEffect(() => {
    if (fiscalAddress) {
      formik.values.tax_system = fiscalAddress.tax_system;
    }
  }, []);

  const validationSchema = {
    legal_name: Yup.string().required("Nombre fiscal o Razón social es requerido"),
    tax_id: Yup.string().required("El RFC es requerido").matches(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/,
      "El RFC con Homoclave son 13 caracteres, sin Homoclave son 10 caracteres"),
    tax_system: Yup.string().required("El régimen fiscal es requerido"),
    zip: Yup.string().required("El Código Postal es requerido"),
  }

  const handleChangeState = (state_id) => {
    dispatch(startGetMunicipality(state_id));
  }


  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData) => {


      const data = {
        legal_name: formData.legal_name,
        tax_id: formData.tax_id,
        tax_system: formData.tax_system,
        email: formData.email,
        phone: formData.phone,
        address: {
          state: formData.state,
          municipality: formData.municipality,
          street: formData.street,
          interior: formData.interior,
          exterior: formData.exterior,
          neighborhood: formData.neighborhood,
          city: formData.city,
          zip: formData.zip,
        }
      }


      if (Object.keys(fiscalAddress).length > 0) {
        data.address.state = formData.state.value || formData.state;
        dispatch(startUpdateFiscalAddress(data));
      } else {
        dispatch(startAddFiscalAddress(data));
      }

    }
  });


  useEffect(() => {
    if (stateSelected) {
      handleChangeState(stateSelected._id);
    }
  }, [stateSelected]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="border-b-solid border-dashed text-lg font-Poppins leading-8 text-center px-5 py-5 border-b-2">
        <h2 className="text-[#333]">{Object.keys(fiscalAddress).length > 0 ? 'Actualizar tus datos fiscales' : 'Agrega tus Datos Fiscales'}</h2>
      </div>
      <div className="p-10 text-[#888]">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              name="legal_name"
              error={formik.touched.legal_name && formik.errors.legal_name ? true : false}
              helperText={
                formik.touched.legal_name && formik.errors.legal_name ?
                  formik.errors.legal_name : ""
              }
              fullWidth={true}
              required={true}
              size="small"
              id="outlined-required"
              label="Nombre fiscal o Razón Social"
              onChange={formik.handleChange}
              value={formik.values.legal_name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              name="tax_id"
              fullWidth={true}
              required={true}
              id="outlined-required"
              label="RFC"
              size="small"
              onChange={formik.handleChange}
              error={formik.touched.tax_id && formik.errors.tax_id ? true : false}
              helperText={
                formik.touched.tax_id && formik.errors.tax_id ?
                  formik.errors.tax_id : ""
              }
              value={formik.values.tax_id}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              name="email"
              fullWidth={true}
              required={true}
              size="small"
              id="outlined-required"
              label="Correo Electronico"
              onChange={formik.handleChange}
              value={formik.values.email}

            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              name="phone"
              fullWidth={true}
              required={true}
              size="small"
              id="outlined-required"
              label="Número Telefonico"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Select
              name="tax_system"
              placeholder="Selecciona un regimen fiscal"
              options={taxt_system}
              onChange={selectedOption =>
                formik.setFieldValue("tax_system", selectedOption.value)
              }
              id="react-select-32-live-region"
              className="z-[30]"
              defaultValue={formik.values.tax_system}
            />
            {formik.touched.tax_system && formik.errors.tax_system ? (
              <span className="text-[#d32f2f] text-[0.75em] font-bold	 leading-[1.66] text-left mt-[4px] mr-[14px] mb-0 ml-[14px]">{formik.errors.tax_system}</span>
            ) : null
            }
          </Grid>
        </Grid>
      </div>
      <div className="border-dashed text-lg font-Poppins leading-8 text-center px-5 py-5 border-y-2">
        <h2 className="text-[#333]">Dirección Fiscal</h2>
      </div>
      <div className="p-10 text-[#888]">
        <Grid container spacing={3} flex justifyContent="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              name="street"
              fullWidth={true}
              required={true}
              size="small"
              id="outlined-required"
              label="Calle"
              onChange={formik.handleChange}
              value={formik.values.street}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              name="zip"
              fullWidth={true}
              required={true}
              id="outlined-required"
              label="C.P"
              size="small"
              onChange={formik.handleChange}
              error={formik.touched.zip && formik.errors.zip ? true : false}
              helperText={
                formik.touched.zip && formik.errors.zip ?
                  formik.errors.zip : ""
              }
              value={formik.values.zip}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              name="exterior"
              required={true}
              fullWidth={true}
              size="small"
              id="outlined-required"
              label="No.Ext"
              onChange={formik.handleChange}
              value={formik.values.exterior}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <TextField
              name="interior"
              fullWidth={true}
              id="outlined-required"
              label="No.Int"
              size="small"
              onChange={formik.handleChange}
              value={formik.values.interior}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              name="neighborhood"
              fullWidth={true}
              required={true}
              size="small"
              id="outlined-required"
              label="Colonia"
              onChange={formik.handleChange}
              value={formik.values.neighborhood}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <TextField
              name="city"
              fullWidth={true}
              required={true}
              size="small"
              id="outlined-required"
              label="Ciudad"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="state"
              placeholder="Selecciona un estado"
              options={states}
              required={true}
              id="react-select-32-live-region1"
              onChange={selectedOption => {
                formik.setFieldValue("state", selectedOption.value),
                  handleChangeState(selectedOption.value),
                  formik.setFieldValue("municipality", '')
              }}
              defaultValue={formik.values.state}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <InputLabel id="demo-simple-select-label1">Municipio</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              name="municipality"
              placeholder="Selecciona un municipio"
              options={municipalities}
              required={true}
              id="react-select-32-live-region2"
              onChange={selectedOption =>
                formik.setFieldValue("municipality", selectedOption.value)
              }
              defaultValue={formik.values.municipality}
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