import { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import CardProduct1 from '../ui/cardProduct1';
import Tabs from '../ui/tabs';
import {useModal} from '../../hooks/useModal';
import ShowProduct from '../products/ShowProduct';
import {addProductSelected} from '../../actions/productsAction';

const ProductsArea = () => {
    const dispatch = useDispatch();
    const {brands} = useSelector((state)=>state.brands);
    const [tabActive , setTabActive] = useState(null);
    const [idBrand , setIdBrand ] = useState(null);
    const [products , setProducts] = useState([]);
    const [isOpen , openModal , closeModal] = useModal();

    useEffect(() => {
        if(tabActive === null){
          const productsList = brands.map(brand=>brand.products);
          setProducts(productsList.flat());
        }else{
           const productsList = brands.filter(brand=>brand._id === idBrand).map(brand=>brand.products); 
          setProducts(productsList[0]);
        }
    }, [tabActive])

    const handleSelectTab = (i , id) =>{
        setTabActive(i);
        setIdBrand(id)
    }

    const handleResetTab = () =>{
        setTabActive(null);
    }

    const handleClickModal = (product) =>{
        openModal();
        dispatch(addProductSelected(product))
    }
    return (
        <section className="bg-luz pb-6 pt-6">
            <div className="w-full px-24 mx-auto">
              <div className="pb-3">
                  <h3 className="font-Poppins uppercase font-lg">Te recomendamos</h3>
              </div>
              <Tabs
               tabActive={tabActive}
               tabsData={brands}
               handleResetData={handleResetTab}
               handleSelectTab={(i , id)=>handleSelectTab(i , id)}
              />
              <div className="grid  grid-cols-1 gap-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-3 xl:grid-cols-4 xl:gap-4  flex-wrapx relative">
              {
                  products.map(product=>(
                        <CardProduct1
                            image={product.principal_image}
                            product={product}
                            handleClickModal={(product)=>handleClickModal(product)}
                        />
                  ))
              }
              </div>
              
            </div>
            <ShowProduct
            isOpen={isOpen}
            closeModal={closeModal}
            />
        </section>
    );
};

export default ProductsArea;