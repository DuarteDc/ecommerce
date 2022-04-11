import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { startLoadCategories } from '../../src/actions/categoryActions';
import { Newsletter } from '../../src/components/home';
import Layout from '../../src/components/Layouts';
import { CardProduct } from '../../src/components/ui';
import { BannerImage } from '../../src/components/ui/bannerImage';
import { wrapper } from '../../src/store';
import Cookie from 'js-cookie';
import { addShoppingCartFromLocalStorage,shoppingCartNotLoggedfromLocalStorage } from '../../src/actions/shoppingCartActions';
import { useEffect } from 'react';

const Categories = () => {
    const history = useRouter();
    const dispatch = useDispatch();
    const { logged } = useSelector((state)=>state.auth);
    const {categories} = useSelector((state)=>state.categories);

    useEffect(() => {
        if (!logged){
        let cartNotLogged =  localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
          dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
      }, [logged]);

    useEffect(() => {
        if (logged){
        const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        dispatch(addShoppingCartFromLocalStorage(shoppingCart))
        }
    }, [logged]);

    const handleClickCard = (url) =>{
        history.push(`/categorias/${url}`)
    }

    return (
        <Layout 
          title="Wapizima - Categorias"
          robots="noindex"
        >
           <BannerImage
              title="Colecciones"
           />
                <section className="container mx-auto relative mt-20 max-w-[1290px]">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 px-2'>
                    {categories?.map((category) => (
                        <CardProduct
                          key={category?._id}
                          image={category.imageWeb}
                          name={category?.name}
                          url={category?.url}
                          titleButton="Ver más..."
                          handleClickCard={handleClickCard}
                          height={300}
                          width={400}
                        />
                    ))}
                    </div>
                </section>
            <Newsletter/>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadAdministrableLogo());
    return{
        revalidate:3600
    }
});


export default Categories;