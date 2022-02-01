const Card = () => {
    return (
        <article className="my-12 overflow-hidden w-10/12 border-2 mx-auto rounded-xl relative">
            <div className="overflow-hidden">
                <span className="absolute bg-[#a85d08] text-white p-2 font-bold">
                    30%
                </span>
                <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain w-full h-full" />
            </div>
            <div className="px-4 mt-4 mb-4">
                <p className="text-xl">Lorem ipsum dolor</p>
                <p className="text-md font-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, corporis?</p>
                <p className="text-lg font-bold">$800</p>
                <p className="float-right semibold">4 avaible</p>
                <button className="w-full bg-[#a85d08] py-4 mt-2 text-white font-bold hover:bg-amber-800 rounded-lg">
                    Add to card
                </button>
            </div>
        </article>
    )
}

export default Card;