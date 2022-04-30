import { NextResponse } from "next/server";

export async function middleware(req, ev) {

    const product = req.page.params?.product;

    if (product) {
        return NextResponse.next();
    }

    const baseUrl = req.nextUrl.clone().origin;
    return NextResponse.redirect(baseUrl);

}