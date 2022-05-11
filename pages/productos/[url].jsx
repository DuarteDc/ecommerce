import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Layout from "../../src/components/Layouts";

import { startLoadProduct } from "../../src/actions/productsAction";

//import { newProduct } from "../../src/actions/shoppingCartActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { helpers } from "../../src/helpers";
import { addProductToCartClientsNotLogged, addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage, startAddProductShoppingCart } from "../../src/actions/shoppingCartActions";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { ButtonGroup, ProductCard } from "../../src/components/ui";
import Image from "next/image";
import Cookies from "js-cookie";
import { Breadcrumbs, Container, Typography } from "@mui/material";

import { GoHome } from "react-icons/go";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from "next/link";
import { useDebounce } from "../../src/hooks/useDebounce";


const Show = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { product, relatedProducts } = useSelector((state) => state.products);
    
    const { cart, cartNotLogged } = useSelector((state) => state.cart);
    const { logged } = useSelector((state) => state.auth);


    const [isEnable, setIsEnable] = useState(false);
    const [quantityInput , setQuantityInput] = useState(1);
    const quantityInputadd = useDebounce(quantityInput , 1000);

    const { totalWithDiscountApply } = helpers.calculatNewTotalToPay(product?.discount, product?.price);
    const sale_price_discount = helpers.priceFormat(totalWithDiscountApply);
    const price = helpers.priceFormat(product?.price)

    const addProductCard = (product) => {
        const exists = helpers.existInShoppingCart(product._id, cart);

        if (exists) {
            notify('El producto ya ha sido agregado al carrito de compras');
            return;
        }

        const itemCart = {
            product_id: {
                price: product.price,
                quantity: product.quantity,
                multimedia: product.multimedia,
                _id: product._id,
                name: product.name,
                discount: product.discount
            },
            quantity: quantityInput,
            _id: product._id
        }

        if (logged) {
            const token = Cookies.get('token');
            let shoppingCart = [...cart, itemCart];
            localStorage.setItem('cart', JSON.stringify(shoppingCart));
            dispatch(startAddProductShoppingCart(itemCart, product.name , token));
            return;
        } else {
            let shoppingCart = [...cartNotLogged, itemCart];
            dispatch(addProductToCartClientsNotLogged(shoppingCart));
            localStorage.setItem('cartNotlogged', JSON.stringify(shoppingCart));
            Swal.fire({
                icon: "success",
                title: "¡¡Buen Trabajo!!",
                html: `<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
            })
            return;
        }

    }

    const handleClickButtonAdd = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            });
            
            Toast.fire({
            icon: "warning",
            title:"El producto ya se encuentra agregado al carrito de compras"
            });




    }

    const increaseDecreaseQuantityProduct = (value) =>{
        if(value === -1){
            if(Number(quantityInput) === 1) return;
            setQuantityInput(prev=>Number(prev) - 1);
        }else{
            if(Number(quantityInput) === Number(product?.quantity)) return;
            setQuantityInput(prev=>Number(prev) + 1);
        }
    }

    const handleChangeQuantity = (e) =>{
          setQuantityInput(e.target.value)
    }

    const handleClickRedirectCart = () => {
        router.push('/mi-carrito');
    }

    useEffect(() => {
        if (logged) {
            const exists = helpers.existInShoppingCart(product._id, cart);
            setIsEnable(exists);
        } else {
            const exists = helpers.existInShoppingCart(product._id, cartNotLogged);
            setIsEnable(exists);
        }

    }, [cart, cartNotLogged]);


    useEffect(() => {
        if (!logged) {
            let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
            dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
    }, [logged]);

    useEffect(() => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            });
        if(Object.keys(quantityInputadd).length > 0){
           if(Number(quantityInputadd) > Number(product?.quantity)){
             Toast.fire({
                icon: "warning",
                title:"No puedes agregar más cantidad de la que se tiene en stock"
             });
             setQuantityInput(product?.quantity)
             return;
           }
  
           if(Number(quantityInputadd) === 0){
            Toast.fire({
                icon: "warning",
                title:"La cantidad del producto no puede ser igual a 0"
             });
            setQuantityInput(product?.quantity);
            return;
           }
          }
  
          if(!quantityInput){
            Toast.fire({
                icon: "warning",
                title:"Ups , la cantidad del producto es requerida , no puede estar vacia"
             });
            setQuantityInput(product?.quantity)
            return;
           }
      }, [quantityInputadd]);
  
  
      


    return (
        <Layout>
            <section className="container mx-auto mt-20 font-Poppins">
                <Container>
                <div className="grid grid-cols-1">
                <Breadcrumbs 
                      aria-label="breadcrumb"
                      separator={<NavigateNextIcon fontSize="small" />}
                   >
                       <Link href="/">
                       <div className="flex items-center justify-between cursor-pointer">
                       <GoHome/>
                       <span className="text-lg font-Poppins ml-3 ">Inicio</span>
                       </div>
                       </Link>
                       <Link href="/productos">
                       <div className="flex items-center justify-between cursor-pointer">
                       <span className="text-lg font-Poppins ml-3 ">Productos</span>
                       </div>
                       </Link>
                       <Typography variant="subtitle1" className="text-base font-Poppins text-[#1976d2]">
                        {product?.name}
                       </Typography>
                   </Breadcrumbs>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-5 lg:p-10">
                    <div className="lg:pb-5 md:px-5">
                        <Image
                            src={product?.multimedia[0].path}
                            alt={product?.name}
                            width={100}
                            height={100}
                            layout="responsive"
                        />
                    </div>
                    <div className="mt-5 md:mt-0 p-2 md:pl-5 lg:pl-10">
                        <h1 className="text-[22px] font-Poppins font-normal capitalize leading-[1.5] text-[#212529]">{product?.name}</h1>
                        <div className="mt-5">
                            <div className="flex mb-[5px] fle">
                                {
                                product?.discount > 0 && (
                                        <p className="text-[18px] text-[#333] mr-5 ">
                                            {sale_price_discount}
                                        </p>
                                    )
                                }
                                <p className={`mr-12 ${product?.discount > 0 ? 'line-through text-[#333] text-[18px] font-thin' : 'text-[18px] text-[#333]'}`}>
                                    {price}
                                </p>
                            </div>
                            <p className="mt-4 font-medium uppercase">
                                {product?.quantity} Disponibles
                            </p>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center">
                                <h3 className="text-[#666] text-[16px]">Categoria:</h3>
                                <p className="text-[#333] font-medium ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                    {product?.category?.name}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <h3 className="text-[#666] text-[16px]">Marca:</h3>
                                <p className="text-[#333] font-medium ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                    {product?.brand?.name}
                                </p>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-[#666] text-[16px] leading-8">Tags:</h3>
                                <div className="flex">
                                    {
                                        product?.tags.map(tag => (
                                            <div key={tag.tag_id._id} className="bg-[#333] rounded-3xl px-4 py-1 mr-2 cursor-pointer ">
                                                <span className="text-secondary font-medium mr-4 
                                                duration-500
                                                text-center
                                                ">
                                                    {tag.tag_id.name}
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-20">
                            <div className="flex items-center">
                            <ButtonGroup
                                quantity={quantityInput}
                                increaseDecreaseQuantityProduct={increaseDecreaseQuantityProduct}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                                
                                {
                                    isEnable ?
                                        <button
                                            className="bg-[#dc3545] text-secondary  h-[45px] top-[-2px] relative cursor-pointer py-[11px] px-[25px] rounded-none uppercase font-normal text-[14px]
                                          transition-all duration-700 ease-in-out"
                                            onClick={() => handleClickButtonAdd()}
                                        >
                                            Ya agregado al carrito
                                        </button>
                                        :

                                        <button
                                            className="h-[45px] top-[-2px] relative cursor-pointer border-[1px] border-solid border-[#333] py-[11px] px-[25px] rounded-none uppercase font-normal text-[14px]
                                            hover:bg-[#333] hover:text-secondary transition-all duration-700 ease-in-out"
                                            onClick={() => addProductCard(product)}>
                                            <ShoppingCartIcon />
                                            Añadir a carrito
                                        </button>

                                }

                            </div>
                            <button className="bg-[#333] border-2 text-white mt-16 py-4 w-full font-bold
                            transition-all duration-700 ease-in-out
                            hover:bg-[#000]
                            "
                                onClick={() => handleClickRedirectCart()}
                            >
                                COMPRAR AHORA!
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-10 w-full break-words text-center">
                    <h3 className="inline-block text-[14px] relative pl-[18px] uppercase text-[#666]">Descripción</h3>
                    <hr />
                    <p className="text-left my-[20px] text-[#666] leading-[1.8] text-[14px]">
                        {product?.description || ''}
                    </p>
                </div>
                <div className="mb-[40px] text-center bg-[#f8f8f8] p-[15px]">
                <h3 className="mb-0 inline-block relative pl-[20px]  text-[20px] font-semibold">Productos Relacionados</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 my-24">
                    {
                        relatedProducts.map(product => (
                            <ProductCard product={product} key={product._id} />
                        ))
                    }
                </div>
                </Container>
            </section>
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadProduct(ctx.query.url));
        await store.dispatch(startLoadAdministrableLogo());
    })

export default Show;