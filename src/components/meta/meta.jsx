import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadWishListfromLocalStorage } from "../../actions/wishListActions";
import { startVerifyToken } from "../../actions/authActions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const Meta = ({
  title,
  canonical,
  keywords,
  description,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
  robots,
  price,
  curren,
  structuredData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const verifyToken = async() => {
    const token = await Cookies.get("token");
    if (token) {
      await dispatch(startVerifyToken(token));
    }
  }

  // useEffect(() => {
  //   verifyToken();
  // }, [router]);

  useEffect(() => {
    verifyToken();
    const localStorageWishList = localStorage.getItem("wishListProducts")
      ? JSON.parse(localStorage.getItem("wishListProducts"))
      : [];
    dispatch(loadWishListfromLocalStorage(localStorageWishList));
  }, [router]);



  return (
    <Head>
      <meta name="robots" content={robots} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@wapizima" />
      <meta name="twitter:creator" content="@wapizima" />
      <meta name="keywords" content={keywords}></meta>
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {price && <meta property="product:price:amount" content={price} />}
      {curren && <meta property="product:price:currency" content={curren} />}
      <link rel="canonical" href={canonical} />

      <title>{title}</title>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W679KG2"
          height="0" width="0" style={{display: 'none', visibility:'hidden'}}></iframe>`,
        }}
      ></noscript>

      <script
        dangerouslySetInnerHTML={{
          __html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W679KG2');
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '623666845851164');
          fbq('track', 'PageView');
          `,
        }}
      />
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
        <img
          height="1"
          width="1"
          style="display:none"
          src="https://www.facebook.com/tr?id=623666845851164&ev=PageView&noscript=1"
        />
        `,
        }}
      ></noscript>
    </Head>
  );
};
