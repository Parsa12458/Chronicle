import EditProfileForm from "@/app/_components/EditProfileForm";
import { auth } from "@/app/_lib/auth";
import { getUsersById } from "@/app/_lib/data-service";

export const metadata = {
  title: "Chronicle — Edit Profile",
  description:
    "Update your Chronicle profile information, avatar, and personal details.",
  keywords: ["edit profile", "Chronicle account", "update user info"],
};

export default async function Page() {
  // Fetch the user informations and set them as default value
  const session = await auth();
  const currentUser = await getUsersById(session?.user?.id);

  return (
    <main className="px-16 mt-4 mb-16 flex-1 w-full max-w-[1440px] mx-auto">
      <h1 className="text-4xl font-medium mb-6">Edit Profile</h1>
      <EditProfileForm
        currentUser={{ ...currentUser, email: session?.user?.email }}
      />
    </main>
  );
}
