import Head from "next/head"

export const Meta = ({title , keywords , description , ogTitle , ogType , ogUrl , ogImage , robots}) =>{

    return(
        <Head>
            <meta name="robots" content={robots}/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@wapizima" />
            <meta name="twitter:creator" content="@wapizima" />
            <meta name="keywords" content={keywords}></meta>

            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType}/>
            <meta property="og:title" content={ogTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Poppins:wght@200;300;700&display=swap" rel="stylesheet" />
            
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-GRWCEYYWSK"></script>
            <script dangerouslySetInnerHTML={{
                __html:`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
                `,
            }}
            />

            <title>{title}</title>
        </Head>
    )

}