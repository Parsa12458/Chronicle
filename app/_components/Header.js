import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

function Header() {
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
        <Button href="/signup">Get Started</Button>
      </div>
    </header>
  );
}

export default Header;
