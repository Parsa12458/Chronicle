import AddBlogForm from "@/app/_components/AddBlogForm";
import { getBlog, getCategories, getCategory } from "@/app/_lib/data-service";

const currentUser = { id: 1 };

export default async function Page({ params }) {
  const categories = await getCategories();

  // Get blog id
  const { blogId } = await params;

  // Fetch blog
  const blog = await getBlog(blogId);

  // Fetch blog category
  const category = await getCategory(blog.categoryId);

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">Edit blog: {blog.title}</h1>
      <AddBlogForm
        categories={categories}
        currentUser={currentUser}
        defaultBlog={blog}
        defaultCategory={category}
        isEdit={true}
      />
    </section>
  );
}
