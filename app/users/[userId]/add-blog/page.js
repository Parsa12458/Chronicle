import AddBlogForm from "@/app/_components/AddBlogForm";
import { getCategories } from "@/app/_lib/data-service";

const currentUser = { id: 1 };

export default async function Page() {
  const categories = await getCategories();

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">Add Blog</h1>
      <AddBlogForm categories={categories} currentUser={currentUser} />
    </section>
  );
}
