"use client";

import BlogItem from "../_components/BlogItem";
import { getBlogs, getCategories, getUsersById } from "../_lib/data-service";
import InputField from "../_components/InputField";
import InputSelect from "../_components/InputSelect";
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

function BlogsList({ filters }) {
  const loaderRef = useRef(null);

  // Fetch all categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Selected category object
  const selectedCategory = categories.find(
    (cat) => cat.key === filters.category
  );

  // Fetch blogs
  const {
    data: blogs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["blogs", filters],
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({
        ...filters,
        category: selectedCategory,
        page: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
  });

  const allBlogs = blogs?.pages.flat() || [];

  // Fetch authors
  const authorIds = [...new Set(allBlogs?.map((b) => b.authorId))];
  const { data: authors } = useQuery({
    queryKey: ["authors", authorIds],
    queryFn: getUsersById,
  });

  // Scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage]);

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
        {allBlogs.length === 0 ? (
          <h1 className="text-3xl leading-10 text-center font-semibold mt-4">
            No blog posts found.
            <br />
            Try adjusting your filters or search keywords.
          </h1>
        ) : (
          allBlogs.map((blog) => (
            <BlogItem
              key={blog.id}
              blog={blog}
              category={categories.find(
                (category) => category.id === blog.categoryId
              )}
              author={authors?.find((author) => author.id === blog.authorId)}
            />
          ))
        )}
      </div>

      {isFetchingNextPage && <Spinner isFull={false} />}
      <div ref={loaderRef} className="h-10" />
    </>
  );
}

export default BlogsList;
