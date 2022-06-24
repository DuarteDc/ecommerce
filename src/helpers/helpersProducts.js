const filterSearch = async ({ router, param }) => {

    const path = router.pathname;
    const query = router.query;

    const queryParams = {...query, ...param};

    await router.push({
        pathname: path,
        query: queryParams,
    },
        undefined, { shallow: true }
    )

    return router;
}

const getQueryParams = (query) => {
    const newQuery = query.indexOf('?');
    return query.slice(newQuery);
}


const countQueryParams = (query) => {

    const asArray = Object.entries(query);
    const filtered = asArray.filter(([key, value]) => key !== 'counter' && key !== 'lowPrice');
    const params = Object.fromEntries(filtered);

    const counter = Object.keys(params).length;

    return counter;

}

export default {
    filterSearch,
    getQueryParams,
    countQueryParams,
}