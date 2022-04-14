export const types = {

    login: '[AUTH] loggin ecommerce start',
    logout: '[AUTH] logout ecommerce start',
    check_token: '[AUTH] check token',
    register: '[AUTH] register',
    resetPassword: '[AUTH] reset password client',
    forgotPassword: '[AUTH] forgot password client',

    loadProducts: '[PRODUCTS] start load products',
    addProductSelected: '[PRODUCTS] add product selected',
    loadProduct: '[PRODUCT] load product',
    filterProducts: '[PRODUCTS] filter products',
    remove_filter: '[PRODUCTS] remove brand to braindsSelected',
    clear_all_filter: '[PRODUCTS] clear all filters',
    load_products_per_category: '[PRODUCTS] load products per category',
    load_products_per_brand: '[PRODUCTS] load products per brand',
    load_products_per_pagination: '[PRODUCTS] load products per pagination',
    filters_to_products: '[PRODUCTS] filters to products',

    loadCategories: '[CATEGORIES] start load categories',
    loadCategoriesHome: '[CATEGORIES HOME] start load categories',
    load_products_from_category: '[CATEGORIES] load porducts_form_category',
    filters_to_products_from_categories_with_brands : '[CATEGORIES] filters to products from categories',
    clear_filters_form_categories: '[CATEGORIES] clear filters from categories',

    load_cart_state: '[CART] load cart state',
    add_to_cart: '[CART] add to cart',
    remove_one_from_cart: '[CART] remove one from cart',
    add_one_from_cart: '[CART] add one from cart',
    remove_all_from_cart: '[CART] remove all from cart',
    clear_cart: '[CART] clear cart',

    loadOffers: '[Offers] load offers',

    loadTags: '[TAGS] load tags',

    loadBrand: '[BRANDS] load brand',
    loadBrands: '[BRANDS] start load brands',
    load_products_from_brand: '[BRAND] load products per brand',
    filter_products_per_category_from_brands: '[BRANDS] filter products per category from brands',
    filters_to_products_from_brand: '[BRANDS]filters to products from brand',
    clear_all_filter_from_brands: '[BRANDS] clear all filter from brands',

    loadBrandsHome: '[HOME] load brands with products home',
    addNewsletterSuscription: '[Home] add and show newsletter suscription menssage',
    loadSlidersData: '[Home] load data sliders offers',
    load_products_home: '[HOME] load products home',
    filter_products_from_home: '[HOME] filter products from home',


    loadAdministrableLogo: '[Administrable] load data administrable logo',
    loadAdministrableAbout: '[Administrable] load data administrable about ',

    load_data_user: '[PROFILE] load data user',
    load_directions: '[PROFILE] load directions',
    change_default_addres: '[PROFILE] change default address',
    add_new_address: '[PROFILE] add new address',
    delete_addres: '[PROFILE] delete address',

    addProductShoppingCart:'[ShoppingCart] add product to shopping cart',
    loadShoppingCartFromLocalStorage:'[ShoppingCart] load shopping cart from loadShoppingCartFromLocalStorage',
    updatedProductQuantity:'[ShoppingCart] updated quantity product in shoppingcart',
    calculateTotalShoppingCart:'[ShoppingCart] calculate subtotal and total in shoppingCart',
    finaliceCheckoutCart:'[ShoppingCart]  start finalice checkout cart',
    loadTotalsFromCookies:'[ShoppingCart] load totals checkout from cookies',
    loadShoppingCart:'[ShoppingCart] load shopping cart from database',
    updatedShoppingCart:'[ShoppingCart] updated shoppingCart',
    removeProductShoppingCart:'[ShoppingCart] remove product shoppingcart',

    addProductShoppingCartNoLoggued:'[ShoppingCart] add product to cart clients not logged',
    loadShoppingCartNotLoggedFromLocalStorage:'[ShoppingCart] load shoppingcart clients no logged from localStorage',
    updatedProductQuantityCartNotLogged:'[ShoppingCart] updated products in shopping cart clients not logged',
    deleteProductShoppingCartNotLogged:'[ShoppingCart] delete product in shopping cart clients not logged',
    loadShoppingCartFussion:'[ShoppingCart] load shoppingcart fussion login',


    loadWishListfromLocalStorage:'[WishList] load wishlist from localStorage',


    loadSecretClientStripe : '[Checkout] load secret client stripe',
    loadSecretClientfromCookies : '[Checkout] load secret client from cookies',
    addProductShoppingCart: '[ShoppingCart] add product to shopping cart',
    loadShoppingCartFromCookies: '[ShoppingCart] load shopping cart from cookies',
    updatedProductQuantity: '[ShoppingCart] updated quantity product in shoppingcart',
    calculateTotalShoppingCart: '[ShoppingCart] calculate subtotal and total in shoppingCart',
    finaliceCheckoutCart: '[ShoppingCart]  start finalice checkout cart',
    loadTotalsFromCookies: '[ShoppingCart] load totals checkout from cookies',


    loadWishListfromLocalStorage: '[WishList] load wishlist from localStorage',
    update_data_user: '[PROFILE] update data user',

    load_faqs: '[FAQS] load_faqs',
    load_faqs_categories: '[FAQS] load faqs categories',
    load_faqs_per_category: '[FAQS] load faqs per category',

}