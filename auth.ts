import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/lib/types';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | null> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.log("Returnerer dummy bruker, database med brukere er ikke satt opp enda");
    return {
      key: "1",
      name: "Tom",
      email: "tom@esgnaturerisk.com",
      password: "123456",
      image: "",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // console.error('Failed to fetch user:', error);
    // throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate the credentials
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          // const passwordsMatch = await bcrypt.compare(password, user.password);
          const passwordsMatch = password === user.password;
          console.log("passwordsMatch: ", passwordsMatch);

          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});