
export const useCart = (logged = false) => {

    const addProduct = product => {
        const itemCart = {
            product: {
                price: product.price,
                quantity: product.quantity,
                multimedia: product.multimedia[0],
                name: product.name,
                discount: product.discount,
                product_type: product.product_type,
            },
            quantity: quantityInput,
            product_id: product._id,
        };

        if (logged) {
            const token = Cookies.get("token");
            let shoppingCart = [...cart, itemCart];
            localStorage.setItem("cart", JSON.stringify(shoppingCart));
            dispatch(startAddProductShoppingCart(itemCart, product.name, token));
        } else {
            let shoppingCart;
            let productInCart = cartNotLogged.find((cart) => cart._id === itemCart.product_id);
            if (productInCart) {
                shoppingCart = cartNotLogged.map((cart) => cart._id === itemCart._id
                    ? { ...cart, quantity: itemCart.quantity }
                    : cart
                );
            } else {
                shoppingCart = [...cartNotLogged, itemCart];
            }
            dispatch(addProductToCartClientsNotLogged(shoppingCart));
            localStorage.setItem("cartNotlogged", JSON.stringify(shoppingCart));
            Swal.fire({
                icon: "success",
                title: "¡¡Buen Trabajo!!",
                html: `<p class="font-Poppins text-base">El producto ${product.name} ha sido agregado al carrito satisfactoriamente</p>`,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }



    return {}
}
