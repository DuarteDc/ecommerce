import React, { useEffect } from 'react'
import Layout from '../../src/components/Layouts'
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import { CartMobile, CartTotals } from '../../src/components/cart';
import { shoppingCartNotLoggedfromLocalStorage, startCalculateTotalSale, startGetDirections, startLoadShoppingCart } from '../../src/actions/shoppingCartActions';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';
import { startLoadFaqsCategories } from '../../src/actions/faqsActions';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cart, cartNotLogged, success, coupon, subtotalWithCoupon } = useSelector((state) => state.cart);
  const { logged } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.faqs);

  useEffect(() => {
    if (!logged && !cart.length) {
      let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged]);



  useEffect(() => {
    if (cartNotLogged.length) {
      localStorage.setItem('cartNotlogged', JSON.stringify(cartNotLogged));
    }
  }, [cartNotLogged]);

  useEffect(() => {
    if (cart.length) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);


  useEffect(() => {
    dispatch(startCalculateTotalSale());
  }, [cart, cartNotLogged, subtotalWithCoupon, coupon]);

  useEffect(() => {
    if (success) {
      router.push('/checkout');
    }
  }, [success]);


  return (
    <Layout categories={categories}>
      <BannerImage
        title="Mi Carrito"
        imageBackground="bg-about-us"
      />
      <section className="max-w-[1480px] mx-auto my-20 px-[15px] w-full">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <CartMobile />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <CartTotals />
          </Grid>
        </Grid>
      </section>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadShoppingCart(ctx.req.cookies.token));
  await store.dispatch(startGetDirections(ctx.req.cookies.token)),
    await store.dispatch(startLoadFaqsCategories());

});


export default ShoppingCart;