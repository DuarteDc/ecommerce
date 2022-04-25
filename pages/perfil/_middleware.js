import { NextResponse } from "next/server";
import client from "../../src/config/axiosConfig";

export async function middleware(req, ev) {

    const { token } = req.cookies;
    const emailVerified = async (userToken) => {
        let url = '/auth';
        try {
            const res = await client.get(url, {
                headers: {
                    'Authorization': userToken
                }
            });
            return res.data.user;
        } catch (error) {
            return {
                hasError: true,
                user: error?.response?.data?.message
            }

        }
    }

    if (token) {

        const data = await emailVerified(token);
        console.log(data);
        return NextResponse.next();
    }

    const baseUrl = req.nextUrl.clone().origin;
    const requestedPage = req.page.name;

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);

}