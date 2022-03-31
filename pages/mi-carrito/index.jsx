import React, { useEffect, useState } from 'react'
import Layout from '../../src/components/Layouts'
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import Cookie from 'js-cookie';
import { Cart, CartTotals } from '../../src/components/cart';
import { startCalculateTotalSale } from '../../src/actions/shoppingCartActions';

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        if(cart.length > 0){
         Cookie.set('shoppingCart' , JSON.stringify(cart));

        }
       
    }, [cart]);

    useEffect(() => {
        dispatch(startCalculateTotalSale());
    }, [cart]);

    return (
        <Layout>
            <BannerImage
              title="Mi Carrito"
              imageBackground="bg-about-us"
           />
            <section className="max-w-[1480px] mx-auto my-20 px-[15px] w-full">
               <div className="grid grid-cols-12 gap-1">
                 <div className="col-span-8">
                   <Cart/>
                 </div>
                 <div className="col-span-4">
                  <CartTotals/>
                 </div>
               </div>
            </section>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store)=> async()=>{
    await store.dispatch(startLoadAdministrableLogo());
    return{
        revalidate:3600
    }
});


export default ShoppingCart;