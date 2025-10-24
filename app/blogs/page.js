import { ErrorBoundary } from "react-error-boundary";
import BlogsList from "../_components/BlogsList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Error from "../error";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBlogs, getCategories, getUsersById } from "../_lib/data-service";

export const metadata = {
  title: "Chronicle — Explore Blogs",
  description:
    "Browse all blog posts on Chronicle — a modern platform for storytelling, technical insights, and cultural perspectives. Discover curated content across design, development, lifestyle, and more.",
  keywords: ["Chronicle blog", "blog archive", "all blogs"],
  authors: [{ name: "Parsa Shirafkan" }],
};

export default async function Page({ searchParams }) {
  // Selected category, sort, and search value
  const filters = await searchParams;

  const queryClient = new QueryClient();

  // Prefetch categories
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Use prefetched categories to pass the selected category object to getBlogs for filtering
  const categories = queryClient.getQueryData(["categories"]);
  const selectedCategory = categories.find(
    (cat) => cat.key === filters.category
  );

  // Prefetch blogs with infinite query
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["blogs", filters],
    queryFn: ({ pageParam = 1 }) =>
      getBlogs({
        ...filters,
        category: selectedCategory,
        page: pageParam,
        limit: 10,
      }),
  });

  // Use prefetched blogs to only fetch authors needed
  const blogPages = queryClient.getQueryData(["blogs", filters]);
  const allBlogs = blogPages?.pages?.flat();
  const authorIds = [...new Set(allBlogs?.map((b) => b.authorId))];

  // Prefetch authors
  await queryClient.prefetchQuery({
    queryKey: ["authors", authorIds],
    queryFn: () => getUsersById(authorIds),
  });

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">All Blogs</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary FallbackComponent={Error}>
          <Suspense fallback={<Spinner isFull={true} />}>
            <BlogsList filters={filters} />
          </Suspense>
        </ErrorBoundary>
      </HydrationBoundary>
    </section>
  );
}
