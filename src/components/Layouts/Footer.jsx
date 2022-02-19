const Footer = () => {
    return (
        <footer className="h-5/6 py-20 px-11 md:px-32 bg-black mb-10 md:mb-0 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-12">
                <div>
                    <h2 className="text-3xl font-bold">Join the Comunity</h2>
                    <p className="text-lg mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis sed excepturi tenetur! Delectus praesentium tempora veritatis debitis possimus aliquid!</p>
                </div>
                <div className="flex items-center">
                    <input type="email" placeholder="Enter your email" className="p-4 w-2/3 mr-2 md:mr-2 outline-none text-black border-2" />
                    <button className="px-4 py-4 font-semibold border-2 border-white bg-black hover:bg-white hover:text-black transition-all duration-700 ease-in-out border-2">
                        Submit
                    </button>
                </div>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 mb-12">
                <div className="p-2">
                    <p className="text-xl font-bold uppercase">Lorem ipsum dolor sit</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita nobis sed excepturi tenetur! Delectus </p>
                </div>
                <div className="p-2">
                    <p className="text-xl font-bold uppercase">Learn with us</p>
                    <ul>
                        <li>Blog</li>
                        <li>Products</li>
                        <li>Categories</li>
                    </ul>
                </div>
                <div className="p-2">
                    <p className="text-xl font-bold uppercase">Userful links</p>
                    <ul>
                        <li>My Acount</li>
                        <li>Contact</li>
                        <li>My Products</li>
                    </ul>
                </div>
                <div className="p-2">
                    <p className="text-xl font-bold uppercase">follow us</p>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Youtube</li>
                    </ul>
                </div>
            </div>
            <p className="text-center">@Copyright 2022 By Digital Pinneapple</p>
        </footer>
    )
}

export default Footer;