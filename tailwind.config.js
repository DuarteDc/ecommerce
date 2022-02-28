module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'second': {
          100: '#47000e',
        },
        'luz': '#FFFFFF',
        'black':'#880e4f',
        'white-dg':'#f1f1f1',
        'wine':'#ff0000'
      },
      backgroundImage: {
        'imgcreateaccount': "url('/assets/images/login.jpeg')",
        'imgcreateaccountc': "url('/assets/images/createAccount.jpeg')",
        'imgpasswvalidation': "url('/assets/images/imgPWV.png')",
        'imgverification': "url('/assets/images/imgverification.png')",
        'shop-cart': "url('/assets/images/shop-cart.png')"
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
