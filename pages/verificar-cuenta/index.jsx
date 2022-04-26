import { wrapper } from "../../src/store";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Image from "next/image";
import { useSelector } from "react-redux";
import { MdMarkEmailRead } from "react-icons/md";
import { IconContext } from "react-icons";

const VerifyAccount = () => {

    const { logo } = useSelector(state => state.administrable)

    return (
        <section className=" font-Poppins bg-testimonial bg-no-repeat bg-cover min-h-screen px-10">
            <div className="container mx-auto py-20">
                <div className="flex flex-col justify-center py-10 lg:mx-60 px-5 lg:p-10 items-center border-2 border-gray-100 text-center bg-white">
                    <div className="flex justify-center">
                        <Image
                            src={logo}
                            alt="Wapizima"
                            width={200}
                            height={100}
                        />
                    </div>
                    <div className="border-2 border-black p-12 rounded-full">
                        <IconContext.Provider value={{ className: "text-9xl" }}>
                            <MdMarkEmailRead />
                        </IconContext.Provider>
                    </div>
                    <h2 className="text-4xl uppercase mt-10">Verifique su dirección de correo electrónico</h2>
                    <p className="mt-20 text-lg">
                        Esta acción requiere una verificación de correo. Por favor revisar tu buzón de correo y sigue las instrucciones
                        enviadas.
                    </p>
                    <button className="mt-20 bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out"
                        type="submit"
                    >
                        Reenviar Correo
                    </button>
                </div>
            </div>
        </section>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadAdministrableLogo());
    })
export default VerifyAccount;