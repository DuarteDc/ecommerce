import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Layout from "../../src/components/Layouts";

import { startLoadProduct } from "../../src/actions/productsAction";
import { useCounter } from "../../src/hooks/useCounter";
//import { newProduct } from "../../src/actions/shoppingCartActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { successNotify } from "../../src/helpers/helpers";
import { helpers } from "../../src/helpers";
import { addProductToCartClientsNotLogged, addShoppingCartFromLocalStorage, shoppingCartNotLoggedfromLocalStorage, startAddProductShoppingCart } from "../../src/actions/shoppingCartActions";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Show = () => {
    const router = useRouter();
    const { product, relatedProducts } = useSelector((state) => state.products);
    const { cart , cartNotLogged  } = useSelector((state)=>state.cart);
    const { logged } = useSelector((state)=>state.auth);

    const dispatch = useDispatch();
  
    const img = useRef();
    
    const [ isEnable , setIsEnable ] = useState(false);  
    console.log(isEnable);

    const showImage = (newImg) => {
        img.current.src = newImg;
    }

    const { counter, increaseBy , setCounter } = useCounter(1);

    const addProductCard = (product) =>{
        const exists =  helpers.existInShoppingCart(product._id , cart);

        if(exists){
          notify('El producto ya ha sido agregado al carrito de compras');
          return;
        }

        const itemCart = {product_id:{
                            price:product.price,
                            quantity:product.quantity,
                            multimedia:product.multimedia,
                            _id:product._id,
                            name:product.name,
                            discount:product.discount
                          },
                          quantity:counter,
                          _id:product._id
                         }

        if(logged){
          let shoppingCart = [...cart  , itemCart ];
          localStorage.setItem('cart' , JSON.stringify(shoppingCart));
          dispatch(startAddProductShoppingCart(itemCart , product.name));
          return;
        }else{
          let shoppingCart = [...cartNotLogged  , itemCart ];
          dispatch( addProductToCartClientsNotLogged(shoppingCart));
          localStorage.setItem('cartNotlogged' , JSON.stringify(shoppingCart));
          Swal.fire({
            icon:"success",
            title:"¡¡Buen Trabajo!!",
            html:`<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
            timer:3000,
            timerProgressBar:true,
            showConfirmButton:false
         })
          return;
        }

    }

    const handleClickButtonAdd = () =>{
        Swal.fire({
            icon:"warning",
            title:"Ups , hubo un problema",
            text:"El producto ya se encuentra agregado al carrito de compras",
            timer:3000,
            timerProgressBar:true,
            showConfirmButton:false
        });
    }

    const handleClickRedirectCart = () =>{
        router.push('/mi-carrito');
    }

    useEffect(() => {
      if(logged){
        const exists = helpers.existInShoppingCart(product._id , cart);
         setIsEnable(exists);
      }else{
        const exists = helpers.existInShoppingCart(product._id , cartNotLogged);
         setIsEnable(exists);
      }
     
    }, [cart , cartNotLogged ]);


    useEffect(() => {
        if (!logged){
        let cartNotLogged =  localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
        dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
      }, [logged]);
    
      useEffect(() => {
        if (logged){
          const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
          dispatch(addShoppingCartFromLocalStorage(shoppingCart))
        }
      }, [logged]);

    return (
        <Layout>
            <section className="container mx-auto mt-20">
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-7 px-8 ">
                        <div className="relative justify-between flex flex-wrap">
                            <div className="w-[11%] bg-[#333]">

                            </div>
                            <div></div>
                            <div className="w-[83%] relative box-border block ">
                                <div className="relative block overflow-hidden m-0 p-0">
                                    <div className="opacity-100 w-[1800px] relative top-0 left-0 block mx-auto">

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-span-5">

                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 p-2 md:p-5 lg:p-10">
                    <div>
                        <div className="w-full mx-auto h-[15rem] md:h-[30rem] relative">
                            <img
                                src={product?.multimedia[0].path}
                                alt={product?.name}
                                className="w-full h-full"
                                ref={img}
                                width={200}
                                height={200}
                            />
                        </div>
                        <div>
                            <div className="flex mt-10">
                                {product?.multimedia?.map(multimedia => (
                                    <div
                                        className="overflow-hidden border-2 border-gray-300 w-24 h-24 mx-1 cursor-pointer relative"
                                        key={multimedia._id}
                                    >
                                        <img
                                            src={multimedia?.path}
                                            alt={product.name}
                                            onClick={e => showImage(e.target.src)}
                                            className="w-full h-full object-fill"
                                            width={200}
                                            height={200}
                                        />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 p-2 md:pl-5 lg:pl-10">
                        <h2 className="text-3xl font-semibold uppercase">{product?.name}</h2>
                        <div className="mt-5">
                            <p className="font-bold text-3xl text-second-100 mr-12">
                                ${product?.price}
                            </p>
                            <p className="mt-4 font-semibold uppercase">
                                {product?.quantity} Disponibles
                            </p>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center">
                                <h3 className="font-semibold text-lg">Categoria:</h3>
                                <p className="text-second-100 font-semibold ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                    {product?.category}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <h3 className="font-semibold text-lg">Marca:</h3>
                                <p className="text-second-100 font-semibold ml-2 
                                    cursor-pointer hover:text-gray-700 duration-500">
                                    {product?.brand}
                                </p>
                            </div>
                            <div className="mt-5">
                                <h3 className="font-semibold text-lg mb-2">Tags:</h3>
                                <div className="md:inline-flex">
                                    {
                                        product.tags.map(tag => (
                                            <span key={tag._id}>
                                                <p className="text-second-100 font-semibold mr-4 cursor-pointer hover:text-gray-700 duration-500">
                                                    {tag.tag_id}
                                                </p>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-20">
                            <div className="flex items-center">
                                <button
                                    className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out"
                                    onClick={() => increaseBy(-1)}
                                >
                                    -
                                </button>

                                <button className="hover:text-white mx-1 hover:bg-black font-bold px-3 py-4 border-2 border-black transition-all duration-700 ease-in-out" onClick={() => increaseBy(+1)}
                                >
                                    +
                                </button>

                                <span
                                    className="py-4 px-4 w-full outline-none 
                                    border-0 text-center font-bold"
                                >
                                    {counter}
                                </span>
                                 {
                                     isEnable ?
                                     <button 
                                       className="text-xs lg:text-sm  w-full mx-2 text-[#fff] bg-[#333]
                                        font-bold p-4 border-2  border-[#888] transition-all duration-700 ease-in-out uppercase"
                                       onClick={()=>handleClickButtonAdd()}
                                     >
                                       Ya agregado al carrito
                                     </button>
                                     :

                                    <button 
                                      className="text-xs lg:text-sm  w-full mx-2 text-white bg-black font-bold p-4 border-2 hover:bg-white hover:text-black hover:border-2 border-black transition-all duration-700 ease-in-out uppercase"
                                        onClick={() => addProductCard(product)}>
                                        <ShoppingCartIcon />
                                        Añadir a carrito
                                   </button>

                                 }

                            </div>
                            <button className="border-black border-2 hover:bg-black hover:text-white mt-16 py-4 w-full font-bold
                            transition-all duration-700 ease-in-out
                            "
                            onClick={()=>handleClickRedirectCart()}
                            >
                                COMPRAR AHORA!
                            </button>
                        </div>
                    </div>
                </div>
                <div className="px-10">
                    <h2 className="uppercase font-bold text-center text-2xl my-5">Descripción</h2>
                    <hr />
                    <p className="mt-7">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero dignissimos quisquam ea aspernatur recusandae doloribus nesciunt facere suscipit iste itaque aliquam ex ipsam perferendis accusamus nemo nisi excepturi, commodi a. Cumque iusto blanditiis, ullam facere, rem eaque dignissimos distinctio, explicabo commodi dolore hic voluptates cum aut ipsum dolorum optio laudantium magni recusandae odit repellendus pariatur. Fugit perferendis nesciunt, reiciendis itaque cum rerum cupiditate. Dolore cumque est obcaecati doloremque corporis ipsa quia nemo beatae voluptatum unde repudiandae cupiditate voluptate, reprehenderit perferendis!
                    </p>
                </div>
                <p className="uppercase font-bold text-center text-2xl mt-20 py-3 bg-gray-50">Productos relacionados</p>
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