import Link from "next/link"
import { auth } from "@/auth"
import { getUserById } from "../db/queries";

const Navbar = async () => {
  const session = await auth();
  const user = (session) ? await getUserById(session?.user.id) : null;

  return (
    <nav className="bg-gray-950 from-gray-950 to-black p-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          GeeseTalk
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white">
            Home
          </Link>
          <Link href="/learn" className="text-white">
            Learn
          </Link>
          {user ? <>
          <Link href="/profile" className="text-white">
            Profile
          </Link>
          <Link href="./api/auth/signout" className="text-white">Sign out</Link>
          </>
          :
          <Link href="/api/auth/signin" className="text-white">Sign in</Link>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

