import Image from "next/image";
import heroIllustration from "@/public/hero-illustration.svg";
import Button from "./Button";

function Hero() {
  return (
    <section className="grid grid-cols-2 items-center gap-x-32 px-20 min-h-[calc(100vh-150px)] max-w-[1440px] mx-auto pt-5 xl:gap-x-16 lg:px-12 lg:gap-x-8 md:grid-cols-1 md:text-center md:gap-y-12 sm:px-8 sm:pt-3">
      <div className="md:justify-self-center">
        <h1 className="text-6xl font-semibold leading-[70px] mb-6 max-w-md xl:text-5xl xl:leading-14 xl:mb-4 lg:text-4xl lg:leading-10">
          Stories That Stay With You
        </h1>
        <h3 className="text-xl font-semibold max-w-2xs md:max-w-xs md:mx-auto mb-5">
          Where ideas meet readers. Share your voice, shape the conversation.
        </h3>
        <Button href="/blogs" additionalClasses="mx-auto hidden md:block">
          Explore Blogs
        </Button>
      </div>

      <Image
        src={heroIllustration}
        alt="share opinion illustration"
        className="w-full max-w-lg justify-self-end md:justify-self-center md:w-2/3"
        priority
      />
    </section>
  );
}

export default Hero;
