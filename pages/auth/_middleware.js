import { NextResponse } from "next/server";

export async function middleware(req, ev) {

    const { token } = req.cookies;

    if (!token) {
        return NextResponse.next();
    }

    const baseUrl = req.nextUrl.clone().origin;
    return NextResponse.redirect(baseUrl);

}