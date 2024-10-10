import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import HeaderButton from "./HeaderButton";
import { HomeIcon } from "@radix-ui/react-icons";
import { TfiBriefcase, TfiMap } from "react-icons/tfi";
import UserButton from "./UserButton";

export default function Header() {
  return (
    <div
      role="banner"
      className="bg-greenheader flex justify-between items-center min-h-12 w-full px-6"
    >
      <Link href="/">
        <Image
          src="/logo-white.png"
          width={750} // Set the original width of your logo
          height={212} // Set the original height of your logo
          priority
          sizes="auto"
          className="hidden md:block"
          alt="logo"
          style={{ width: "auto", height: "auto", maxHeight: "100px" }} // Adjust max height as needed
        />
      </Link>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8">
        <Link href="/">
          <HeaderButton>
            <HomeIcon />
          </HeaderButton>
        </Link>
        <Link href="/sites">
          <HeaderButton>
            <TfiMap />
          </HeaderButton>
        </Link>

        <Link href="/portfolio">
          <HeaderButton>
            <TfiBriefcase />
          </HeaderButton>
        </Link>
      </div>

      <div className="flex justify-end flex-1">
        <UserButton />
      </div>
    </div>
  );
}

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import HeaderButton from "./header-button";
// import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";

// export default function Header() {
//   return (
//     <div className="bg-greenheader flex justify-between items-center min-h-12 w-full px-6">
//       {/* Left-aligned logo */}
//       <div className="flex flex-1">
//         <Link href="/">
//           <Image
//             src="/logo.png"
//             width={320}
//             height={90}
//             className="hidden md:block"
//             alt="logo"
//             priority={true}
//           />
//         </Link>
//       </div>

//       {/* Centered links */}
//       <div className="flex flex-1 justify-center gap-8 items-center">
//         <Link href="/">
//           <HeaderButton>
//             <HomeIcon />
//           </HeaderButton>
//         </Link>
//         <Link href="/sites">
//           <HeaderButton>Sites</HeaderButton>
//         </Link>
//         <HeaderButton>Analytics</HeaderButton>
//       </div>

//       {/* Right-aligned DropdownMenu */}
//       <div className="flex flex-1 justify-end">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" size="icon">
//               <PersonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>
//               <Link href={"/login"}>Login</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Link href={"/signup"}>Signup</Link>
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </div>
//   );
// }
