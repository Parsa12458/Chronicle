import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../_lib/actions";

export const metadata = {
  title: "Chronicle — Login",
  description:
    "Access your Chronicle account to continue reading, writing, and connecting with a thoughtful community. Secure login for returning users.",
  keywords: ["Chronicle login", "sign in", "secure access"],
};

export default function Page() {
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  return (
    <div className="flex justify-center items-center mb-10 flex-1">
      <div className="w-96 bg-lightGreen p-9 border-darkGreen border rounded-md">
        <h2 className="mb-6 text-center text-3xl font-semibold">Login</h2>
        {isDemo && (
          <p className="mb-4 text-center text-sm text-red-700">
            Login is disabled in demo mode
          </p>
        )}
        <form action={isDemo ? undefined : signInWithGoogle}>
          <button
            disabled={isDemo}
            className={`flex w-full items-center justify-center gap-2 rounded border border-mediumGreen py-1.5 font-semibold ${
              isDemo ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
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
