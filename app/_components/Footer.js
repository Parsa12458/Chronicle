import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";

function Footer() {
  return (
    <footer className="py-8 px-10 flex items-center justify-between bg-darkGreen text-background">
      <Logo color="background" />
      <nav>
        <Link
          href="/blogs"
          className="font-medium border-b border-b-background pb-0.5 px-0.5 hover:px-2.5 transition-all duration-300 text-base"
        >
          Explore Blogs
        </Link>
      </nav>

      <div className="font-semibold text-sm">
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
