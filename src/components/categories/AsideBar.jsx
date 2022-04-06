import BrandsList from '../brands/BrandsList';
import Filters from '../products/Filters';
import CategoriesList from './CategoriesList';

const AsideBar = ({ children }) => {

    return (
        <div className="p-4 md:h-screen w-full md:pr-16">
            <Filters />
            {children}
        </div>
    )
}

export default AsideBar;