const filterSearch = ({ router, brand_id, category_id, search, page, tag_id, lowPrice, maxPrice, counter }) => {

    const path = router.pathname;
    const query = router.query;

    if (category_id) query.category_id = category_id;
    if (brand_id) query.brand_id = brand_id;
    if (tag_id) query.tag_id = tag_id;
    if (search) query.search = search;
    if (counter) query.counter = counter;
    if (lowPrice) query.lowPrice = lowPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    
    

    router.push({
        pathname: path,
        query: query
    },
        undefined, { shallow: true }
    )
}


export default {
    filterSearch,
}