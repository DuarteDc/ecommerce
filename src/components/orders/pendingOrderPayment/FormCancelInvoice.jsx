import { useFormik } from 'formik';
import * as Yup from 'yup';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const optionsCancelInvoice = [
    'Cancelar Factura',
    'Cancelar Factura y Refacturar',
]

const FormCancelInvoice = () => {

    const initialValues = {
        subject: '',
        description: '',
    }

    const validationSchema = {
        subject: Yup.string().required('La nombre es requerido'),
        description: Yup.string().min(8, 'La calle debe contener al menos 8 caracteres').required('La calle es requerida'),
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            alert(JSON.stringify(formData));
        }
    });

    return (
        <form className="mt-5" onSubmit={formik.handleSubmit}>
            <FormControl fullWidth sx={{ marginY: 2 }}>
                <TextareaAutosize
                    aria-label="empty textarea"
                    name="description"
                    required={true}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder="Motivo de cancelación"
                    className="placeholder:text-gray-500 block w-full border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-[#e91e63] focus:ring-[#e91e63] focus:ring-[.9px]"
                    minRows={10}
                    style={{ resize: "none" }}
                />
            </FormControl>
            <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out"
                type="submit"
            >
                Enviar
            </button>
        </form>
    )
}

export default FormCancelInvoice