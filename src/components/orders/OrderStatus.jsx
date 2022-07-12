import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    'Pendiente de aprobación',
    'Aprobada - Prendiente de envío',
    'Enviada',
];

const OrderStatus = ({ status }) => {
    
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={status} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label} color="secondary">
                        <StepLabel  style={{color: 'red'}}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}

export default OrderStatus