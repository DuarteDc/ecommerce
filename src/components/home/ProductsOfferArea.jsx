import Link from 'next/link'

export const ProductsOfferArea = () => {
    return (
        <>
            <section className="offer-area bg-img">
                <div className="w-full  mx-auto px-6  lg:pl-36 lg:pr-1">
                    <div className="max-w-xl border-solid border-luz border-8 text-center py-16 px-10 relative z-[1] before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 before:bg-luz before:z-[-1] before:m-3">
                        <span className="text-base block  font-['Poppins']">¿Eres Influencer?</span>
                        <h2 className="text-5xl font-bold mt-0 mb-2  font-['Poppins']">Convierte en nuestro socio</h2>
                        <p className="mb-6 text-lg text-[#222] leading-normal  font-['Poppins']">Obtén las mejores ofertas , decuentos en productos y muchos beneficios más.</p>
                        <Link href="/influencer">
                            <a className="bg-[#222] text-luz px-8 py-2 uppercase  font-['Poppins']  transition duration-700 ease-in-out cursor-pointer">Registrarme</a>
                        </Link>
                    </div>
                </div>
            </section>
            <style jsx>{
                `
            .bg-img{
              background-image:url('./assets/images/offer.jpg');
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
