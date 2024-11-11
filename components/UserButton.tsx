'use client';

import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PersonIcon } from '@radix-ui/react-icons';
import { useUser } from '@auth0/nextjs-auth0/client';
// import { NewUserType } from '@/lib/types';
// import { insertUser } from '@/lib/db/queries';
// export type User = {
//   key: string;
//   email: string;
//   password: string;
//   name: string;
//   image: string;
//   role: "admin" | "user";
//   createdAt: Date;
//   updatedAt: Date;
// };

export default function UserButton() {
  const { user, error, isLoading } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isLoading && (
        <DropdownMenuItem>
          Loading...
        </DropdownMenuItem>
        )}
        {error && (
        <>
          <DropdownMenuItem>
            Error loading user
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/api/auth/login">Login</Link>
          </DropdownMenuItem>
        </>
        )}
        {user && (
        <>
          <DropdownMenuLabel>{user.email || 'My Account'}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* eslint-disable-next-line no-constant-condition */}
          {false ? ( // user ? (
            <DropdownMenuItem>
              <button type="button">Logout</button>
              {/* onClick={() => signOut()} */}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <a href="/api/auth/logout">Logout</a>
            </DropdownMenuItem>
          )}
          {/* <DropdownMenuItem>
                <button onClick={() => createUser()}>Dev: Create New User</button>
              </DropdownMenuItem> */}
        </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
