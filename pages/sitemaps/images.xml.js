import client from '../../src/config/axiosConfig';

const URL = {
    development: "http://localhost:3000",
    production: "https://wapizima.com",
}[process.env.NODE_ENV];


const generateSitemap = (products) => {

    return `<?xml version="1.0" encoding="UTF-8"?> <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${products.map(({ url, multimedia }) => {
        return `<url>
            <loc>${URL}/productos/${url}</loc>
            ${multimedia.map(({ path }) => {
            return `<image:image>
                <image:loc>${path}</image:loc>
            </image:image>
                `
        }).join('')}
        </url>
            `
    }).join('')
        }
</urlset>
    `;

}

const ImagesSitemap = () => { };

export async function getServerSideProps({ res }) {

    const { data } = await client.get('/products/sitemap');
    const { products } = data;

    const sitemap = generateSitemap(products);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    }
}


export default ImagesSitemap;