import { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ProductSlider } from './';
import { useRouter } from 'next/router';
import { useRef } from 'react';


const endpoint = '/products/filter/products';

export const ProductsArea = () => {

  const ref = useRef('');


  const router = useRouter();
  const { brandsWithCategories } = useSelector((state) => state.brands);

  return (
    <>
      <section className="bg-luz pb-4  px-4 md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
        <div className="w-full mx-auto">
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
              ))
            }
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
