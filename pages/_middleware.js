import { NextResponse } from "next/server";

export async function middleware(req, ev) {
    //const { token } = req.cookies;
    return NextResponse.next();
    
    return new Response("token"+token)
    if (token) {
    } else {
        const requestedPage = req.page.name;
        return NextResponse.redirect(`/auth/login?p=${requestedPage}`);

    }
}