// middleware.js
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired({
  returnTo: 'api/auth/login', // Redirects unauthenticated users to this path
});
export const config = {
  matcher: ['/', '/sites/:path*', '/portfolio/:path*', '/login'],
};
