import { ErrorBoundary } from "react-error-boundary";
import BlogsList from "../_components/BlogsList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Error from "../error";

export const metadata = {
  title: "Chronicle — Explore Blogs",
  description:
    "Browse all blog posts on Chronicle — a modern platform for storytelling, technical insights, and cultural perspectives. Discover curated content across design, development, lifestyle, and more.",
  keywords: ["Chronicle blog", "blog archive", "all blogs"],
  authors: [{ name: "Parsa Shirafkan" }],
};

export default async function Page({ searchParams }) {
  // Selected Filters
  const filters = await searchParams;

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">All Blogs</h1>

      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Spinner isFull={true} />}>
          <BlogsList filters={filters} />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
