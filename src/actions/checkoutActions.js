import client from "../config/axiosConfig";
import Cookies from "js-cookie";
import { types } from "../types";
import axios from "axios";
import { errorNotify } from "../helpers/helpers";

export const startLoadClientSecret = (token) => {
    return async (dispatch, getState) => {

        const { order_id } = getState().cart;
        const typeOrder = Cookies.get('typeOrder');
        typeOrder = Number(typeOrder);
        try {
            let url = `/orders/stripe/clients/${order_id}`;
            const { data } = await client.post(url, {typeOrder}, {
                headers: {
                    'Authorization': token
                },
            });
            Cookies.set('client_secret', data.client_secret);
            dispatch(loadClientSecret(data.client_secret))
        } catch (error) {
            if(axios.isAxiosError(error)){
                errorNotify(error?.response?.data?.message);
                return;
            }
        }
    }
}

export const loadClientSecret = (client_secret) => ({
    type: types.loadSecretClientStripe,
    payload: client_secret
});


/**Add client_secret stripe to state */
export const addClientSecretFromCookies = (client_secret) => ({
    type: types.loadSecretClientfromCookies,
    payload: client_secret
});


/**load banks accounts */
export const startLoadBanksAccounts = () => {
    return async (dispatch) => {
        try {
            let url = 'bank-accounts';
            const { data } = await client.get(url);
            dispatch(loadBanksAccounts(data.bankAccounts));
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadBanksAccounts = (banksAccounts) => ({
    type: types.loadBanksAccounts,
    payload: banksAccounts
});

export const startfinaliceTransferCheckout = (bank_account_id, token) => {
    return async (dispatch, getState) => {
        const { order_id } = getState().cart;
        const typeOrder = Cookies.get('typeOrder');
        const data = {
            bank_account_id,
            typeOrder,
        }
        try {
            let url = `/orders/finalize/sale/${order_id}`;
            await client.post(url, data, {
                headers: {
                    'Authorization': token
                }
            });
            dispatch(finaliceTransferCheckout());
        } catch (error) {
            console.log(error);
        }
    }
}

export const finaliceTransferCheckout = () => ({
    type: types.successFinaliceTransfer
});
