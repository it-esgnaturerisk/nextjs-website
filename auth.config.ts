import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
      signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = true;// !!auth?.user;
      const sensitivePage = nextUrl.pathname.startsWith('/sites');
      if (sensitivePage) {
        if (!isLoggedIn)
          return Response.redirect(new URL('/login', nextUrl));
        } else if (isLoggedIn) {
          return true;
        }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;