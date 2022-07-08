import Link from 'next/link'

export const ProductsOfferArea = () => {
    return (
        <>
            <section className="offer-area bg-img">
                <div className="w-full  mx-auto px-6  lg:pl-36 lg:pr-1">
                    <div className="max-w-xl border-solid border-luz border-8 text-center py-16 px-10 relative z-[1] before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 before:bg-luz before:z-[-1] before:m-3">
                        <h2 className="text-4xl font-bold mt-0 mb-2  font-['Poppins']"> No lo pienses más y se parte de está gran familia.</h2>
                        <p className="mb-6 text-xl text-[#222] leading-normal  font-['Poppins']">Registrate y descubre todos los beneficios que tenemos para tí. </p>
                        <Link href="https://wapizima.com.mx">
                            <a  target="_blank"  className="bg-[#222] text-luz px-8 py-3 uppercase  font-['Poppins']  transition duration-700 ease-in-out cursor-pointer">Registrate</a>
                        </Link>
                    </div>
                </div>
            </section>
            <style jsx>{
                `
            .bg-img{
              background-image:url('./assets/images/influencer1.png');
              padding:12rem 0rem;
            }
            .offer-area{
              position:relative;
              z-index:1;
              background-position:50%;
              background-size:cover;
              background-attachment:fixed;
              background-repeat:no-repeat;
            }

            `
            }
            </style>
        </>
    );
};
