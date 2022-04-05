import BrandsList from '../brands/BrandsList';
import Filters from '../products/Filters';
import CategoriesList from './CategoriesList';

const AsideBar = ({ categories, brands }) => {

    return (
        <div className="p-4 md:h-screen w-full md:pr-16">
            <Filters />
            <BrandsList brands={brands} />
            <CategoriesList categories={categories} />
        </div>
    )
}

export default AsideBar;