import { CircularProgress } from "@mui/material";
const LoadingIcon = () => {
    return (
        <div className="flex justify-center">
            <CircularProgress color="warning"/>
        </div>
    )
};

export default LoadingIcon;
