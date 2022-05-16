import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptCookies } from "../../actions/administrableActions";

export const CookiesPrivacy = () => {

    const dispatch = useDispatch();
    const { acceptCookiesPoliticy } = useSelector((state) => state.administrable);

    const handleClickAcceptCookies = () => {
        localStorage.setItem('acceptCookies', true);
        dispatch(acceptCookies());
    }

    return (
        <div className={`w-full bg-[#333333] text-luz bottom-0 left-0 z-[34] h-[150px] fixed font-Poppins text-sm opacity-[0.9] ${acceptCookiesPoliticy ? 'hidden' : 'visible'}`}>
            <div className="text-center py-[20px] px-[10px]">
                <p>Este sitio web utiliza cookies propias y de terceros para el correcto funcionamiento y visualización del sitio web por parte del usuario.</p>
            </div>
            <div className="w-full flex justify-center opacity-100">
                <button
                    className="bg-[#f8f9fa] text-[#000] py-2 px-6 rounded-sm"
                    onClick={handleClickAcceptCookies}
                >
                    Aceptar Cookies
                </button>
            </div>
        </div>
    )
}