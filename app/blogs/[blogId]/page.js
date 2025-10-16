import BlogLikeButton from "@/app/_components/BlogLikeButton";
import Button from "@/app/_components/Button";
import CategoryBadge from "@/app/_components/CategoryBadge";
import CommentSection from "@/app/_components/CommentSection";
import InputTextarea from "@/app/_components/InputTextarea";
import ScrollToCommentButton from "@/app/_components/ScrollToCommentsButton";
import ShareButton from "@/app/_components/ShareButton";
import { formatDate } from "@/app/_lib/helper";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { FaArrowRight } from "react-icons/fa6";

const blog = {
  id: 1,
  title: "How to Drink Water Consistently?",
  content: {
    ops: [
      {
        attributes: {
          size: "huge",
        },
        insert: "Huge",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          size: "large",
        },
        insert: "Large",
      },
      {
        insert: "\nNormal\n",
      },
      {
        attributes: {
          size: "small",
        },
        insert: "small",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          bold: true,
        },
        insert: "bold",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          italic: true,
        },
        insert: "italic",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          underline: true,
        },
        insert: "underline",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          strike: true,
        },
        insert: "line-through",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          color: "#e60000",
        },
        insert: "red text",
      },
      {
        insert: "\n",
      },
      {
        attributes: {
          background: "#fdd835",
        },
        insert: "yellow background",
      },
      {
        insert: "\nquote",
      },
      {
        attributes: {
          blockquote: true,
        },
        insert: "\n",
      },
      {
        insert: "code",
      },
      {
        attributes: {
          "code-block": "plain",
        },
        insert: "\n",
      },
      {
        insert: "one numbered list",
      },
      {
        attributes: {
          list: "ordered",
        },
        insert: "\n",
      },
      {
        insert: "two",
      },
      {
        attributes: {
          list: "ordered",
        },
        insert: "\n",
      },
      {
        insert: "three",
      },
      {
        attributes: {
          list: "ordered",
        },
        insert: "\n",
      },
      {
        insert: "bullet",
      },
      {
        attributes: {
          list: "bullet",
        },
        insert: "\n",
      },
      {
        insert: "bullet2",
      },
      {
        attributes: {
          list: "bullet",
        },
        insert: "\n",
      },
      {
        insert: "bullet3",
      },
      {
        attributes: {
          list: "bullet",
        },
        insert: "\n",
      },
      {
        insert: "right aligned",
      },
      {
        attributes: {
          align: "right",
          direction: "rtl",
        },
        insert: "\n",
      },
      {
        insert: "centered",
      },
      {
        attributes: {
          direction: "rtl",
          align: "center",
        },
        insert: "\n",
      },
    ],
  },
  category: { name: "Personal", bgColor: "#f87171" },
  author: "Shayan Yousefi",
  date: "2025-09-21",
};

const blogLikes = [
  {
    createdAt: "2025-10-01T09:17:00.000Z",
    userId: "user_002",
    blogId: "1",
  },
  {
    createdAt: "2025-10-01T09:20:00.000Z",
    userId: "user_003",
    blogId: "1",
  },
  {
    createdAt: "2025-10-01T09:22:00.000Z",
    userId: "user_004",
    blogId: "1",
  },
  {
    createdAt: "2025-10-01T09:25:00.000Z",
    userId: "user_005",
    blogId: "1",
  },
];

export default async function Page({ params }) {
  const { blogId } = await params;
  const authorized = true;

  const converter = new QuillDeltaToHtmlConverter(blog.content.ops, {
    multiLineParagraph: false,
    inlineStyles: true,
  });
  const blogHtml = converter.convert();

  return (
    <main className="min-h-[calc(100vh-186px)] px-16 pb-12 pt-4">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <CategoryBadge bgColor={blog.category.bgColor} scale={1.15}>
          {blog.category.name}
        </CategoryBadge>
        <span className="ml-auto text-sm font-semibold text-primary">
          {formatDate(blog.date)}
        </span>
      </div>

      <div className="flex items-center gap-2.5 mt-6">
        <div className="bg-primary w-8 aspect-square rounded-full"></div>
        <span className="text-sm font-semibold">{blog.author}</span>
      </div>

      {/* Image */}
      <div className="flex items-start justify-between">
        <div className="w-4xl h-[500px] bg-primary mt-4 rounded"></div>
        <div className="space-y-6">
          <BlogLikeButton blogLikes={blogLikes} blogId={blogId} />
          <ScrollToCommentButton />
          <ShareButton />
        </div>
      </div>

      {/* Content */}
      <div
        className="prose mt-10 max-w-none font-medium border-b-2 pb-10 border-primary [&>*]:my-1 [&>p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blogHtml }}
      ></div>

      {/* Comments */}
      <h2 className="text-3xl font-bold mt-10" id="comments">
        Comments
      </h2>
      {authorized ? (
        <div className="flex flex-col mt-6 w-full">
          <span className="text-sm font-semibold mb-1.5">
            189 comments have been posted — what’s your take?
          </span>
          <InputTextarea row={5} placeholder="Write your comment here..." />
          <Button additionalClasses="ml-auto mt-3">Submit</Button>
        </div>
      ) : (
        <div className="italic w-full bg-primary py-12 rounded px-16 text-background flex flex-col items-center mt-6 text-center gap-3 mb-10">
          <h3 className="text-3xl">Join our community</h3>
          <p className="text-lg max-w-lg">
            Read, comment, and connect with authors who care about clarity,
            depth, and good design.
          </p>
          <Button
            bgColor="background"
            textColor="darkGreen"
            additionalClasses="flex items-center gap-2 not-italic mt-4"
            href="/signup"
          >
            <span>Get Started</span>
            <FaArrowRight className="fill-darkGreen" />
          </Button>
        </div>
      )}

      <CommentSection />
    </main>
  );
}
