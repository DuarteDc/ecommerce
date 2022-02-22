module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'principal': {
          100: '#f68e16',
          200: '#FF8900',
          300: '#f68e15'
        },
        'luz': '#FFFFFF',
        'white-dg':'#f1f1f1',
        'wine':'#ff0000'
      },
      backgroundImage: {
        'imgcreateaccount': "url('/assets/images/login.jpeg')",
        'imgcreateaccountc': "url('/assets/images/createAccount.jpeg')",
        'imgpasswvalidation': "url('/assets/images/imgPWV.png')",
        'imgverification': "url('/assets/images/imgverification.png')"
      },
      screens: {
        'peque': { 'max': '639px' },
        'biggr': { 'min': '1441px', 'max': '1920px' }
      }
    },
  },
  plugins: [],
}
