import { auth0 } from "@/lib/auth0";
import Image from "next/image";
import Link from "next/link";
import Profile from "./profile";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";

export default async function Header() {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <header className="border-b mb-8 flex justify-between bg-black">
      <Image
        className="pl-5 pt-10 pb-10"
        src="/cbdbs_logo.png"
        alt="C.B.D.B.'s Logo"
        width={300}
        height={25}
      />
      {user && (
        <Navbar className="flex justify-between bg-black">
          <NavbarContent className="flex justify-between">
            <NavbarItem className="pl-10 pr-10 ">
              <Link href="/">Home</Link>
            </NavbarItem>
            <NavbarItem className="pl-10 pr-10 ">
              <Link href="/collections">Collections</Link>
            </NavbarItem>
            <NavbarItem className="pl-10 pr-10 ">
              <Link href="/admin">Admin</Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      )}
      <Profile />
    </header>
  );
}
