import CategoryIcon from '@mui/icons-material/Category';

const AsideBar = ({ categories }) => {
    return (
        <div className="bg-gray-50 hidden md:block p-4 border-gray-50 overflow-y-auto h-screen">
            <h1 className="text-xl font-bold">Categories</h1>
            {
                categories?.map((category) => (
                    <ul className="relative">
                        <li className="relative" id="sidenavEx1">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx1" aria-expanded="true" aria-controls="collapseSidenavEx1">
                                <span><CategoryIcon /></span>
                                <span>{category?.name}</span>
                            </a>
                        </li>
                    </ul>

                ))
            }
        </div>
    )
}

export default AsideBar;