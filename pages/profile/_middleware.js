import { NextResponse } from "next/server";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    if (token) {
        return NextResponse.next();
    } else {
        const requestedPage = req.page.name;
        console.log(requestedPage);
        return NextResponse.redirect(`http://localhost:3000/auth/login?p=${requestedPage}`);
    }

}