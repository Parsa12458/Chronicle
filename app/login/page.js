import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../_lib/actions";

export const metadata = {
  title: "Chronicle — Login",
  description:
    "Access your Chronicle account to continue reading, writing, and connecting with a thoughtful community. Secure login for returning users.",
  keywords: ["Chronicle login", "sign in", "secure access"],
};

export default function Page() {
  return (
    <div className="flex justify-center items-center mb-10 flex-1">
      <div className="w-96 bg-lightGreen p-9 border-darkGreen border rounded-md">
        <h2 className="mb-6 text-center text-3xl font-semibold">Login</h2>
        <form action={signInWithGoogle}>
          <button
            className="flex w-full items-center justify-center gap-2 rounded border border-mediumGreen py-1.5 font-semibold cursor-pointer"
            type="submit"
          >
            <FcGoogle size={20} />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}
