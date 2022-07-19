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
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Brands = () => {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.brands);
  const history = useRouter();
  const { logo } = useSelector((state) => state.administrable);
  const { categories } = useSelector((state) => state.faqs);

  const handleClickCard = (url) => {
    history.push(`/marcas/${url}`)
  }

  const origin = typeof window === "undefined" ? "" : window.location.href;

  return (
    <Layout
      title="Wapizima - Marcas"
      robots="index, follow"
      categories={categories}
      keywords={`Wapizima, Categorías, ${brands.map(brand => brand?.name)}`}
      ogTitle="Wapizima - Marcas"
      ogType="website"
      ogImage={logo}
      description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones , descuentos y mucho más."
      ogUrl={origin}
      canonical={origin}
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
                  <HomeIcon />
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