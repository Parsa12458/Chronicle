import Image from "next/image";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa6";
import ctaIllustration from "@/public/cta-illustration.svg";
import { auth } from "../_lib/auth";

async function Cta() {
  const session = await auth();
  const currentUser = session?.user;

  return (
    <section className=" bg-primary mt-16 text-white italic py-12">
      <div className="max-w-[1440px] px-32 flex items-center justify-between mx-auto gap-20 xl:px-20 lg:px-12 lg:gap-12 md:flex-col md:text-center md:gap-16 sm:px-8">
        <div>
          {currentUser ? (
            <>
              <h2 className="text-5xl mb-5 xl:text-4xl lg:text-3xl lg:mb-3">
                Welcome back, {session.user.name.split(" ")[0]}!
              </h2>
              <p className="text-xl max-w-md lg:text-lg">
                Ready to share your thoughts? Start writing or explore blogs
                from our community.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-5xl mb-5 xl:text-4xl lg:text-3xl lg:mb-3">
                Join our community
              </h2>
              <p className="text-xl max-w-md lg:text-lg">
                Read, comment, and connect with authors who care about clarity,
                depth, and good design.
              </p>
            </>
          )}
          <Button
            bgColor="background"
            textColor="darkGreen"
            additionalClasses="flex items-center gap-2 not-italic mt-5 md:mx-auto"
            href={currentUser ? `/users/${currentUser.id}/add-blog` : "/login"}
          >
            <span>{currentUser ? "Start Writing" : "Get Started"}</span>
            <FaArrowRight className="fill-darkGreen" />
          </Button>
        </div>

        <Image
          src={ctaIllustration}
          alt="personal opinions illustration"
          className="w-3xs lg:w-44 md:w-52"
        />
      </div>
    </section>
  );
}

export default Cta;
