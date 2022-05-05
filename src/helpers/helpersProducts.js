const filterSearch = ({ router, brand_id, category_id, search, tag_id, lowPrice, maxPrice, counter, date, order }) => {

    const path = router.pathname;
    const query = router.query;

    if (category_id) query.category_id = category_id;
    if (brand_id) query.brand_id = brand_id;
    if (tag_id) query.tag_id = tag_id;
    if (search) query.search = search;
    if (counter) query.counter = counter;
    if (lowPrice) query.lowPrice = lowPrice;
    if (maxPrice) query.maxPrice = maxPrice;
    if (date) query.date = date;
    if (order) query.order = order;



    router.push({
        pathname: path,
        query: query
    },
        undefined, { shallow: true }
    )
}

const getQueryParams = (query) => {
    const newQuery = query.indexOf('?');
    return query.slice(newQuery);
}


const countQueryParams = (query) => {

    const asArray = Object.entries(query);
    const filtered = asArray.filter(([key, value]) => key !== 'counter');
    const params = Object.fromEntries(filtered);

    const counter = Object.keys(params).length;

    console.log(counter);

    return counter;

}

export default {
    filterSearch,
    getQueryParams,
    countQueryParams,
}