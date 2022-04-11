import React, { useEffect, useState } from 'react'
import Layout from '../../src/components/Layouts'
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import { Cart, CartTotals } from '../../src/components/cart';
import { shoppingCartNotLoggedfromLocalStorage, startCalculateTotalSale, startLoadShoppingCart } from '../../src/actions/shoppingCartActions';
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
                 <div className="md:col-span-6 lg:col-span-8">
                   <Cart/>
                 </div>
                 <div className="md:col-span-6 lg:col-span-4">
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
  
});


export default ShoppingCart;