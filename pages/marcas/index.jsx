import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { wrapper } from "../../src/store";
import Layout from "../../src/components/Layouts"
import { useDispatch, useSelector } from "react-redux";

// actions
import { startLoadBrandsHome } from "../../src/actions/brandsActions";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { shoppingCartNotLoggedfromLocalStorage } from "../../src/actions/shoppingCartActions";

import { CardProduct , BannerImage } from "../../src/components/ui";
import { Newsletter } from "../../src/components/home";
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import { GoHome } from "react-icons/go";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Brands = () => {
  const dispatch = useDispatch();
  const { brandsHome } = useSelector((state) => state.brands);
  const history = useRouter();
  const { logged } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.faqs);

  useEffect(() => {
    if (!logged) {
      let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged]);


  const handleClickCard = (url) => {
    history.push(`/marcas/${url}`)
  }

  return (
    <Layout
      title="Wapizima - Marcas"
      robots="noindex"
      categories={categories}
    >
      <BannerImage
        title="Marcas"
      />
      <Container className="my-20">
        <Grid container spacing={5}>
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
         <Breadcrumbs 
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small"/>}
         >
           <Link href="/">
            <div className="flex items-center justify-between cursor-pointer">
              <GoHome/>
              <span className="text-lg font-Poppins ml-3 ">Inicio</span>
            </div>
           </Link>
           <Typography variant="subtitle1" className="text-base font-Poppins text-[#1976d2]">
             Marcas
           </Typography>
          </Breadcrumbs>
         </Grid>
         {
            brandsHome.map(brand => (
         <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <CardProduct
                key={brand._id}
                image={brand.image}
                name={brand.name}
                url={brand.url}
                titleButton="Ver más.."
                handleClickCard={handleClickCard}
                width={250}
                height={250}
              />
         </Grid>
          ))
        }
        </Grid>
      </Container>
      <Newsletter />
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(startLoadBrandsHome());
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadFaqsCategories())
  return {
    revalidate: 480
  }
});



export default Brands;