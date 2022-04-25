import { NextResponse, NextRequest } from "next/server";

export async function middleware(req, ev) {

    const token = req.nextUrl.searchParams.get('token');
    const id = req.nextUrl.searchParams.get('id');

    if (token && id) {
        return NextResponse.next();
    }

    const baseUrl = req.nextUrl.clone().origin;
    return NextResponse.redirect(baseUrl);

}