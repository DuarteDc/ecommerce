const filterSearch = ({ router, brand_id, category, search, page, tag_id, lowPrice, maxPrice, counter }) => {

    const path = router.pathname;
    const query = router.query;


    if (category) query.category = category;
    if (brand_id) query.brand_id = brand_id;
    if (tag_id) query.tag_id = tag_id;
    if (search) query.search = search;
    if (page) query.page = page;
    if (lowPrice) query.lowPrice = lowPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    if (counter) query.counter = counter;

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