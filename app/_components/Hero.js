import Image from "next/image";
import heroIllustration from "@/public/hero-illustration.svg";

function Hero() {
  return (
    <section className="flex items-center justify-center gap-32 px-16 min-h-[calc(100vh-150px)] max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-6xl font-semibold leading-[70px] mb-6 max-w-md">
          Stories That Stay With You
        </h1>
        <h3 className="text-xl font-semibold max-w-2xs">
          Where ideas meet readers. Share your voice, shape the conversation.
        </h3>
      </div>

      <Image
        src={heroIllustration}
        alt="share opinion illustration"
        className="w-5/12"
        priority
      />
    </section>
  );
}

export default Hero;
