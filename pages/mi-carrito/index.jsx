import React, { useEffect } from 'react'
import Layout from '../../src/components/Layouts'
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from '../../src/store';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import { CartMobile, CartTotals } from '../../src/components/cart';
import { shoppingCartNotLoggedfromLocalStorage, startCalculateTotalSale, startGetDirections, startLoadCartNoAuth, startLoadShoppingCart } from '../../src/actions/shoppingCartActions';
import { useRouter } from 'next/router';

import { startLoadFaqsCategories } from '../../src/actions/faqsActions';

import Cookies from 'js-cookie';

import { Modal } from "../../src/components/ui/modal";

import { useToggle } from '../../src/hooks/useToggle';
import FormAddress from '../../src/components/cart/FormAddress';
import BusinessRules from '../../src/components/businessRules/BusinessRules';
import FormCountry from '../../src/components/ui/FormCountry';
import { startLoadCountries, startLoadCurrencies } from '../../src/actions/countryAcctions';
import { helpers } from '../../src/helpers';

const ShoppingCart = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const currency = Cookies.get('Currency') || '';
  const token = Cookies.get('token');

  const { logged, user } = useSelector((state) => state.auth);
  const { cart, coupon, subtotalWithCoupon } = useSelector((state) => state.cart);

  const { categories } = useSelector((state) => state.faqs);

  const [open, toggle] = useToggle();
  const [openBusinessRule, toggleBusinessRule] = useToggle();
  const [openSelectCountry, toggleSelectCountry] = useToggle();

  useEffect(() => {
    dispatch(startGetDirections(token));
  }, []);

  useEffect(() => {
    dispatch(startCalculateTotalSale(cart, logged));
  }, [coupon, subtotalWithCoupon, cart]);

  const handleOpenFormAddress = () => {

    if (!logged) return router.push(`/auth/login?p=${router.asPath}`);

    if (!user.email_verified) return router.push(`/verificar-cuenta`);

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
        open={openSelectCountry}
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

export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
    await store.dispatch(startLoadCurrencies());
    await store.dispatch(startLoadCountries());

  });


export default ShoppingCart;