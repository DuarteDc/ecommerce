import { NextResponse } from "next/server";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    if (token) {
        return NextResponse.next();
    } else {
        const requestedPage = req.page.name;
        return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
    }

}