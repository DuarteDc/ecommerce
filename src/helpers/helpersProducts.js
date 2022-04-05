const filterSearch = ({ router, brand, category, sort, search, page, tag }) => {

    const path = router.pathname;
    const query = router.query;


    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (tag) query.tag = tag;
    if (search) query.search = search;
    if (search) query.page = page;
    if (sort) query.sort = sort;

    router.push({
        pathname: path,
        query: query
    },
        undefined, { shallow: true }
    )
}

const paginationProducts = (route, page) => {
    const res = filterSearch({route, page});
    console.log(res);
}

export default {
    filterSearch,
}