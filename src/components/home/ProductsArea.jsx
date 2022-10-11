import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import { Tabs, Search, ProductCart, ProductCard } from '../ui';
import { ProductSlider } from './';
import ProductCardMobile from '../ui/Mobile/ProductCard';

import { useToggle } from '../../hooks/useToggle';

import { useRouter } from 'next/router';

import { useQueryParams } from '../../hooks/useQueryParams';

const endpoint = '/products/filter/products';

export const ProductsArea = () => {

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
          {/* <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
            <h2 className="font-Poppins text-[25px] uppercase font-lg  text-[#222] text-center font-semibold">
              Te recomendamos
            </h2> */}
          {/* </div> */}

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
          {
            brandsWithCategories.map(({_id,name,categories,products})=>(
              <ProductSlider
                key={_id}
                brand_id={_id}
                name={name}
                categories={categories}
                products={products}
              />
          ) ) } 
          {/* <div
            className="
               grid 
               grid-cols-2 
               gap-2 
               lg:grid-cols-3 
               lg:gap-3 
               xl:grid-cols-4
               flex-wrap 
               relative"
          >
            {
              products?.products?.map((product) => (
                dimensions === 'sm' ? (
                  <ProductCardMobile key={product._id} product={product} />
                ):(
                  <ProductCard key={product._id} product={product} />
                )


              ))}
          </div> */}
          <div className="w-50 my-5 flex justify-center items-center flex-wrap">
            <Link href="/productos">
              <span
                className="text-luz mt-4 mx-16 border-solid inline-block py-3 pl-12 pr-12 leading-normal rounded-sm uppercase font-normal text-sm border-2 bg-[#e91e63] border-[#e91e63] hover:bg-[#fff] hover:text-[#000] hover:border-[#D80D82] transition duration-700 ease-in-out font-Poppins cursor-pointer
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
