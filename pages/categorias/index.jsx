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
import { Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import { GoHome } from "react-icons/go";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Categories = () => {
    const history = useRouter();
    const dispatch = useDispatch();
    const { logged } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.categories);
    const { categories : categoriesFasq } = useSelector((state) => state.faqs);

    useEffect(() => {
        if (!logged) {
            let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
            dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
    }, [logged]);


    const handleClickCard = (url) => {
        history.push(`/categorias/${url}`)
    }

    return (
        <Layout
            title="Wapizima - Categorias"
            robots="noindex"
            categories={categoriesFasq}
        >
            <BannerImage
                title="Categorias"
            />
            <Container className="my-20">
                <Grid container spacing={5}>
                 <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                   <Breadcrumbs 
                      aria-label="breadcrumb"
                      separator={<NavigateNextIcon fontSize="small" />}
                   >
                       <Link href="/">
                       <div className="flex items-center justify-between cursor-pointer">
                       <GoHome/>
                       <span className="text-lg font-Poppins ml-3 ">Inicio</span>
                       </div>
                       </Link>
                       <Typography variant="subtitle1" className="text-base font-Poppins text-[#1976d2]">
                         Categorias
                       </Typography>
                   </Breadcrumbs>
                 </Grid>
                 {categories?.map((category) => (
                 <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={category?._id}>
                 <div className="mx-auto">
                  <CardProduct
                            
                            image={category.imageWeb}
                            name={category?.name}
                            url={category?.url}
                            titleButton="Ver más..."
                            handleClickCard={handleClickCard}
                            height={300}
                            width={400}
                        />
                  </div>  
                 </Grid>
                 ))}
                </Grid>

           
            </Container>
            <Newsletter />
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
    return {
        revalidate: 480
    }
});


export default Categories;