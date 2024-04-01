import Link from 'next/link';

function Nav() {
  return (
    <nav className="flex flex-row justify-center gap-8 mb-16 p-2 border-b-4
    border-gray-300">
        <div className="md:text-xl font-bold">
            <Link href='/'>
                Home
            </Link>
        </div>
        <div className="md:text-xl font-bold">
            <Link href='/upload'>
                Upload
            </Link>
        </div>

    </nav>
  )
}

export default Nav