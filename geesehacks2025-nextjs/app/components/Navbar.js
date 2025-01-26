"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession, getUserById } from "../db/queries";
import { motion } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();
        if (session) {
          const fetchedUser = await getUserById(session.user.id);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="fixed w-full bg-gray-950 backdrop-blur-sm py-3 md:py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link href="/" className="flex items-center text-white text-xl md:text-2xl font-extrabold tracking-tight">
          <motion.img
            src="/Goose.png"
            alt="GeeseTalk Logo"
            className="h-8 w-8 md:h-10 md:w-10"
            whileHover={{ scale: 1.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="ml-2">GeeseTalk</span>
        </Link>

        <div className="flex items-center space-x-4 md:space-x-6 text-sm md:text-base">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
            Learn
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                Profile
              </Link>
              <Link href="/api/auth/signout" className="text-gray-300 hover:text-white transition-colors">
                Log out
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin" className="text-gray-300 hover:text-white transition-colors">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
