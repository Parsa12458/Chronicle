import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { auth } from "@/app/_lib/auth";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

async function Header() {
  const session = await auth();

  return (
    <header className="grid grid-cols-3 items-center py-8 px-10">
      <Logo />
      <nav className="justify-self-center">
        <Link
          href="/blogs"
          className="font-medium border-b border-b-darkGreen pb-0.5 px-0.5 hover:px-2.5 transition-all duration-300 text-base"
        >
          Explore Blogs
        </Link>
      </nav>
      <div className="justify-self-end">
        {session?.user ? (
          <Link
            className="flex items-center gap-2.5 cursor-pointer"
            href={`/users/${session.user.id}`}
          >
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={`${session.user.name} avatar`}
                width={32}
                height={32}
                className="rounded-full border-2 border-primary"
                referrerPolicy="no-referrer"
              />
            ) : (
              <FaUserCircle size={32} className="fill-primary" />
            )}
            <span className="font-semibold">{session.user.name}</span>
          </Link>
        ) : (
          <Button href="/signup">Get Started</Button>
        )}
      </div>
    </header>
  );
}

export default Header;
