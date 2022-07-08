import axios from 'axios';
import Cookies from 'js-cookie';

const client =  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    responseType:'json',
    headers:{
        'Authorization': Cookies.get('token') || '',
    }
});
export default client;
