import Image from 'next/image';

const InfoItem = ({ title, text, image }) => {
    return (
        <div className="my-10 md:my-20 w-full">
            <div className="flex items-center">
                <div className="border-[#e91e63] rounded-full p-3 mx-4 shadow-2xl shadow-[#e91e63] flex justify-center items-center dark:bg-gray-200">
                    <Image
                        src={image}
                        alt="distribuidor"
                        width={150}
                        height={150}
                    />
                </div>
                <div className="lg:w-8/12">
                    <h3 className="md:text-3xl font-bold uppercase text-lg">
                        {title}
                    </h3>
                    <div className="mt-8 text-gray-500">
                        {text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoItem;