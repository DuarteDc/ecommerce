import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import { FormControl, TextField } from "@mui/material";

const FormProfile = ({fullname, email, phone, directions}) => {
    return (
        <>
            <div>
                <p className="p-4 text-center font-bold">Acount Details</p>
            </div>
            <div className="mt-10 md:mt-0 px-6">
                <span className="flex mt-4 items-center">
                    <PersonIcon className="mr-2" />
                    <FormControl fullWidth>
                        <TextField
                            id="standard-name"
                            value={fullname}
                            name="fullname"
                            color="warning" />
                    </FormControl>
                </span>
                <span className="flex mt-4 items-center">
                    <EmailIcon className="mr-2" />
                    <FormControl fullWidth>
                        <TextField
                            id="standard-name"
                            value={email}
                            name="fullname"
                            color="warning" />
                    </FormControl>
                </span>
                <span className="flex mt-4 items-center">
                    <LocalPhoneIcon className="mr-2" />
                    <FormControl fullWidth>
                        <TextField
                            id="standard-name"
                            value={phone?._id}
                            name="fullname"
                            color="warning" />
                    </FormControl>
                </span>
                <span className="flex mt-4 items-center">
                    <LocationOnIcon className="mr-2" />
                    <FormControl fullWidth>
                        <TextField
                            id="standard-name"
                            value={directions}
                            name="fullname"
                            color="warning" />
                    </FormControl>
                </span>
                <button className="my-5 ml-8 hover:bg-black py-2 px-4 hover:text-white font-bold border-4 border-black transition-all duration-700 ease-in-out">
                    update Acount
                </button>
            </div>
        </>
    )
}

export default FormProfile