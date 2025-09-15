import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

function Footer() {
  return (
    <footer className="grid grid-cols-3 items-center py-6 px-10 bg-darkGreen text-background">
      <Logo color="background" />
      <nav className="justify-self-center">
        <Link
          href="/blogs"
          className="font-medium border-b border-b-background pb-0.5 px-0.5 hover:px-2.5 transition-all duration-300 text-base"
        >
          Explore Blogs
        </Link>
      </nav>
      <div className="justify-self-end text-sm font-semibold text-right">
        <p>© 2025 Chronicle. All rights reserved.</p>
        <p>
          Created by{" "}
          <Link
            className="bg-primary px-1 py-[1px] hover:-skew-x-12 inline-block duration-300 transition-all will-change-transform"
            href="https://github.com/Parsa12458"
            target="_blank"
          >
            Parsa Shirafkan
          </Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
