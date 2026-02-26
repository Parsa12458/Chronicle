import AddBlogForm from "@/app/_components/AddBlogForm";
import { auth } from "@/app/_lib/auth";
import { getBlog, getCategories, getCategory } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  // Get the active session
  const session = await auth();
  const currentUser = session?.user;

  const categories = await getCategories();

  // Get blog id
  const { blogId } = await params;

  // Fetch blog
  const blog = await getBlog(blogId);

  // Fetch blog category
  const category = await getCategory(blog.categoryId);

  return (
    <main className="px-16 mt-4 mb-16 flex-1">
      <h1 className="text-4xl font-medium mb-6">Edit blog: {blog.title}</h1>
      <AddBlogForm
        categories={categories}
        currentUser={currentUser}
        defaultBlog={blog}
        defaultCategory={category}
        isEdit={true}
      />
    </main>
  );
}
