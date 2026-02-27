import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { auth } from "@/app/_lib/auth";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import { getUsersById } from "../_lib/data-service";

async function Header() {
  const session = await auth();
  const currentUser = await getUsersById(session?.user?.id);

  const avatarUrl = currentUser?.avatar || session?.user?.image;
  const displayName = currentUser?.fullName || session?.user?.name;

  return (
    <header className="grid grid-cols-3 items-center py-8 px-10 md:grid-cols-2 sm:px-6">
      <Logo />
      <nav className="justify-self-center md:hidden">
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
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={`${displayName} avatar`}
                width={32}
                height={32}
                className="rounded-full border-2 border-primary"
                referrerPolicy="no-referrer"
                priority
              />
            ) : (
              <FaUserCircle size={32} className="fill-primary" />
            )}
            <span className="font-semibold">
              {displayName.split(" ").at(0)}
            </span>
          </Link>
        ) : (
          <Button href="/login">Get Started</Button>
        )}
      </div>
    </header>
  );
}

export default Header;
