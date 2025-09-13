import Image from "next/image";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa6";
import ctaIllustration from "@/public/cta-illustration.svg";

function Cta() {
  return (
    <section className=" bg-primary mt-16 text-white italic py-12">
      <div className="max-w-[1440px] px-32 flex items-center justify-between mx-auto">
        <div>
          <h2 className="text-5xl mb-5">Join our community</h2>
          <p className="text-xl max-w-md">
            Read, comment, and connect with authors who care about clarity,
            depth, and good design.
          </p>
          <Button
            bgColor="background"
            textColor="darkGreen"
            additionalClasses="flex items-center gap-2 not-italic mt-5"
            href="/signup"
          >
            <span>Get Started</span>
            <FaArrowRight className="fill-darkGreen" />
          </Button>
        </div>

        <Image
          src={ctaIllustration}
          alt="personal opinions illustration"
          className="w-3xs"
        />
      </div>
    </section>
  );
}

export default Cta;
