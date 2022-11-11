
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { ProductSlider } from './';
import { useQueryParams } from '../../hooks/useQueryParams';
import LoadingScreen from '../LoadingScreen';


const endpoint = '/brands/with/categories';


export const ProductsArea = () => {

  const router = useRouter();

  const { startSearchByQueryParams, loading } = useQueryParams(endpoint, { router });

  const { products } = useSelector((state) => state.products);


  const searchByCategory = async (brand_id, category_id) => {
    await startSearchByQueryParams({ brand_id, category_id });
  }


  return (
    <>
      {loading && (<LoadingScreen />)}
      <section className="bg-luz pb-8 px-2  md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
        <div className="w-full mx-auto">
          <div>
            {
              products?.brands?.map(({ _id, name, categories, products, url }) => (
                <ProductSlider
                  key={_id}
                  brand_id={_id}
                  name={name}
                  categories={categories}
                  products={products}
                  search={searchByCategory}
                  brand_url={url}
                />
              ))
            }
          </div>
          {/* <div className="w-50 my-5 flex justify-center items-center flex-wrap">
            <Link href="/productos">
              <span
                className="cursor-pointer text-luz mt-4 mx-16 border-solid inline-block py-3 pl-12 pr-12 leading-normal rounded-sm uppercase font-normal text-sm border-2 bg-[#e91e63] border-[#e91e63] hover:bg-[#fff] hover:text-[#000] hover:border-[#D80D82] transition duration-700 ease-in-out font-Poppins 
                 "
              >
                Ver más
              </span>
            </Link>
          </div> */}
        </div>
      </section>
    </>
  );
};
