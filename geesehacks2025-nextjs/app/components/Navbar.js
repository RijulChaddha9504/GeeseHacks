import Link from "next/link"
import { auth } from "@/auth"
import { getSession, getUserById } from "../db/queries";

const Navbar = async () => {
  const session = await getSession();
  const user = (session) ? await getUserById(session?.user.id) : null;

  return (
    <nav className="fixed w-full bg-gray-950 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-extrabold tracking-tight">
          GeeseTalk
        </Link>
        <div className="flex items-center space-x-6">
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
  )
}

export default Navbar
