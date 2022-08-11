import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { helpers } from '../../helpers';

const PermissionsDetail = ({ countryPermission }) => {

    const { getPDFName } = helpers;
    const { name, image, attachments } = countryPermission;
    return (
        <div className="md:px-5 lg:px-8 pb-10 font-Poppins">
            <div className="flex py-5 justify-center items-center font-bold">
                <h2 className="text-center text-base md:text-lg lg:text-3xl mr-2 md:mr-3 lg:mr-5">{name}</h2>
                <img
                    src={image}
                    alt="Mexico"
                    className='w-10 md:w-12 lg:w-14'
                />
            </div>
            <hr className='mb-1' />
            <div className="flex flex-col">
                {
                    attachments?.map(({ _id, file }) => (
                        <a
                            key={_id}
                            href={file}
                            className="px-5 py-3 shadow-md cursor-pointer hover:bg-gray-50 overflow-hidden my-1 md:my-2 lg:my-3"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <PictureAsPdfIcon className='text-red-600 mr-2 text-[12px] md:mr-3 md:text-xl lg:text-2xl' />
                            <span className="text-xs md:text-sm lg:text-base">
                                {
                                    getPDFName(file)
                                }
                            </span>
                        </a>
                    ))
                }
            </div>

        </div>
    )
}

export default PermissionsDetail