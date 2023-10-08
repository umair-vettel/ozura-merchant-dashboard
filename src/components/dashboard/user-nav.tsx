"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitch from "./ThemeSwitch";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
  return (
    <>
      {/* <ThemeSwitch /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Umair Shaikh</p>
              <p className="text-xs leading-none text-muted-foreground">
                umair@vetteltech.com
              </p>
            </div>
          </DropdownMenuLabel>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuGroup className="space-y-2">
            <DropdownMenuItem>
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem> */}
          </DropdownMenuGroup>
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
