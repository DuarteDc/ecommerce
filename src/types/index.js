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
    add_brand_to_filter: '[PRODUCTS] add brand to filter',
    add_category_to_filter: '[PRODUCTS] add category to filter',
    remove_category_to_categoriesSelected: '[PRODUCTS] remove category to categoriesSelected',
    remove_brand_to_brandsSelected: '[PRODUCTS] remove brand to braindsSelected',
    clear_all_filter: '[PRODUCTS] clear all filters',
    load_products_per_brand: '[PRODUCTS] load products per brand',
    load_products_per_pagination: '[PRODUCTS] load products per pagination',

    loadCategories: '[CATEGORIES] start load categories',
    loadCategoriesHome:'[CATEGORIES HOME] start load categories',

    load_cart_state: '[CART] load cart state',
    add_to_cart: '[CART] add to cart',
    remove_one_from_cart: '[CART] remove one from cart',
    add_one_from_cart: '[CART] add one from cart',
    remove_all_from_cart: '[CART] remove all from cart',
    clear_cart: '[CART] clear cart',

    loadOffers: '[Offers] load offers',

    loadTags: '[TAGS] load tags',

    loadBrands: '[BRANDS] start load brands',
    loadBrandsHome: '[HOME] load brands with products home',

    addNewsletterSuscription:'[Home] add and show newsletter suscription menssage',
    loadBrand: '[BRANDS] load brand',

    loadSlidersData:'[Home] load data sliders offers'
}