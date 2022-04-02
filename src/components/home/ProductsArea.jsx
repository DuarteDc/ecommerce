import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector , useDispatch } from 'react-redux';
import {Tabs , Search , ProductCard , FiltersArea} from '../ui';
import {addProductSelected} from '../../actions/productsAction';
import ShowProduct from '../products/ShowProduct';
import {useModal} from '../../hooks/useModal';
import {useToggle} from "../../hooks/useToggle";


export const ProductsArea = () => {
    const dispatch = useDispatch();
    const {brandsHome} = useSelector((state)=>state.brands);
    const {tags} = useSelector((state)=>state.tags);
    const [openSearch , setOpenSearch] = useToggle(false);
    const [openFilter , setOpenFilter] = useToggle(false);
    const [tabActive , setTabActive] = useState(null);
    const [idBrand , setIdBrand ] = useState(null);
    const [products , setProducts] = useState([]);
    const [isOpen , openModal , closeModal] = useModal();

    useEffect(() => {
        if(tabActive === null){
          const productsList = brandsHome.map(brand=>brand.products);
          setProducts(productsList.flat());
        }else{
           const productsList = brandsHome.filter(brand=>brand._id === idBrand).map(brand=>brand.products); 
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
    const onRequestSearch = () =>{

    }
  

    return (
        <section className="bg-luz pb-8 px-8  md:px-16 lg:px-24 pt-12 max-w-[1920px] m-auto">
            <div className="w-full mx-auto">
              <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
            <h2 className="font-Poppins text-[25px] uppercase font-lg  text-[#222] text-center font-semibold">Te recomendamos</h2>
            </div>
              <Tabs
               tabActive={tabActive}
               tabsData={brandsHome}
               handleResetData={handleResetTab}
               handleSelectTab={(i , id)=>handleSelectTab(i , id)}
               search={true}
               filter={true}
               handleOpenFilter={setOpenFilter}
               handleOpenSearch={setOpenSearch}
              />
              <div className="grid grid-cols-1 gap-1">
                <Search 
                  openSearch={openSearch} 
                  placeholder="Buscar..."
                  onRequestSearch={onRequestSearch}
                />
                <FiltersArea 
                  brands={brandsHome}
                  openFilter={openFilter}
                  tags={tags}
                />
                
              </div>
              <div className="
               grid 
               grid-cols-1 
               gap-1 
               md:grid-cols-2 
               md:gap-2 
               lg:grid-cols-3 
               lg:gap-3 
               xl:grid-cols-4
               xl:gap-4  
               2xl:grid-cols-4
               2xl:gap-4
               flex-wrap 
               relative">
              {
                  products.map(product=>(
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                  ))
              }
              </div>
             <div className="w-full my-5 flex justify-center items-center flex-wrap">
               <Link href="/productos">
                 <span className="text-luz mt-4 mx-16 border-solid inline-block py-3 pl-12 pr-12 leading-normal rounded-sm uppercase font-normal text-sm border-2 bg-[#333] border-[#222] transition duration-700 ease-in-out font-Poppins cursor-pointer
                 ">
                   Ver más
                 </span>
               </Link>
             </div>
             
              
            </div>
            <ShowProduct
            isOpen={isOpen}
            closeModal={closeModal}
            />
        </section>
    );
};