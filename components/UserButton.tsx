"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { NewUserType } from "@/lib/types";
import { insertUser } from "@/lib/db/queries";
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
  // const { data: session } = useSession()

  // async function createUser() {
  //   const newUser: NewUser = {
  //     name: "Test",
  //     email: "hallvard.bjorgen@gmail.com",
  //   };
  //   insertUser(newUser);
  // }
  // if(session)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {false ? ( // user ? (
          <DropdownMenuItem>
            <button>Logout</button>
            {/* onClick={() => signOut()} */}
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href={"/"}>Login</Link>
          </DropdownMenuItem>
        )}
        {/* <DropdownMenuItem>
          <button onClick={() => createUser()}>Dev: Create New User</button>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
