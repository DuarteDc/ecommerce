import { NextResponse } from "next/server";
import { emailVerified, cartNotEmpty } from "../../src/actions/authActions";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    const baseUrl = req.nextUrl.clone().origin;
    const requestedPage = req.page.name;

    const handleEmailVerified = async (token) => {
        return await emailVerified(token);
    }

    const handleCartNotEmpty = async (token) => {
        return await cartNotEmpty(token);
    }

    if (token) {
        const { email_verified } = await handleEmailVerified(token);
        if (email_verified) {
            const { cart } = await handleCartNotEmpty(token);
            if(cart){
                return NextResponse.next();
            }
            return NextResponse.redirect(`${baseUrl}/mi-carrito`);
        }
        return NextResponse.redirect(`${baseUrl}/verificar-cuenta`);
    }

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);

}