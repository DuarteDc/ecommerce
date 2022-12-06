import { NextResponse } from "next/server";
import { startLoadMaintainment } from "./src/actions/administrableActions";
import { cartNotEmpty, emailVerified } from "./src/actions/authActions";

export async function middleware(req) {

  const maintainment = await startLoadMaintainment();
  const baseUrl = req.nextUrl.origin;
  if (maintainment) return NextResponse.redirect(`${baseUrl}/mantenimiento`);
  else NextResponse.redirect(baseUrl)

  if (req.nextUrl.pathname.startsWith("/buscar/[product]")) {
    const product = req.nextUrl.pathname.replace("/buscar/", "");

    if (product) {
      return NextResponse.next();
    }

    const baseUrl = req.nextUrl.clone();
    baseUrl.pathname = "/";
    return NextResponse.redirect(baseUrl);
  }

  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const token = req.cookies.get("token");
    const order_id = req.cookies.get("order_id");

    const baseUrl = req.nextUrl.origin;
    const requestedPage = req.nextUrl.pathname;

    if (token && order_id) {
      const { email_verified } = await emailVerified(token);
      if (email_verified) {
        const { cart } = await cartNotEmpty(token);
        if (cart) {
          return NextResponse.next();
        }
        return NextResponse.redirect(`${baseUrl}/mi-carrito`);
      }
      return NextResponse.redirect(`${baseUrl}/verificar-cuenta`);
    }

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);
  }

  if (req.nextUrl.pathname.startsWith("/perfil")) {

    const token = req.cookies.get('token');

    const baseUrl = req.nextUrl.origin;

    if (token) {
      const { email_verified } = await emailVerified(token);
      if (email_verified) {
        return NextResponse.next();
      }
      return NextResponse.redirect(`${baseUrl}/verificar-cuenta`);
    }

    const requestedPage = req.nextUrl.pathname;

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);
  }

  if (req.nextUrl.pathname.startsWith('/auth/reset-password')) {
    const token = req.nextUrl.searchParams.get("token");
    const id = req.nextUrl.searchParams.get("id");

    if (token && id) {
      return NextResponse.next();
    }

    const baseUrl = req.nextUrl.origin;
    return NextResponse.redirect(baseUrl);
  }

  if (req.nextUrl.pathname.startsWith("/auth")) {
    // const { token } = req.cookies;

    const token = req.cookies.get('token');

    if (!token) {
      return NextResponse.next();
    }

    const baseUrl = req.nextUrl.origin;
    return NextResponse.redirect(baseUrl);
  }

  if (req.nextUrl.pathname.startsWith("/verificar-cuenta")) {
    const token = req.cookies.get('token');

    const baseUrl = req.nextUrl.origin;

    if (token) {
      const { email_verified } = await emailVerified(token);
      if (!email_verified) {
        return NextResponse.next();
      }
      return NextResponse.redirect(baseUrl);
    }

    const requestedPage = req.nextUrl.pathname;

    return NextResponse.redirect(`${baseUrl}/auth/login?p=${requestedPage}`);
  }
}


export const config = {
  matcher: ['/', '/acerca-de-nosotros', '/auth/:path*', '/buscar/:producto*', '/canvas', '/categorias/:url*', '/checkout', '/conatco', '/distribuidor', '/generate-google-feed', '/marcas/:url*', '/mi-carrito', '/mi-lista-de-deseos', '/perfil/:path*', '/permisos-de-exportacion', '/preguntas-frecuentes', '/productos/:url*', '/verificar-cuenta', '/mantenimiento'],
}
