import Image from "next/image";
import Button from "./_components/Button";
import notFoundIllustration from "@/public/not-found-illustration.svg";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center flex-col text-center px-12 mb-10 flex-1">
      <Image
        src={notFoundIllustration}
        alt="not found illustration"
        className="w-md mb-12"
        priority
      />
      <h1 className="text-3xl font-semibold mb-5">Page Not Found!</h1>
      <Button href="/blogs">Explore Blogs</Button>
    </main>
  );
}
