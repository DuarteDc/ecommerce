import Image from 'next/image';
import Link from 'next/link';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Drawer = ({ logo, handleRedirectClick, pages, logged, handleRedirectWithParams }) => {
    return (
        <div className="font-Poppins dark:bg-dark h-full">
            <figure className="flex justify-center">
                <Image
                    src={logo}
                    fill={true}
                    alt="Wapizima"
                    width={90}
                    height={90}
                    onClick={() => handleRedirectClick('/')}
                    className="cursor-pointer"
                />
            </figure>
            {pages.map((route) => (
                route.name !== 'Escuela' ? (
                    <div
                        className="pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm dark:text-white"
                        onClick={() => handleRedirectClick(route.path)}
                        key={route.name}
                    >
                        <span>{route.icon}{route.name}</span>
                    </div>
                ) : (
                    <div
                        className="pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm dark:text-white"
                        key={route.path}>
                        <Link href={route.path} key={route.path} prefetch={false}>
                            <a target="_blank">{route.icon}{route.name}</a>
                        </Link>
                    </div>
                )
            ))}
            <div>
                {logged ? (
                    <div>
                        <hr className="dark:text-white"/>
                        <span
                            className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28"
                            onClick={() => handleRedirectClick('/perfil')}
                        ><AccountCircleIcon className="mr-4" />Mi cuenta</span>
                        <span className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28" onClick={(e) => {
                            handleClose(e);
                            logoutSession();
                        }} >
                            Cerrar Sesión
                        </span>
                    </div>
                ) : (
                    <div>
                        <hr />
                        <span className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28"
                            onClick={() => handleRedirectWithParams(`/auth/login?p=${router.asPath}`)}>
                            Iniciar Sesión
                        </span>
                        <span className="block pl-4 mb-5 cursor-pointer text-gray-900 hover:text-stone-900 hover:bg-gray-100 py-2 uppercase text-sm pr-28"
                            onClick={() => handleRedirectWithParams(`/auth/register/?p=${router.asPath}`)}>
                            Registrate
                        </span>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Drawer