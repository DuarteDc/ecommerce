import { NextResponse } from "next/server";
import { emailVerified } from "../../src/actions/authActions";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    const baseUrl = req.nextUrl.clone().origin;

    if (token) {
        const { email_verified } = await emailVerified(token);
        if (email_verified) {
            return NextResponse.next();
        }
        return NextResponse.redirect(`${baseUrl}/verificar-cuenta`);
    }


    const requestedPage = req.page.name;

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);

}