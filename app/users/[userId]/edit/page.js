import EditProfileForm from "@/app/_components/EditProfileForm";
import { auth } from "@/app/_lib/auth";
import { getUsersById } from "@/app/_lib/data-service";

export default async function Page() {
  // Fetch the user informations and set them as default value
  const session = await auth();
  const currentUser = await getUsersById(session?.user?.id);

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">Edit Profile</h1>
      <EditProfileForm
        currentUser={{ ...currentUser, email: session?.user?.email }}
      />
    </section>
  );
}
