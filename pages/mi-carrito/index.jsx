import React, { useEffect} from 'react'
import Layout from '../../src/components/Layouts'
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import { CartMobile, CartTotals } from '../../src/components/cart';
import { shoppingCartNotLoggedfromLocalStorage, startCalculateTotalSale, startGetDirections, startLoadShoppingCart } from '../../src/actions/shoppingCartActions';
import { useRouter } from 'next/router';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { cart , cartNotLogged ,  success } = useSelector((state) => state.cart);
    const { logged } = useSelector((state)=>state.auth);

    useEffect(() => {
        if (!logged && !cart.length){
         let cartNotLogged =  localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
           dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
    }, [logged]);



    useEffect(() => {
      if(cartNotLogged.length){
        localStorage.setItem('cartNotlogged' , JSON.stringify(cartNotLogged));
      }
    }, [cartNotLogged]);

    useEffect(() => {
      if(cart.length){
        localStorage.setItem('cart' , JSON.stringify(cart));
      }
    }, [cart]);


    useEffect(() => {
         dispatch(startCalculateTotalSale());
    }, [cart , cartNotLogged]);

    useEffect(() => {
        if(success){
            router.push('/checkout'); 
        }
    }, [success]);


    return (
        <Layout>
            <BannerImage
              title="Mi Carrito"
              imageBackground="bg-about-us"
           />
            <section className="max-w-[1480px] mx-auto my-20 px-[15px] w-full">
               <div className="grid grid-cols-12 gap-1">
                 <div className="block col-span-12 lg:col-span-12 xl:col-span-8 mb-10 overflow-auto">
                    <CartMobile/>
                 </div>
                 <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4 md:mx-[5px] lg:mx-[5px] xl:mx-[5px] mx-[25px]">
                  <CartTotals/>
                 </div>
               </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store)=> async(ctx)=>{
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadShoppingCart(ctx.req.cookies.token));
    await store.dispatch(startGetDirections(ctx.req.cookies.token))
  
});


export default ShoppingCart;