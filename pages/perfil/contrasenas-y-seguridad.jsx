import { Avatar, Breadcrumbs, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { logout } from "../../src/actions/authActions";
import { startLoadDataUser, startUpdateImageUser } from "../../src/actions/profileActions";
import Layout from "../../src/components/Layouts";
import { ChangeEmailProfile } from "../../src/components/profile/sessionAndSecurity/changeEmailProfile";
import { ChangePasswordProfile } from "../../src/components/profile/sessionAndSecurity/changePasswordUser";
import { ChangePhoneNumberProfile } from "../../src/components/profile/sessionAndSecurity/changePhoneNumberProfile";
import { ChangePhotoProfile } from "../../src/components/profile/sessionAndSecurity/changePhotoProfile";
import { ChangeUserName } from "../../src/components/profile/sessionAndSecurity/changeUserName";
import { useRouter } from "next/router";
import { Modal } from "../../src/components/ui/modal";
import { useToggle } from "../../src/hooks/useToggle";
import { wrapper } from "../../src/store";
import Cookies from 'js-cookie';

const PasswordAndSecurity = () =>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state)=>state.profile);
    const [ open , toggle ] = useToggle();
    const [ type , setType ] = useState(0);
    const [ image , setImage ] = useState({
        urlPhoto:user?.profileImage || '',
        imageProfile:''
      });
    const [ userInfo , setUserInfo ] = useState({
      fullname:"",
      phone_number:"",
      email:"",
      actual_password:"",
      new_password:"",
      confirm_new_password:""
    });

    const { urlPhoto , imageProfile } = image;
    const { fullname , phone_number , email} = userInfo;

    useEffect(() => {
        if(user?.profileImage){
            setImage({
                ...image,
                urlPhoto:user?.profileImage
            });
            setUserInfo({
              fullname:user?.fullname,
              phone_number:user?.phone?.phone_number,
              email:user?.email
            });
        }
    }, [user]);

    console.log(user?.profileImage);

    const [ isLoadImage , setIsLoadImage ] = useState(false);
    
    const handleClickUpdateSessionSecurity = (type) =>{
        toggle();
        if(type){
         setType(type);
        }else{
            setType(0);
        }
    }

    const handleChangeImage = (e) =>{
        if(e.target.files.length > 0){
            setIsLoadImage(true);
            setTimeout(() => {
                setIsLoadImage(false);
                setImage({
                    urlPhoto:URL.createObjectURL(e.target.files[0]),
                    imageProfile:e.target.files[0]
                })
            }, 1500);
        }
    }

    const handleSavePhotoImage = () =>{
        if(type === 0 ){
            if(!imageProfile){
                errorNotify("No has subido una nueva imagen de perfil , selecciona una imagen y vuelve a intentarlo");
                handleClickUpdateSessionSecurity();
                return;
            }            
            const formData = new FormData();
            formData.append("profileImage",imageProfile);    
            dispatch(startUpdateImageUser(formData));
            handleClickUpdateSessionSecurity();
            setImage({
                urlPhoto:user?.profileImage || '',
                imageProfile:''
            });

        }
    }

    const handleLogout = () =>{
      dispatch(logout());
      Cookies.remove('token');
      router.replace('/')
    }


    return(
    <Layout>
     <section className="my-10 max-w-[600px] m-auto">
         <Grid container spacing={2} flex justifyContent="center">
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Breadcrumbs aria-label="breadcrumb" className="px-6">
                    <Link  underline="hover" color="inherit" href="/">
                      Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/perfil" className="">
                      Perfil
                    </Link>
                    <Typography color="text.primary">
                        Contraseña y Seguridad
                    </Typography>
                  </Breadcrumbs>
            </Grid>
         </Grid>
         <h2 className="text-center font-semibold text-3xl my-8 text-[#333]">
             Inicio de Sesión y Seguridad
         </h2>
         <div>
            <div className="min-h-[600px] ">
               <div className="flex justify-between items-center border-[1px] border-solid border-b-[#e7e7e7] py-5 px-5">
                  <div className="font-Poppins">
                   <Avatar
                     alt="mi-foto-de-perfil"
                     src={urlPhoto}
                     sx={{ width: 80, height: 80 }}
                   /> 
                  </div>
                  <div>
                    <button
                      className="bg-[#e7e9ec] cursor-pointer text-center text-[#333] py-2 px-5 font-Poppins rounded-sm border-[1px] border-solid border-[#8d9096] hover:bg-[#8d9096] hover:text-luz transition-all"
                      onClick={()=>handleClickUpdateSessionSecurity(type=0)}
                    >
                        Modificar
                    </button>
                  </div>
               </div>
               <div className="flex justify-between items-center border-[1px] border-solid border-b-[#e7e7e7] py-5 px-5">
                  <div className="font-Poppins">
                    <p>Nombre:</p>
                    <span className="text-sm text-[#888]">{fullname}</span>  
                  </div>
                  <div>
                    <button
                      className="bg-[#e7e9ec] cursor-pointer text-center text-[#333] py-2 px-5 font-Poppins rounded-sm border-[1px] border-solid border-[#8d9096] hover:bg-[#8d9096] hover:text-luz transition"
                      onClick={()=>handleClickUpdateSessionSecurity(type=1)}
                    >
                        Modificar
                    </button>
                  </div>
               </div>
               <div className="flex justify-between items-center border-[1px] border-solid border-b-[#e7e7e7] py-5 px-5">
                  <div className="font-Poppins">
                    <p>Correo Electronico:</p>
                    <span  className="text-sm text-[#888]">{email}</span>  
                  </div>
                  <div>
                    <button
                      className="bg-[#e7e9ec] cursor-pointer text-center text-[#333] py-2 px-5 font-Poppins rounded-sm border-[1px] border-solid border-[#8d9096] hover:bg-[#8d9096] hover:text-luz transition"
                      onClick={()=>handleClickUpdateSessionSecurity(type=2)}
                    >
                        Modificar
                    </button>
                  </div>
               </div>
               <div className="flex justify-between items-center border-[1px] border-solid border-b-[#e7e7e7] py-5 px-5">
                  <div className="font-Poppins">
                    <p>Numero Celular:</p>
                    <span className="text-sm text-[#888]">{phone_number || "No Agregado"}</span>  
                  </div>
                    <button
                      className="bg-[#e7e9ec] cursor-pointer text-center text-[#333] py-2 px-5 font-Poppins rounded-sm border-[1px] border-solid border-[#8d9096] hover:bg-[#8d9096] hover:text-luz transition"
                      onClick={()=>handleClickUpdateSessionSecurity(type=3)}
                    >
                        Modificar
                    </button>
               </div>
               <div className="flex justify-between items-center border-[1px] border-solid border-b-[#e7e7e7] py-5 px-5">
                  <div className="font-Poppins">
                    <p>Contraseña</p>
                    <span className="text-sm text-[#888]">*******</span>  
                  </div>
                  <div>
                    <button
                      className="bg-[#e7e9ec] cursor-pointer text-center text-[#333] py-2 px-5 font-Poppins rounded-sm border-[1px] border-solid border-[#8d9096] hover:bg-[#8d9096] hover:text-luz transition"
                      onClick={()=>handleClickUpdateSessionSecurity(type=4)}
                    >
                        Modificar
                    </button>
                  </div>
               </div>
               <div className="flex justify-center items-center border-[1px] border-solid border-b-[#e7e7e7] py-5 px-5">
                    <button
                      className="bg-[#e7e9ec] cursor-pointer text-center text-[#333] py-2 px-5 font-Poppins rounded-sm border-[1px] border-solid border-[#8d9096] hover:bg-[#8d9096] hover:text-luz transition"
                      onClick={handleLogout}
                    >
                      Cerrar Sesion
                    </button>
               </div>
            </div>
         </div>
         <Modal
           title="Edición Sesión y Seguridad"
           open={open}
           handleOpenCheckout={handleClickUpdateSessionSecurity}
           fullWidth={true}
           maxWidth="sm"
           actions={false}
         >
              {
                 type === 0 ?
                 <ChangePhotoProfile
                    isLoadImage={isLoadImage}
                    urlPhoto={urlPhoto}
                    handleChangeImage={handleChangeImage} 
                    handleSavePhotoImage={handleSavePhotoImage}
                 />
                :
                type === 1 ? 
                    <ChangeUserName
                      fullname={fullname}
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                      toggle={toggle}
                    />
                :
                type === 2 ?
                  <ChangeEmailProfile
                    email={email}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    toggle={toggle}
                  />
                :
                type === 3 ?
                   <ChangePhoneNumberProfile
                      phone_number={phone_number}
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                      toggle={toggle}
                   />
                :
                type === 4?
                   <ChangePasswordProfile
                      toggle={toggle}
                   />
                :
                null

              }

         </Modal>   
     </section>
    </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadDataUser(ctx))
});

export default PasswordAndSecurity;