import Swal from "sweetalert2";
import client from "../config/axiosConfig"
import { types } from "../types";

export const startStoreNewsletterSuscription = (email) =>{
    return async() =>{
         let url = 'newsletter';
         try {
          const {data} = await client.post(url, email);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            });
            
            Toast.fire({
            icon: 'success',
            title:data.message
            });

            
         } catch (error) {
          console.log(error);
         }
       
       
    }
}
