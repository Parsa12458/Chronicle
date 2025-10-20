import BlogItem from "../_components/BlogItem";
import { getBlogs, getCategories, getUsersById } from "../_lib/data-service";
import InputField from "../_components/InputField";
import InputSelect from "../_components/InputSelect";

async function BlogsList({ filters }) {
  // Get all categories
  const categories = await getCategories();

  // Selected Category ID
  const selectedCategory = categories?.find(
    (cat) => cat.key === filters.category
  );

  // Get all blogs
  const blogs = await getBlogs({
    ...filters,
    category: selectedCategory,
  });

  // Fetch only the needed users
  const authorIds = [...new Set(blogs.map((b) => b.authorId))];
  const authors = await getUsersById(authorIds);

  return (
    <>
      <div className="flex gap-2 mb-6">
        <InputField
          id="search"
          placeholder="Search blog posts..."
          paramEnabled={true}
        />
        <InputSelect
          label="category"
          id="category"
          options={categories}
          paramEnabled={true}
        />
        <InputSelect
          label="sort by"
          id="sortBy"
          options={[
            {
              id: 1,
              name: "Newest",
              key: "newest",
            },
            {
              id: 2,
              name: "Oldest",
              key: "oldest",
            },
          ]}
          paramEnabled={true}
        />
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        {blogs.length === 0 ? (
          <h1 className="text-3xl leading-10 text-center font-semibold mt-4">
            No blog posts found.
            <br />
            Try adjusting your filters or search keywords.
          </h1>
        ) : (
          blogs?.map((blog) => (
            <BlogItem
              blog={blog}
              category={categories?.find(
                (category) => category.id === blog.categoryId
              )}
              author={authors?.find((author) => author.id === blog.authorId)}
              key={blog.id}
            />
          ))
        )}
      </div>
    </>
  );
}

export default BlogsList;
