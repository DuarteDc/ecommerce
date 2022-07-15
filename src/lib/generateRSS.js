import { writeFileSync } from 'fs';
import RSS from 'rss';

import { helpers } from '../helpers';

import { startLoadProductsRSS } from '../actions/productsAction';

export default async function getRSS() {

  const siteURL = 'https://wapizima.com';

  const products = await startLoadProductsRSS();

  const feed = new RSS({
    title: "Wapizima",
    description: "Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más.",
    site_url: siteURL,
    feed_url: `${siteURL}/feed.xml`,
    language: "es",
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Digiatl Pineapple`,
  });

  products?.map((product) => {
    feed.item({
      title: product.name,
      url: `${siteURL}/productos/${product.url}`,
      date: product.createdAt,
      description: product.description,
      custom_elements: [
        { 'id': product._id},
        { 'availability': product.quantity > 0 ? 'in stock' : 'out of stock' },
        { 'condition': 'used' },
        { 'price': helpers.priceFormat(product.price) },
        { 'link': `${siteURL}/productos/${product.url}` },
        { 'image_link': product.multimedia[0].path, },
        { 'brand': product.brand.name },
      ]
    });
  });

  // id: product._id,
  // title: product.name,
  // link: `${siteURL}/productos/${product.url}`,
  // availability: product.quantity,
  // date: product.createdAt,
  // description: product.description,
  // condition: 'used',
  // price: helpers.priceFormat(product.price),
  // image_link: product.multimedia[0].path,
  // brand: product.brand.name,

  writeFileSync("./public/feed.xml", feed.xml({ indent: true }));
}