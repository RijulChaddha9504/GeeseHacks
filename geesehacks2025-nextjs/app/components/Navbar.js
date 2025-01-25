import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="bg-black p-6">
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
          <Link href="/profile" className="text-white">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

