import CategoriesList from "./CategoriesList";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
const AsideBar2 = ({ categories }) => {
    return (
        <div className="p-4 md:h-screen w-full">
            <div className="mb-5">
                <p className="uppercase font-bold text-xl">Seleccion actual</p>
                <div className="flex flex-row-reverse text-xs">
                    <span className="inline-flex text-gray-500 hover:text-black cursor-pointer items-center"
                    >
                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                        <p>Limpiar todo</p>
                    </span>
                </div>
                <div>
                </div>
            </div>
            <CategoriesList categories={categories} />
        </div>
    )

}


export default AsideBar2
