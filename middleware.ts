// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired({
    returnTo: 'api/auth/login', // Redirects unauthenticated users to this path
});
export const config = {
  matcher: ['/', '/sites/:path*', '/portfolio/:path*', '/login'],
};
