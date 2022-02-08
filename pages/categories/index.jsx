import Link from 'next/link';
import { useSelector } from "react-redux";
import NavBar from '../../src/components/Layouts/NavBar'
import { startLoadCategories } from "../../src/actions/categoryActions";
import { wrapper } from '../../src/store';

const Categories = () => {
    const { categories } = useSelector((state) => state.categories);
    console.log(categories);
    return (
        <>
            <NavBar />
            <header className='bg-[#f58d16] py-8 absolute w-full'>
                <h1 className="text-xl lg:text-3xl ml-8 text-white font-bold uppercase mb-12">Categories</h1>
            </header>
            <Link href="/categories/hola-mundo">
                <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative mt-20">
                    {categories?.map((category) => (
                        <article key={category?._id} className="bg-amber-600 rounded-xl shadow-xl shadow-amber-800/30 transition-all duration-200 ease-in hover:scale-[1.04] cursor-pointer m-2 md:m-8">
                            <div className="flex justify-center p-2">
                                <img src={category?.image} alt={category?.name} />
                            </div>
                            <div className="justify-center py-8">
                                <h2 className="text-center text-white font-bold text-md md:text-2xl">{category?.name}</h2>
                            </div>
                        </article>
                    ))}
                </section>
            </Link>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=>
   async ()=>{
    await store.dispatch(startLoadCategories())

})

export default Categories;