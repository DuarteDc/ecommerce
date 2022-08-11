const filterSearch = async ({ router, param }) => {

    const path = router.pathname;
    const query = router.query;

    if (query.hasOwnProperty('page') && Object.keys(param)[0] !== 'page') {
        query.page = '1'
    }

    const queryParams = { ...query, ...param };

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

const clearQueryParamsWithUrl = (query) =>{

    const asArray = Object.entries(query);
    const filtered = asArray.find(([key, value]) => key !== 'url' && key !== 'page');

    if(filtered) return true;

    return false;

}

export default {
    filterSearch,
    getQueryParams,
    clearQueryParamsWithUrl,
}