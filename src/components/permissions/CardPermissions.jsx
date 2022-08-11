import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';


const CardPermissions = ({ _id, name, image, date, getOnePermission, attachments }) => {
    return (
        <div className='relative w-full overflow-hidden my-5 px-2 md:px-0 min-h-[18rem]'>
            <div className="overflow-hidden bg-gray-300 h-3/4 min-h-[16rem]">
                <img
                    src={image}
                    alt="Peru"
                    className="object-fill object-center w-full h-full"
                />
            </div>
            <div className="z-10 absolute w-10/12 bottom-3 left-8 md:left-10 px-5 md:px-10 py-3 shadow-md bg-white">
                <span>
                    <CalendarTodayIcon className="text-sm mr-2" />
                    <sub>{moment(date).format('LL')}</sub>
                </span>
                <h2 className='font-semibold text-base md:text-lg uppercase mt-2'>{name}</h2>
                <span
                    className="cursor-pointer border-solid leading-[1.9] hover:text-[#333] hover:border-[#797979] border-b-[1px] border-transparent duration-[0.4s] transition-all text-xs md:text-sm mr-2 w-4/12"
                    onClick={() => getOnePermission({ _id, name, image, date, attachments })}
                >
                    Ver permisos
                </span>
            </div>
        </div>
    )
}

export default CardPermissions