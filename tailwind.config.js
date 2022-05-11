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
        'register': "url('/assets/images/category.jpg')",
        'imgcreateaccount': "url('/assets/images/login.jpeg')",
        'imgcreateaccountc': "url('/assets/images/createAccount.jpeg')",
        'imgpasswvalidation': "url('/assets/images/imgPWV.png')",
        'imgverification': "url('/assets/images/imgverification.png')",
        'shop-cart': "url('/assets/images/shop-cart.png')",
        'about-us':"url('/assets/images/bg-01.jpg')",
        'testimonial':"url('/assets/images/testimonial.jpg')",
        'login':"url('/assets/images/login.jpg')",
        'entrega-de-pedidos':"url('/assets/icons/entrega-de-pedidos.png')",
        'address-billing':"url('/assets/images/addressBilling.png')",
        'offers':"url('/assets/images/bg-offers1.webp')",
        'oferta-ejemplo':"url('/assets/images/oferta-ejemplo.webp')",

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
