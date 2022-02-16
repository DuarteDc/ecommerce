import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TabBar = () => {

    const { pathname } = useRouter();
    const links = [
        { icon: <PersonIcon className={`${pathname === '/profile' ? 'text-4xl rounded-full bg-[#f58d16] p-2' : 'text-[#fa440a]'}`} />, link: '/profile', name: 'Perfil' },
        { icon: <CategoryIcon className={`${pathname === '/categories' ? 'text-4xl rounded-full bg-[#f58d16] p-2' : 'text-[#fa440a]'}`} />, link: '/categories', name: 'Categorias' },
        { icon: <HomeIcon className={`${pathname === '/' ? 'text-4xl rounded-full bg-[#f58d16] p-2' : 'text-[#fa440a]'}`} />, link: '/', name: 'Inicio' },
        { icon: <Inventory2Icon className={`${pathname === '/products/*' ? 'text-4xl rounded-full bg-[#f58d16] p-2' : 'text-[#fa440a]'}`} />, link: '/products', name: 'Productos' },
        { icon: <ImportContactsIcon className={`${pathname === '/contact' ? 'text-4xl rounded-full bg-[#f58d16] p-2' : 'text-[#fa440a]'}`} />, link: '/contact', name: 'Contacto' },
    ]
    return (
        <div className="w-full bottom-0 left-0 z-20 fixed drop-shadow-2xl drop-shadow-2xl bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 md:hidden">
            <div className="px-4 flex justify-center items-center py-1 justify-between">
                {links.map((link, index) => (
                    <span className="flex flex-col items-center">
                        <Link href={link.link} key={index}>{link.icon}</Link>
                        <p className="text-xs font-bold">{link.name}</p>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TabBar;