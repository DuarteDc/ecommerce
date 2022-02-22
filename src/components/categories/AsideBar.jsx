import BrandsList from '../brands/BrandsList';
import Filters from '../products/Filters';
import CategoriesList from './CategoriesList';

const AsideBar = ({ categories, brands }) => {

    return (
        <div className="p-4 h-screen w-full">
            <Filters />
            <BrandsList brands={brands} />
            <CategoriesList categories={categories} />

            <div>
                <p className="text-xl font-bold uppercase">Productos populares</p>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row cursor-pointer">
                        <div className="w-32">
                            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX472_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1570119352353" className="w-full h-full object-fill" />
                        </div>
                        <div className="py-4 flex flex-col">
                            <p className="font-bold sm:text-sm">Lorem ipsum dolor sit.</p>
                            <p className="sm:text-sm text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p className="font-semibold text-sm mt-3">$700</p>
                        </div>
                    </div>
                    <div className="flex flex-row cursor-pointer">
                        <div className="w-32">
                            <img src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX472_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1570119352353" className="w-full h-full object-fill" />
                        </div>
                        <div className="py-4 flex flex-col">
                            <p className="font-bold sm:text-sm">Lorem ipsum dolor sit.</p>
                            <p className="sm:text-sm text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p className="font-semibold text-sm mt-3">$700</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AsideBar;