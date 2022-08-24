import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { startfinaliceTransferCheckout } from "../../actions/checkoutActions";
import Cookies from "js-cookie";
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

export const CheckoutTransfer = ({ handleOpenTransfer }) => {

    const dispatch = useDispatch();
    const { banksAccounts } = useSelector((state) => state.checkout);
    const [bankAccountSelected, setBankAccountSelected] = useState([]);

    const banksAccounts_options = banksAccounts.map(bank => {
        let bankOption = {
            label: `${bank.account_number} - ${bank.beneficiary}`,
            value: bank._id
        }
        return bankOption;
    });

    const handleClickBankAccount = (value) => {
        const bank_account_selected = banksAccounts.filter(bank => bank._id === value);
        setBankAccountSelected(bank_account_selected)
    }

    const handleFinaliceTransfer = (e) => {
        e.preventDefault();
        const token = Cookies.get('token');
        dispatch(startfinaliceTransferCheckout(bankAccountSelected[0]?._id, token));
        handleOpenTransfer();
    }

    return (
        <form className="w-full min-h-20 py-3">
            <div className="">
                <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Selecciona una cuenta bancaria:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Selecciona una cuenta bancaria:"
                        placeholder="ej. 424-242-424-242 - wapizima"
                        value={bankAccountSelected[0]}
                        onChange={(e) => handleClickBankAccount(e.target.value)}
                    >
                        {
                            banksAccounts_options.map(({ label, value }) => (
                                <MenuItem value={value} key={value}>{label}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div >
            <div className="my-5 min-h-10 border-[1px] border-solid border-[#888]">
                {
                    bankAccountSelected.length > 0 ?

                        <div className="px-5 py-2">
                            <div className="block w-[100px] h-[100px] mx-auto my-1">
                                <Image
                                    src={bankAccountSelected[0]?.bank?.image || ''}
                                    width={100}
                                    height={100}
                                    alt="backAccount"
                                    layout="responsive"
                                />
                            </div>
                            {
                                bankAccountSelected[0]?.card_number && (
                                    <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                        <p className="text-[#888] leading-6">
                                            <strong>
                                                No. Tarjeta:
                                            </strong>
                                        </p>
                                        <span className="text-base leading-7">
                                            {bankAccountSelected[0]?.card_number}
                                        </span>
                                    </div>
                                )
                            }
                            <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                <p className="text-[#888] leading-6">
                                    <strong>
                                        CLABE Interbancaria:
                                    </strong>
                                </p>
                                <span className="text-base leading-7">
                                    {bankAccountSelected[0]?.interbank}
                                </span>
                            </div>
                            <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                <p className="text-[#888] leading-7">
                                    <strong>
                                        Número de cuenta:
                                    </strong>
                                </p>
                                <span className="text-base leading-7">
                                    {bankAccountSelected[0]?.account_number}
                                </span>
                            </div>
                            <div className="flex flex-col justify-between items-center font-Poppins text-base">
                                <p className="text-[#888] leading-7">
                                    <strong>
                                        Beneficiario:
                                    </strong>
                                </p>
                                <span className="text-base leading-7">
                                    {bankAccountSelected[0]?.beneficiary}
                                </span>
                            </div>

                        </div>
                        :
                        <div className="my-10 min-h-10 flex justify-center items-center">
                            <p className="text-[#888] leading-6 font-Poppins text-xs">
                                <span>
                                    Selecciona una cuenta bancaria
                                </span>
                            </p>
                        </div>
                }
                <button
                    className="bg-[#333] text-luz py-3 px-6 w-full font-Poppins uppercase cursor-pointer"
                    onClick={(e) => handleFinaliceTransfer(e)}
                    disabled={bankAccountSelected.length > 0 ? false : true}
                >
                    Finalizar
                </button>
            </div>
        </form >
    )
}
