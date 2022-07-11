import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { startLoadCategories } from '../../src/actions/categoryActions';
import { Newsletter } from '../../src/components/home';
import Layout from '../../src/components/Layouts';
import { CardProduct } from '../../src/components/ui';
import { BannerImage } from '../../src/components/ui/bannerImage';
import { wrapper } from '../../src/store';
import { shoppingCartNotLoggedfromLocalStorage } from '../../src/actions/shoppingCartActions';
import { useEffect } from 'react';
import { startLoadFaqsCategories } from '../../src/actions/faqsActions';
import { Breadcrumbs, Grid, Typography } from '@mui/material';
import { GoHome } from "react-icons/go";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Categories = () => {
    const history = useRouter();
    const dispatch = useDispatch();
    const { logged } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.categories);
    const { categories: categoriesFasq } = useSelector((state) => state.faqs);

    const handleClickCard = (url) => {
        history.push(`/categorias/${url}`)
    }

    return (
        <Layout
            title="Wapizima - Categorías"
            robots="index, follow"
            categories={categoriesFasq}
        >
            <BannerImage
                title="Categorías"
                banner="bg-banner3"
            />
            <div className="container mx-auto my-20 px-5 lg:px-24">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Breadcrumbs
                            aria-label="breadcrumb"
                            separator={<NavigateNextIcon fontSize="small" />}
                        >
                            <Link href="/" passHref>
                                <div className="flex items-center justify-between cursor-pointer">
                                    <GoHome />
                                    <span className="text-lg font-Poppins ml-3 ">Inicio</span>
                                </div>
                            </Link>
                            <Typography variant="subtitle1" className="text-base font-Poppins text-[#e91e63]">
                                Categorias
                            </Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                    {categories?.map((category) => (
                        category.totalProducts > 0 && (
                            <CardProduct
                                image={category.imageWeb}
                                name={category?.name}
                                url={category?.url}
                                hasName={true}
                                titleButton="Ver más..."
                                handleClickCard={handleClickCard}
                                height={350}
                                width={400}
                            />
                        )
                    ))}
                </div>
            </div>
            <Newsletter />
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
    return {
        revalidate: 300
    }
});


export default Categories;