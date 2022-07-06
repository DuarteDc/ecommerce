import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { wrapper } from "../../src/store";
import Layout from "../../src/components/Layouts"
import { useDispatch, useSelector } from "react-redux";

// actions
import { startLoadBrands } from "../../src/actions/brandsActions";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { shoppingCartNotLoggedfromLocalStorage } from "../../src/actions/shoppingCartActions";

import { CardProduct, BannerImage } from "../../src/components/ui";
import { Newsletter } from "../../src/components/home";
import { Breadcrumbs, Grid, Typography } from "@mui/material";
import { GoHome } from "react-icons/go";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Brands = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const history = useRouter();
  const { logged } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.faqs);

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
        banner="bg-banner8"
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
                Marcas
              </Typography>
            </Breadcrumbs>
          </Grid>
          {
            brands.map(brand => (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} key={brand._id}>
                <CardProduct
                  image={brand.image}
                  name={brand.name}
                  hasName={false}
                  url={brand.url}
                  titleButton="Ver más.."
                  handleClickCard={handleClickCard}
                  height={370}
                  width={400}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>
      <Newsletter />
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {

  await store.dispatch(startLoadBrands());
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadFaqsCategories());
  return {
    revalidate: 3600
  }

});



export default Brands;