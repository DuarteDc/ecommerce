const filterSearch = ({ router, brand, category, sort, search, page, tag }) => {

    const path = router.pathname;
    const query = router.query;


    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (tag) query.tag = tag;
    if (search) query.search = search;
    if (page) query.page = page;
    if (sort) query.sort = sort;

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