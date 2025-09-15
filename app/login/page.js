import { FcGoogle } from "react-icons/fc";
import InputField from "../_components/InputField";
import Link from "next/link";
import Button from "../_components/Button";

export const metadata = {
  title: "Chronicle — Login",
  description:
    "Access your Chronicle account to continue reading, writing, and connecting with a thoughtful community. Secure login for returning users.",
  keywords: ["Chronicle login", "sign in", "secure access"],
};

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-186px)] py-10">
      <div className="w-96 bg-lightGreen p-9">
        <h2 className="mb-6 text-center text-3xl font-semibold">Login</h2>
        <button className="flex w-full items-center justify-center gap-2 rounded border border-mediumGreen py-1.5 font-semibold cursor-pointer">
          <FcGoogle size={20} />
          <span>Login with Google</span>
        </button>

        <form className="mt-7 flex flex-col items-stretch space-y-5">
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
          <Button additionalClasses="!w-full">Login</Button>
        </form>

        <span className="mt-2.5 inline-block text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/signup">
            Signup
          </Link>
        </span>
      </div>
    </div>
  );
}
