import Link from 'next/link';
import NavBar from '../../src/components/Layouts/NavBar'
const Categories = () => {
    const categories = [1, 2, 3, 4, 5, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
    return (
        <>
            <NavBar />
            <header className='bg-[#f58d16] py-8 absolute w-full'>
                <h1 className="text-xl lg:text-3xl ml-8 text-white font-bold uppercase mb-12"> Categories</h1>
            </header>
            <Link href="/categories/hola-mundo">
                <section className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 relative mt-20">
                    {categories.map(cat => (
                        <article className="bg-amber-600 rounded-xl shadow-xl shadow-amber-800/30 transition-all duration-200 ease-in hover:scale-[1.04] cursor-pointer m-2 md:m-8">
                            <div className="flex justify-center p-2">
                                <img src="https://cdn0.iconfinder.com/data/icons/infographic-orchid-vol-1/256/Colorful_Label-512.png" alt="" />
                            </div>
                            <div className="justify-center py-8">
                                <h2 className="text-center text-white font-bold text-md md:text-2xl">Lorem, ipsum dolor.</h2>
                                <p className="text-center text-white text-sm md:text-lg semibold">200 products</p>
                            </div>
                        </article>
                    ))}
                </section>
            </Link>
        </>
    )
}

export default Categories;