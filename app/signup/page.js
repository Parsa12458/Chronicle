import { FcGoogle } from "react-icons/fc";
import InputField from "../_components/InputField";
import Button from "../_components/Button";
import Link from "next/link";
import { signInWithGoogle } from "../_lib/actions";

export const metadata = {
  title: "Chronicle — Join Chronicle",
  description:
    "Create your Chronicle account to start sharing stories, exploring insights, and connecting with a thoughtful community. Signing up is fast, free, and secure.",
  keywords: ["Chronicle signup", "create account", "join blog", "register"],
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-186px)] py-10">
      <div className="w-96 bg-lightGreen p-9">
        <h2 className="mb-6 text-center text-3xl font-semibold">Signup</h2>
        <form action={signInWithGoogle}>
          <button
            className="flex w-full items-center justify-center gap-2 rounded border border-mediumGreen py-1.5 font-semibold cursor-pointer"
            type="submit"
          >
            <FcGoogle size={20} />
            <span>Signup with Google</span>
          </button>
        </form>

        <form className="mt-7 flex flex-col items-stretch space-y-5">
          <InputField
            id="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />
          <InputField
            id="email"
            label="Email Address"
            placeholder="example@gmail.com"
            type="email"
          />
          <InputField
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button additionalClasses="!w-full">Start your journey!</Button>
        </form>

        <span className="mt-2.5 inline-block text-sm">
          Already have an account?{" "}
          <Link className="underline" href="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
