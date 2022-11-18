import { memo } from 'react';

import { useRouter } from 'next/router';
import { ProductSlider } from './';
import { useQueryParams } from '../../hooks/useQueryParams';
import LoadingScreen from '../LoadingScreen';

import { FixedSizeList as List } from 'react-window';

const endpoint = '/brands/with/categories';

const ProductsArea = memo(({ products }) => {

  const router = useRouter();

  const { startSearchByQueryParams, loading } = useQueryParams(endpoint, { router });

  const searchByCategory = async (brand_id, category_id) => {
    await startSearchByQueryParams({ brand_id, category_id });
  }


  return (
    <>
      {loading && (<LoadingScreen />)}
      <section className="bg-luz pb-8 px-2  md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
        <div className="w-full mx-auto">
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
      </section>
    </>
  );
});

export default ProductsArea;

ProductsArea.displayName = 'ProductsArea';