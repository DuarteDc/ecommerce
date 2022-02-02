const Card = () => {
    return (
        <article className="my-12 overflow-hidden w-10/12 border-2 mx-auto rounded-xl relative hover:scale-[1.01] cursor-pointer">
            <div className="overflow-hidden">
                <span className="absolute bg-[#fa440a] text-white p-2 font-bold">
                    30%
                </span>
                <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain w-full h-full" />
            </div>
            <div className="px-4 mt-4 mb-4">
                <p className="text-xl">Lorem ipsum dolor</p>
                <p className="text-md font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, corporis?</p>
                <p className="text-lg font-bold">$800</p>
                <p className="float-right semibold">4 avaible</p>
                <button className="w-full bg-[#f58d16] py-2 mt-2 text-white font-bold hover:bg-[#ff9f30] rounded-lg">
                    Add to card
                </button>
            </div>
        </article>
    )
}

export default Card;