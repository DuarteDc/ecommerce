import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import Layout from '../../src/components/Layouts';
import Card from '../../src/components/Layouts/Card';
import CategoriesList from '../../src/components/categories/CategoriesList';

import { wrapper } from '../../src/store';
import { clearAllFilter, filterProducts, startLoadProductsPerBrand } from '../../src/actions/brandsActions';
import { startLoadCategories } from '../../src/actions/categoryActions';
import { removeCategory, clearAll } from '../../src/actions/productsAction';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';
import { TagList } from '../../src/components/tags/TagsList';
import { startLoadTags } from '../../src/actions/tagsActions';
import { useEffect } from 'react';

const Show = () => {

    const router = useRouter();
    const { query } = router;
    const dispatch = useDispatch();

    const { brand, filteredProducts, categoriesSelected } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.categories);
    const { tags } = useSelector((state) => state.tags);

    const getCurrentData = async () => {
        const data = await dispatch(filterProducts(query.tag, query.category, query.lowPrice, query.maxPrice));
        console.log(data);
    }

    useEffect(() => {
        if (query.hasOwnProperty('tag') || query.hasOwnProperty('category') || query.hasOwnProperty('lowPrice') || query.hasOwnProperty('maxPrice')) {
            getCurrentData();
        }
    }, [router.query]);


    return (
        <Layout>
            <div className="h-96 overflow-hidden hidden md:block">
                <BannerImage
                    title={`${brand.name}`}
                />
            </div>
            <section className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="p-5">
                        <div className="p-4 md:h-screen w-full">
                            <div className="mb-5">
                                <p className="uppercase font-bold text-xl">Seleccion actual</p>
                                <div className="flex flex-row-reverse text-xs">
                                    <span className="inline-flex text-gray-500 hover:text-black cursor-pointer items-center">
                                        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                                        <p>Limpiar todo</p>
                                    </span>
                                </div>
                                <div>
                                    {
                                        categoriesSelected?.map((param) => (
                                            <div
                                                key={param?.id}
                                                className="hover:border-black hover:text-black cursor-pointer  mr-2 mt-2 py-2 border-2 border-gray-200 px-2 text-center inline-block transition-all duration-700 ease-out text-xs text-gray-500"
                                            >
                                                {param?.name}
                                                <CloseIcon className="hover:text-red-500" sx={{ fontSize: 15 }} onClick={() => handleRemoveCategory(param)} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <CategoriesList categories={categories} />
                            <TagList tags={tags} brand={brand} />
                        </div>
                    </div>
                    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-60">
                        {
                            categoriesSelected.length > 0 ? (
                                filteredProducts?.map(product => (
                                    <Card key={product?._id} product={product} />
                                ))
                            ) : (
                                brand?.data?.map(product => (
                                    <Card key={product?._id} product={product} />
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {

        await store.dispatch(startLoadProductsPerBrand(ctx.query.url));
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadTags());
        await store.dispatch(startLoadAdministrableLogo());

    })

export default Show;