import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Tabs, Search, ProductCart, ProductCard } from '../ui';
import { ProductSlider } from './';

import { useToggle } from '../../hooks/useToggle';

import { useRouter } from 'next/router';

import { useQueryParams } from '../../hooks/useQueryParams';

const endpoint = '/products/filter/products';

export const ProductsArea = () => {

  const router = useRouter();

  const { brandsHome, brandsWithProducts } = useSelector((state) => state.brands);
  const { products } = useSelector((state) => state.products);
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
        <div className="w-full mx-auto ">
          {/* <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
            <h2 className="font-Poppins text-[25px] uppercase font-lg  text-[#222] text-center font-semibold">
              Te recomendamos
            </h2>
          </div> */}

          {/* <Tabs
            tabActive={tabActive}
            queryParams={queryParams}
            tabsData={brandsWithProducts}
            handleSelectTab={handleSelectTab}
            search={true}
            filter={true}
            handleOpenSearch={setOpenSearch}
          /> */}
          {/* <div className="grid grid-cols-1 gap-1">
            <Search
              openSearch={openSearch}
              placeholder="Buscar..."
              onRequestSearch={onRequestSearch}
              setQuery={setQuery}
            />
          </div> */}
            <ProductSlider
          products={products?.products}
          name='wapizima'/>
            <ProductSlider
          products={products?.products}
          name='Rebel'/>
          {/* <div
            className="
               grid 
               grid-cols-1 
               gap-1 
               md:grid-cols-2 
               md:gap-2 
               lg:grid-cols-3 
               lg:gap-3 
               xl:grid-cols-4
               xl:gap-4  
               2xl:grid-cols-4
               2xl:gap-4
               flex-wrap 
               relative"
          >
            {
              products?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div> */}
          <div className="w-50 my-5 flex justify-center items-center flex-wrap">
            <Link href="/productos">
              <span
                className="text-luz mt-4 mx-16 border-solid inline-block py-3 pl-12 pr-12 leading-normal rounded-sm uppercase font-normal text-sm border-2 bg-[#D80D82] border-[#D80D82] hover:bg-[#fff] hover:text-[#000] hover:border-[#D80D82] transition duration-700 ease-in-out font-Poppins cursor-pointer
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
