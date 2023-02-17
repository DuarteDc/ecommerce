import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CircularProgress from '@mui/material/CircularProgress';

import { getStartedSendImagesToCanvas } from '../../actions/ordersActions';

const ItemUploadImage = ({ image, product, index }) => {

    const boxImage = useRef(null);
    const dispatch = useDispatch();
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFile(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            },
                setFile(file),
                startSendImage(file)
            )));
        }
    });

    const onChangeImage = (url) => {
        boxImage.current.src = url;
    }

    const startSendImage = async (image) => {
        setLoading(true);
        const data = new FormData();
        data.append('image', image);
        data.append('product_id', product._id)
        data.append('index', index); 
        const isValid = await dispatch(getStartedSendImagesToCanvas(data));
        if (!isValid) return setLoading(false);
        onChangeImage(image.preview);
        setLoading(false);
    }

    return (
        <div className={`flex items-center justify-center mb-5 md:mb-0 block ${loading && 'pointer-events-none'}`}>
            <div {...getRootProps()} className="flex flex-col items-center w-full">
                <input {...getInputProps()} accept="image/*" />
                <div className="border-2 w-full w-[8rem] h-[8rem] border-red-600 relative md:w-[10rem] md:h-[10rem]  relative overflow-hidden" >
                    <div className={`absolute z-40 w-full h-full hover:bg-[#e91e63] cursor-pointer transition-all duration-500 ease-in hover:opacity-75 hover:text-white hover:font-bold ${file ? 'opacity-0' : 'opacity-75'}`}>
                        <span className={`w-full h-full flex flex-col items-center justify-center`}>
                            <div className="border-2 rounded-full mb-2 ">
                                <ArrowUpwardIcon className="text-2xl md:text-6xl" />
                            </div>
                            <p className="text-xs text-center">Selecciona una imágen</p>
                        </span>
                    </div>
                    {
                        loading && (
                            <div className="z-20 flex flex-col items-center justify-center my-auto h-full">
                                <CircularProgress />
                                <sub className="mt-2 text-[#e91e63] font-bold">Espere</sub>
                            </div>
                        )
                    }
                    <img
                        src={image.path}
                        className={`w-full h-full object-cover object-center ${loading && "hidden"}`}
                        ref={boxImage}
                    />
                </div>
                <span>{index + 1}</span>
            </div>
        </div>
    )
}

export default ItemUploadImage;