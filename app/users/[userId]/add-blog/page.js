import AddBlogForm from "@/app/_components/AddBlogForm";
import { auth } from "@/app/_lib/auth";
import { getCategories } from "@/app/_lib/data-service";

export const metadata = {
  title: "Chronicle — Write a New Blog",
  description:
    "Create and publish your blog on Chronicle. Share your ideas with the world.",
  keywords: ["write blog", "create story", "publish article"],
};

export default async function Page() {
  // Get the active session
  const session = await auth();
  const currentUser = session?.user;

  const categories = await getCategories();

  return (
    <main className="px-16 mt-4 mb-16 flex-1">
      <h1 className="text-4xl font-medium mb-6">Add Blog</h1>
      <AddBlogForm categories={categories} currentUser={currentUser} />
    </main>
  );
}
