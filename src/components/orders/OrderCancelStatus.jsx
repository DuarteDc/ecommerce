import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const OrderCancelStatus = ({ status }) => {

    const steps = ['Pendiente de cancelación', 'Pedido cancelado'];

    const isStepFailed = (step) => {
        return step === status;
    };

    return (
        <Box sx={{ width: '100%' }} >
            <Stepper activeStep={status} alternativeLabel>
                {steps.map((label, index) => {
                    const labelProps = {};
                    if (isStepFailed(index)) {
                        labelProps.optional = (
                            <></>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    )
}

export default OrderCancelStatus