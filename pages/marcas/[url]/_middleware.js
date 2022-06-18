import { NextResponse } from "next/server";

import { existBrand } from "../../../src/actions/brandsActions";

export async function middleware(req, ev) {

    const brand = req.page.params?.url;

    const brands = await existBrand();

    const brandIsValid = brands.find(validBrand => validBrand.url === brand);

    if (brandIsValid) {
        return NextResponse.next();
    }

    const baseUrl = req.nextUrl.clone().origin;
    return NextResponse.redirect(baseUrl);

}