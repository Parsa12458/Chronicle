import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

function Header() {
  return (
    <header className="py-8 px-10 flex items-center justify-between">
      <Logo />
      <nav>
        <Link
          href="/blogs"
          className="font-medium border-b border-b-darkGreen pb-0.5 px-0.5 hover:px-2.5 transition-all duration-300 text-base"
        >
          Explore Blogs
        </Link>
      </nav>
      <Button href="/signup">Get Started</Button>
    </header>
  );
}

export default Header;
