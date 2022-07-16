import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {

  render() {

    return (
      <Html lang="es">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Poppins:wght@200;300;500;700&display=swap" rel="stylesheet" />

          <noscript dangerouslySetInnerHTML={{
            __html: ` <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W679KG2"
          height="0" width="0" style={{display: 'none', visibility:'hidden'}}></iframe>     `,
          }}></noscript>

          <script dangerouslySetInnerHTML={{
            __html: ` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W679KG2');
          `,
        }} />


          <script dangerouslySetInnerHTML={{
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
              </script>
              <noscript><img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=623666845851164&ev=PageView&noscript=1"
          `,
          }} />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}