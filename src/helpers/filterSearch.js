export const filterSearch = ({ router, brand, category, sort, search }) => {

    const path = router.pathname;
    const query = router.query;


    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (search) query.search = search;
    if (sort) query.sort = sort;

    router.push({
        pathname: path,
        query: query
    },
        undefined, { shallow: true }
    )
}
