import EditProfileForm from "@/app/_components/EditProfileForm";

export default function Page() {
  // Fetch the user informations and set them as default value

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">Edit Profile</h1>
      <EditProfileForm />
    </section>
  );
}
