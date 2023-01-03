export const pages = ['/', '/productos', '/distribuidor', '/categorias', '/marcas', '/contacto', '/acerca-de-nosotros', '/auth/login', '/auth/register', '/mi-carrito', '/mi-lista-de-deseos'];

const PagesSitemap = () => { };

export const getServerSideProps = ({ res }) => {

  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://wapizima.com",
  }[process.env.NODE_ENV];
  ;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
      .map((page) => {
        return `
            <url>
              <loc>${baseUrl + page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
      })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default PagesSitemap;