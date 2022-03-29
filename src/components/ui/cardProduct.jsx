import Image from 'next/image';


export const CardProduct = ({image , name , titleButton , url , width , height ,  handleClickCard}) => {
   
    return (
        <>
      <div className="relative left-0 top-0 pb-[35px] animate__animated animate__zoomIn">
        <div className="block">
          <div className={`block-pick overflow-hidden relative  max-h-full `}>
  
            <Image
              src={image}
              alt={name}
              width={width}
              height={height}
              layout="responsive"
              className="flex items-center"
            />

            <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.2)] opacity-0 hover:opacity-[1] transition-all	duration-[0.4s] ease-linear delay-0">
          
             <div className="absolute left-2/4 translate-x-[-50%]  bottom-[-50px] w-[161px] transition-all	duration-[0.4s] ease-linear delay-0">
             <button
              className="block-btn rounded-3xl bg-[#222] min-w-[139px] h-10 font-Poppins leading-[1.4] text-luz absolute bottom-[-50px] left-[50%] translate-x-[-50%] flex justify-center items-center px-4 hover:bottom-10 hover:border-[#222] hover:no-underline hover:overflow-visible cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0"
              onClick={()=>handleClickCard(url)}
              >
              {titleButton}
            </button>
            </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .block-pick:hover .block-btn {
            bottom: 100px;
          }

          .block-pick:hover .addwishlist{
              transform:scale(1);
          }
        `}
      </style>
    </>
    );
};