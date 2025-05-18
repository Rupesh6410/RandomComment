"use client";
import React from "react";
import Link from "next/link";
import { User } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
          True Feedback
        </Link>

        {/* Auth Area */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm text-gray-300 hidden md:inline-block">
                Welcome, <span className="font-medium">{user.username || user.email}</span>
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-white text-black hover:bg-gray-100 transition"
                variant="outline"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
