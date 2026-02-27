import Link from "next/link";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="grid grid-cols-3 items-center py-6 px-10 bg-darkGreen text-background lg:grid-cols-[1fr_1fr_max-content] md:grid-cols-[1fr_max-content] sm:grid-cols-1 sm:justify-center sm:gap-3 sm:py-8">
      <div className="w-max sm:mx-auto">
        <Logo color="background" />
      </div>
      <nav className="justify-self-center md:hidden">
        <Link
          href="/blogs"
          className="font-medium border-b border-b-background pb-0.5 px-0.5 hover:px-2.5 transition-all duration-300 text-base"
        >
          Explore Blogs
        </Link>
      </nav>
      <div className="justify-self-end text-sm font-semibold text-right sm:justify-self-center sm:text-center">
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
