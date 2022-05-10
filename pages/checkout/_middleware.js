import { NextResponse } from "next/server";
import { emailVerified, cartNotEmpty } from "../../src/actions/authActions";

export async function middleware(req, ev) {

    const { token, order_id } = req.cookies;

    const baseUrl = req.nextUrl.clone().origin;
    const requestedPage = req.page.name;

    if (token && order_id) {
        const { email_verified } = await emailVerified(token);
        if (email_verified) {
            const { cart } = await cartNotEmpty(token);
            if(cart){
                return NextResponse.next();
            }
            return NextResponse.redirect(`${baseUrl}/mi-carrito`);
        }
        return NextResponse.redirect(`${baseUrl}/verificar-cuenta`);
    }

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);

}