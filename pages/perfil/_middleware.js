import { NextResponse } from "next/server";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    if (token) {
        return NextResponse.next();
    } else {
        const baseUrl = req.nextUrl.clone().origin;
        const requestedPage = req.page.name;
        return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);
    }

}