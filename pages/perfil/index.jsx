import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";


import { useDispatch } from 'react-redux';

import { wrapper } from "../../src/store";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Layout from "../../src/components/Layouts";

import { logout } from "../../src/actions/authActions";

import DirectionsSeccion from "../../src/components/profile/ui/DirectionsSeccion";
import SeguritySection from "../../src/components/profile/ui/SeguritySection";
import ProfileSection from "../../src/components/profile/ui/ProfileSection";

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { startLoadDataUser, startGetDirections, startUpdateDataUser } from "../../src/actions/profileActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { errorNotify, successNotify } from "../../src/helpers/helpers";
import { useRouter } from "next/router";
import LoadingScreen from "../../src/components/LoadingScreen";


const Profile = () => {

    const img = useRef();
    const router = useRouter();

    const inputFile = useRef(null)
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const handleUpdateImageUser = async (formData) => {

        setLoading(true);
        const data = new FormData();
        data.append('profileImage', formData);

        const { hasError, message } = await dispatch(startUpdateDataUser(data))

        if (hasError) {
            errorNotify(message);
            setLoading(false);
            return false;
        }
        successNotify(message);

        setLoading(false);
        return true;
    }

    const onFileChange = async (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file.type.includes('image')) {
                const hasError = await handleUpdateImageUser(file);
                if (!hasError) {
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function load() {
                    img.current.src = reader.result
                }
            } else {
                errorNotify("El formato de la imagen no es valido");
            }
        }
    }

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const { user, directions } = useSelector(state => state.profile);

    const logoutSession = () => {
        dispatch(logout);
        Cookies.remove('token')
        router.replace('/')
    }

    return (
        <Layout>
            {loading && <LoadingScreen />}
            <section className="container mx-auto mb-16">
                <h1 className="text-center uppercase text-2xl bg-gray-50 py-3 my-20 font-bold container mx-auto">Perfil</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col items-center p-4 drop-shadow-md">
                        <div className="rounded-full w-64 h-64 border-4 overflow-hidden relative z-10">
                            <div className="absolute bottom-5 right-10 z-20 bg-[#222] rounded-full p-1 cursor-pointer text-white cursor-pointer hover:opacity-75"
                                onClick={onButtonClick}>
                                <form>
                                    <ModeEditOutlineIcon />
                                    <input type="file" ref={inputFile} hidden name="profileImage"
                                        onChange={onFileChange}
                                    />
                                </form>
                            </div>
                            <img
                                src={user?.profileImage}
                                alt={user?.fullname}
                                ref={img}
                                className="w-full h-full object-fill static"
                            />
                        </div>
                        <p className="text-2xl uppercase mt-5 text-center">{user?.fullname}</p>
                        <button className="py-2 px-4 bg-black text-white font-bold my-5 hover:bg-white hover:text-black border-2 border-black transition-all duration-700 ease-in-out"
                            onClick={logoutSession}
                        >
                            Cerrar Sessión
                        </button>
                    </div>
                    <ProfileSection user={user} />
                </div>
                <DirectionsSeccion directions={directions} />
                <SeguritySection />
            </section>
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadDataUser(ctx));
        await store.dispatch(startGetDirections(ctx));
        await store.dispatch(startLoadAdministrableLogo());
    })
export default Profile
