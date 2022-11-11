module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':"#333",
        'secondary':"#fff",
        'second': {
          100: '#47000e',
        },
        'luz': '#FFFFFF',
        'black':'#880e4f',
        'white-dg':'#f1f1f1',
        'wine':'#ff0000'
      },
      backgroundImage: {
        'register': "url('/assets/images/register.png')",
        'imgcreateaccount': "url('/assets/images/login.jpeg')",
        'imgcreateaccountc': "url('/assets/images/createAccount.jpeg')",
        'imgpasswvalidation': "url('/assets/images/imgPWV.png')",
        'imgverification': "url('/assets/images/imgverification.png')",
        'shop-cart': "url('/assets/images/shop-cart.png')",
        'about-us':"url('/assets/images/bg-01.jpg')",
        'testimonial':"url('/assets/images/testimonial.jpg')",
        'influerncer':"url('/assets/images/influencer1.png')",
        'login':"url('/assets/images/login.jpg')",
        'entrega-de-pedidos':"url('/assets/icons/entrega-de-pedidos.png')",
        'address-billing':"url('/assets/images/addressBilling.png')",
        'offers':"url('/assets/images/bg-offers1.webp')",
        'oferta-ejemplo':"url('/assets/images/oferta-ejemplo.webp')",
        'banner1':"url('/assets/banners/1.jpg')",
        'banner2':"url('/assets/banners/2.jpg')",
        'banner3':"url('/assets/banners/3.jpg')",
        'banner4':"url('/assets/banners/4.jpg')",
        'banner5':"url('/assets/banners/5.jpg')",
        'banner6':"url('/assets/banners/6.jpg')",
        'banner7':"url('/assets/banners/7.jpg')",
        'banner8':"url('/assets/banners/9.jpg')",
        'banner9':"url('/assets/banners/10.jpg')",
        'banner10':"url('/assets/banners/11.jpg')",
        'banner11':"url('/assets/banners/12.jpg')",
        'banner12':"url('/assets/banners/13.jpg')",
        'banner13':"url('/assets/banners/14.jpg')",
        'banner14':"url('/assets/banners/15.jpg')",
        'banner15':"url('/assets/banners/19.png')",
        'banner16':"url('/assets/banners/17.png')",
        'banner17':"url('/assets/banners/18.png')",
        'banner18':"url('/assets/banners/distribuidor.jpg')",
      },
      screens: {
        'peque': { 'max': '639px' },
        'biggr': { 'min': '1441px', 'max': '1920px' }
      },
      fontFamily:{
        'Poppins':['Poppins']
      }
    },
  },
  plugins: [],
}
