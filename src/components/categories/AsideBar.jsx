const AsideBar = ({ categories }) => {
    const tags = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    return (
        <div className="hidden md:block p-4 overflow-hidden h-screen">
            <h2 className="text-xl font-bold uppercase">Tags</h2>
            <div>
                {
                    tags?.map((tag) => (
                        <span className="px-3 py-2 border-2 border-gray-200 mr-2 w-5 overflow-hidden">Hola mundo</span>
                    ))
                }
            </div>
            <h2 className="text-xl font-bold uppercase">Categorias</h2>
            {
                categories?.map((category) => (
                    <ul className="relative">
                        <li className="relative" id="sidenavEx1">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis rounded cursor-pointer " data-mdb-ripple="true" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx1" aria-expanded="true" aria-controls="collapseSidenavEx1">
                                <span>{category?.name}</span>
                            </a>
                        </li>
                    </ul>

                ))
            }
            <h2 className="text-xl font-bold uppercase">Marcas</h2>
            {
                categories?.map((category) => (
                    <ul className="relative">
                        <li className="relative" id="sidenavEx1">
                            <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis rounded cursor-pointer " data-mdb-ripple="true" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx1" aria-expanded="true" aria-controls="collapseSidenavEx1">
                                <span>{category?.name}</span>
                            </a>
                        </li>
                    </ul>

                ))
            }
            <h2 className="text-xl font-bold uppercase">Precio</h2>
        </div>
    )
}

export default AsideBar;