import CategoryIcon from '@mui/icons-material/Category';
const AsideBar = () => {
    const categories = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <div class="bg-gray-100 hidden md:block p-4 border-gray-50">
            <p className="text-bold text-md lg:text-xl">Categories</p>
            <ul class="relative">
                {
                    categories.map((cat, i) => (
                        <li class="relative">
                            <a class="cursor-pointer flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-300 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark"><span><CategoryIcon /></span>
                                subcategory {i + 1}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default AsideBar;