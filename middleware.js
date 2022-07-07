import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET;

export async function middleware(req ) {
  // token will exist if user is logged in
  const token = await getToken({ req, secret });

  // the path of the request
  const { pathname } = req.nextUrl;

  // Allow the request if the following is true
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes('/api/auth') || pathname.includes('/_next') || token) {
    return NextResponse.next();
  }

  // redirect to login page, when disallowed request
  if (!token && pathname !== '/login') {
   // return NextResponse.redirect(new URL('/login', req.url));
  }
}