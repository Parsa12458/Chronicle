import { Suspense } from "react";
import Spinner from "./Spinner";
import LastBlogsList from "./LastBlogsList";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../error";

function LastBlogs() {
  return (
    <section className="max-w-[1440px] px-20 mx-auto mt-16 lg:px-12 sm:px-8">
      <h2 className="text-5xl font-medium text-center mb-10 lg:text-4xl sm:mb-8">
        Last Blogs
      </h2>

      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Spinner isFull={false} />}>
          <LastBlogsList />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}

export default LastBlogs;
