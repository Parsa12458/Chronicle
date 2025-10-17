import {
  getCategories,
  getLastBlogs,
  getUsersById,
} from "../_lib/data-service";
import BlogItem from "./BlogItem";

async function LastBlogsList() {
  // Get last 6 blogs
  const blogs = await getLastBlogs();

  // Get all categories
  const categories = await getCategories();

  // Fetch only the needed users
  const authorIds = [...new Set(blogs.map((b) => b.authorId))];
  const authors = await getUsersById(authorIds);

  return (
    <div className="flex gap-8 flex-wrap justify-center">
      {blogs?.length === 0 ? (
        <p className="text-xl">No blog posts available at the moment.</p>
      ) : (
        blogs?.map((blog, i) => (
          <BlogItem
            blog={blog}
            key={i}
            category={categories?.find(
              (category) => category.id === blog.categoryId
            )}
            author={authors?.find((author) => author.id === blog.authorId)}
          />
        ))
      )}
    </div>
  );
}

export default LastBlogsList;
