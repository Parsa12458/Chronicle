import BlogEditButton from "@/app/_components/BlogEditButton";
import BlogLikeButton from "@/app/_components/BlogLikeButton";
import CategoryBadge from "@/app/_components/CategoryBadge";
import CommentSection from "@/app/_components/CommentSection";
import ScrollToCommentButton from "@/app/_components/ScrollToCommentsButton";
import ShareButton from "@/app/_components/ShareButton";
import { auth } from "@/app/_lib/auth";
import {
  getBlog,
  getBlogComments,
  getBlogLikes,
  getCategory,
  getCommentsLikes,
  getUsersById,
} from "@/app/_lib/data-service";
import { formatDate } from "@/app/_lib/helper";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { FaUserCircle } from "react-icons/fa";

export default async function Page({ params }) {
  const queryClient = new QueryClient();

  // Get the active session
  const session = await auth();
  const currentUser = session?.user;

  // Get blog id
  const { blogId } = await params;

  // Fetch blog
  const blog = await getBlog(blogId);

  // Fetch blog category
  const category = await getCategory(blog.categoryId);

  // Fetch author
  const author = await getUsersById(blog.authorId);

  // Prefetch blogLikes
  await queryClient.prefetchQuery({
    queryKey: ["blogLikes", +blogId],
    queryFn: () => getBlogLikes(+blogId),
  });

  // Prefetch blog comments
  await queryClient.prefetchQuery({
    queryKey: ["blogComments", +blogId],
    queryFn: () => getBlogComments(+blogId),
  });

  // Use prefetched comments to only fetch users needed and comments likes
  const comments = queryClient.getQueryData(["blogComments", +blogId]) || [];
  const usersIds = [...new Set(comments?.map((comment) => comment.userId))];
  const commentsIds = comments.map((comment) => comment.id);

  // Prefetch users commented
  await queryClient.prefetchQuery({
    queryKey: ["users", usersIds],
    queryFn: () => getUsersById(usersIds),
  });

  // Prefetch commentLikes
  await queryClient.prefetchQuery({
    queryKey: ["commentLikes", +blogId, commentsIds],
    queryFn: () => getCommentsLikes(commentsIds),
  });

  // Convert quill delta to html
  const converter = new QuillDeltaToHtmlConverter(blog.content?.ops, {
    multiLineParagraph: false,
    inlineStyles: true,
  });
  const blogHtml = converter.convert();

  return (
    <main className="min-h-[calc(100vh-186px)] px-16 pb-12 pt-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <CategoryBadge bgColor={category?.bgColor} scale={1.15}>
          {category?.name}
        </CategoryBadge>
        <span className="ml-auto text-sm font-semibold text-primary">
          {formatDate(blog.createdAt)}
        </span>
      </div>
      <Link
        className="flex items-center gap-2.5 mt-6 w-max"
        href={`/users/${author?.id}`}
      >
        {author?.avatar ? (
          <Image
            className="w-8 h-8 aspect-square rounded-full object-center object-cover border-2 border-primary"
            src={author.avatar}
            alt={`${author.fullName} avatar`}
            width={32}
            height={32}
          />
        ) : (
          <FaUserCircle size={32} className="fill-primary" />
        )}
        <span className="text-sm font-semibold">{author?.fullName}</span>
      </Link>

      {/* Image */}
      <div className="flex items-start justify-between mt-4 gap-4">
        {blog.image && (
          <div className="relative w-full max-w-4xl h-[450px] rounded overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              className="object-cover"
              fill
            />
          </div>
        )}
        <div
          className={`flex mt-2 justify-center ${
            blog.image
              ? "flex-col items-center gap-6"
              : "flex-row items-start gap-4"
          }`}
        >
          <HydrationBoundary state={dehydrate(queryClient)}>
            <BlogLikeButton blogId={+blogId} currentUser={currentUser} />
            <ScrollToCommentButton blogId={+blogId} />
          </HydrationBoundary>
          <ShareButton />
        </div>
      </div>

      {/* Content */}
      <div
        className="prose mt-6 max-w-none font-medium border-b-2 pb-10 border-primary [&>*]:my-1 [&>p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blogHtml }}
      ></div>

      {/* Comments */}
      <h2 className="text-3xl font-bold mt-10" id="comments">
        Comments
      </h2>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommentSection blogId={+blogId} currentUser={currentUser} />
      </HydrationBoundary>

      {blog.authorId === currentUser.id && (
        <BlogEditButton userId={blog.authorId} blogId={blog.id} />
      )}
    </main>
  );
}
