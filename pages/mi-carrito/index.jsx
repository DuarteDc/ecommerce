import React, { useEffect } from 'react'
import Layout from '../../src/components/Layouts'
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import { CartMobile, CartTotals } from '../../src/components/cart';
import { shoppingCartNotLoggedfromLocalStorage, startCalculateTotalSale, startGetDirections, startLoadShoppingCart } from '../../src/actions/shoppingCartActions';
import { useRouter } from 'next/router';

import { startLoadFaqsCategories } from '../../src/actions/faqsActions';

import Cookies from 'js-cookie';

import { Modal } from "../../src/components/ui/modal";

import { useToggle } from '../../src/hooks/useToggle';
import FormAddress from '../../src/components/cart/FormAddress';
import BusinessRules from '../../src/components/businessRules/BusinessRules';
import FormCountry from '../../src/components/ui/FormCountry';
import { startLoadCountries, startLoadCurrencies } from '../../src/actions/countryAcctions';

const ShoppingCart = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const { cart, cartNotLogged, success, coupon, subtotalWithCoupon } = useSelector((state) => state.cart);
  const { logged, user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.faqs);

  const [open, toggle] = useToggle();
  const [openBusinessRule, toggleBusinessRule] = useToggle();
  const [openSelectCountry, toggleSelectCountry] = useToggle();

  useEffect(() => {
    if (!logged && !cart.length) {
      let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged, router]);



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

  useEffect(() => {
    if (router.pathname === 'mi-carrito') {
      router.prefetch(router.asPath);
    }
  }, [router])

  const handleOpenFormAddress = () => {
    if (!logged) {
      router.push(`/auth/login?p=${router.asPath}`);
      return;
    }

    if (!user.email_verified) {
      router.push(`/verificar-cuenta`);
      return;
    }
    toggleSelectCountry();
  }

  return (
    <Layout categories={categories}>
      <BannerImage
        title="Mi Carrito"
        banner="bg-banner2"
      />
      <section className="max-w-[1480px] mx-auto my-20 w-full min-h-screen">
        <div className="container grid grid-cols-1 lg:grid-cols-3 mx-auto">
          <div className="lg:col-span-2  mx-[25px] overflow-x-hidden">
            <CartMobile />
          </div>
          <div>
            <CartTotals
              toggleBusinessRule={toggleBusinessRule}
              toggleSelectCountry={handleOpenFormAddress}
            />
          </div>
        </div>
      </section>
      <Modal
        open={open}
        handleOpenCheckout={toggle}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <FormAddress toggle={toggle} />
      </Modal>
      <Modal
        open={openSelectCountry }
        handleOpenCheckout={handleOpenFormAddress}
        actions={false}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <FormCountry toggle={toggle} toggleSelectCountry={toggleSelectCountry} type={2} />
      </Modal>
      <Modal
        open={openBusinessRule}
        handleOpenCheckout={toggleBusinessRule}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        {/* <h2 className="font-bold uppercase text-xl mb-2">Descuentos</h2> */}
        <BusinessRules />
      </Modal>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadShoppingCart(ctx.req.cookies.token));
  await store.dispatch(startGetDirections(ctx.req.cookies.token)),
    await store.dispatch(startLoadFaqsCategories());
    await store.dispatch(startLoadCurrencies());
  await store.dispatch(startLoadCountries());

});


export default ShoppingCart;