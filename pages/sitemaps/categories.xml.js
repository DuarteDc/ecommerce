import client from "../../src/config/axiosConfig";
import { wrapper } from "../../src/store";

const CategorySitemap = () =>{};

export const getServerSideProps = wrapper.getServerSideProps((store)=> 
 async ({res})=>{
   const baseUrl = {
        development: "http://localhost:3000",
        production: "https://test.wapizima.com",
      }[process.env.NODE_ENV];

    const {data} = await client.get('/categories');
    const categories = data.categories.map(category=>{
      let url = `${baseUrl}/categorias/${category.url}`;
      return url;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${categories
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
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
    props: {}
  };
})

export default CategorySitemap;