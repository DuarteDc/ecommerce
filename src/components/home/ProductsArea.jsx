import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Joyride, { ACTIONS, CallBackProps, EVENTS, STATUS, Step } from 'react-joyride';
import { useMeasure, useMount, useSetState } from "react-use";
import { ProductSlider } from './';
import { useToggle } from '../../hooks/useToggle';
import { useRouter } from 'next/router';
import { useQueryParams } from '../../hooks/useQueryParams';
import styles from '../../components/styles.module.css';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


const endpoint = '/products/filter/products';

export const ProductsArea = () => {


  const [ref, { width }] = useMeasure();

  const [{ run, stepIndex, steps }, setState] = useSetState({
    run: false,
    stepIndex: 0,
    steps: [{
      content: (
        <>
          <span
            aria-label="Open react-modal in a new window"
          >
            Desliza hacía la izquierda para ver los productos que tenemos para tí.
          </span>
          <span>  
            <center>
              <img src="/assets/images/scroll.png" alt="scroll" width="100" height="100" id='horizontal-scroll' className={` ${styles.img}`}/>
            </center>
          </span>
        </>
      ),
      disableBeacon: true,
      continuous:false,
      target: '.app__carousel',
    },
    ],
  });

  useEffect(() => {
    const tourUI = Cookies.get('tourUI') || Cookies.set('tourUI', 'true');
    if(tourUI == 'true') setState({ run: true });
  }, []);


  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND]).includes(type)) {
      // Update state to advance the tour
      setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
      Cookies.set('tourUI', 'false');
    } else if (([STATUS.FINISHED, STATUS.SKIPPED]).includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      setState({ run: false });
      Cookies.set('tourUI', 'false');
    }


  };

  const router = useRouter();

  const { brandsWithCategories } = useSelector((state) => state.brands);
  const { dimensions } = useSelector(state => state.ui);
  const [openSearch, setOpenSearch] = useToggle(false);
  const [tabActive, setTabActive] = useState(null);

  const { queryParams, startSearchByQueryParams } = useQueryParams(endpoint, { router });

  const [query, setQuery] = useState("");

  const handleSelectTab = async (brand_id) => {
    await startSearchByQueryParams({ brand_id: brand_id });
  };

  const onRequestSearch = async (event) => {
    event.preventDefault();
    if (!query) return;
    router.push({
      pathname: "/buscar/[product]",
      query: { product: query },
    });
  }; 


  return (
    <>
      <section className="bg-luz pb-8 px-8  md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
        <div className="w-full mx-auto">
          <div>
            <Joyride
              callback={handleJoyrideCallback}
              continuous={false}
              hideBackButton={false}
              run={run}
              scrollToFirstStep
              showSkipButton={false}
              stepIndex={stepIndex}
              steps={steps}
            />
          </div>
          <div ref={ref} className="app__carousel">
            {
              brandsWithCategories.map(({ _id, name, categories, products }) => (
                <ProductSlider
                  key={_id}
                  brand_id={_id}
                  name={name}
                  categories={categories}
                  products={products}
                />
              ))}
          </div>
          <div className="w-50 my-5 flex justify-center items-center flex-wrap">
            <Link href="/productos">
              <span
                className="cursor-pointer text-luz mt-4 mx-16 border-solid inline-block py-3 pl-12 pr-12 leading-normal rounded-sm uppercase font-normal text-sm border-2 bg-[#e91e63] border-[#e91e63] hover:bg-[#fff] hover:text-[#000] hover:border-[#D80D82] transition duration-700 ease-in-out font-Poppins 
                 "
              >
                Ver más
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
