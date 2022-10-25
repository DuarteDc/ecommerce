import { writeFileSync } from 'fs';
import RSS from 'rss';
import { helpers } from '../helpers';

import { loadBrands, startLoadProductsPerBrand, startLoadProductsRSS } from '../actions/productsAction';

export default async function getRSSForGoogle() {

    const { textToRSSFeed, priceFormat, calculatNewTotalToPay } = helpers;

    const siteURL = 'https://wapizima.com';

    const products = await startLoadProductsRSS();
    const feed = new RSS({
        title: "Wapizima",
        description: "Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más.",
        site_url: siteURL,
        feed_url: `${siteURL}/google-feed.xml`,
        language: "es",
        pubDate: new Date(),
        copyright: `All rights reserved ${new Date().getFullYear()}, Digiatl Pineapple`,
    });


    products?.map((product) => {
        const { totalWithDiscountApply } = calculatNewTotalToPay(product.discount, product.price);
        feed.item({
            custom_elements: [
                { 'g:id': product._id },
                { 'd:title': textToRSSFeed(product.name) },
                { 'd:description': product.description },
                { 'link': `${siteURL}/productos/${product?.url}` },
                { 'g:mobile_link': `${siteURL}/productos/${product?.url}` },
                { 'g:additional_image_link': product?.multimedia[0]?.path },
                { 'g:availability': product.quantity > 0 ? 'in_stock' : 'out_of_stock' },
                { 'g:availability_date': product.updatedAt },
                { 'g:price': `${priceFormat(product.price)} MXN` },
                (product.discount > 0) && { 'g:sale_price': `${priceFormat(totalWithDiscountApply)} MXN` },
                { 'g:brand': product?.brand?.name },
                { 'g:gtin': product?.barcode },
                { 'g:gender': 'unisex'}
            ]
        });
    });
    writeFileSync(`./public/google-feed.xml`, feed.xml({ indent: true }));

}