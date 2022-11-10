
const SitemapIndex = () => {};

export const getServerSideProps = ({ res }) => {

  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://wapizima.com",
  }[process.env.NODE_ENV];

  const staticPages = [
    {'id': 1, 'url': 'https://wapizima.com/sitemaps/pages.xml'},
    {'id': 2, 'url': 'https://wapizima.com/sitemaps/products.xml'},
    {'id': 3, 'url': 'https://wapizima.com/sitemaps/brands.xml'},
    {'id': 4, 'url': 'https://wapizima.com/sitemaps/categories.xml'},
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(({url}) => {
          return `
            <sitemap>
              <loc>${url}</loc>
            </sitemap>
          `;
        })
        .join("")}
    </sitemapindex>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SitemapIndex;