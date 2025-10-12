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
      { insert: "💧 12 Simple Ways to Drink More Water" },
      { insert: "\n", attributes: { header: 1 } },

      {
        insert:
          "Your body is about 70% water, and drinking enough of it is vital for optimal health. Water plays many roles, including:",
      },
      { insert: "\n" },

      { insert: "Maintaining electrolyte balance and blood pressure" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Lubricating joints" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Regulating body temperature" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Promoting cell health" },
      { insert: "\n", attributes: { list: "bullet" } },

      { insert: "1. 🧠 Understand Your Fluid Needs" },
      { insert: "\n", attributes: { header: 2 } },

      {
        insert:
          "The common “8 cups a day” rule (64 oz / 1,920 ml) isn’t scientifically grounded.",
      },
      { insert: "\n" },
      { insert: "The National Academy of Medicine recommends:" },
      { insert: "\n" },
      { insert: "Men: 125 oz (3,700 ml)" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Women: 90 oz (2,700 ml)" },
      { insert: "\n", attributes: { list: "bullet" } },
      {
        insert:
          "Fluid needs vary based on activity level, climate, and health status. Listen to your thirst — but increase intake if you exercise, work outdoors, or live in a hot climate.",
      },
      { insert: "\n" },

      { insert: "2. 🎯 Set a Daily Goal" },
      { insert: "\n", attributes: { header: 2 } },

      {
        insert:
          "Setting a goal can motivate lasting change. Use the SMART framework:",
      },
      { insert: "\n" },
      { insert: "Specific" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Measurable" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Attainable" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Realistic" },
      { insert: "\n", attributes: { list: "bullet" } },
      { insert: "Time-bound" },
      { insert: "\n", attributes: { list: "bullet" } },
      {
        insert:
          "Example: “Drink 32 oz (960 ml) of water daily.” Track your progress to build the habit.",
      },
      { insert: "\n" },

      { insert: "3. 🚰 Keep a Reusable Water Bottle With You" },
      { insert: "\n", attributes: { header: 2 } },

      {
        insert:
          "Makes water accessible wherever you are — home, work, school, or on the go.",
      },
      { insert: "\n" },
      { insert: "Acts as a visual cue to drink more." },
      { insert: "\n" },
      { insert: "Eco-friendly alternative to single-use plastic bottles." },
      { insert: "\n" },

      { insert: "4. ⏰ Set Reminders" },
      { insert: "\n", attributes: { header: 2 } },

      {
        insert:
          "Use apps or alarms to prompt hydration. Try reminders every 30 minutes or hourly refills. Especially helpful if you’re forgetful or busy.",
      },
      { insert: "\n" },

      { insert: "5. 🔄 Replace Other Drinks With Water" },
      { insert: "\n", attributes: { header: 2 } },

      {
        insert:
          "Swap soda, juice, and sports drinks for water. These drinks often contain added sugars, which can harm your health.",
      },
      { insert: "\n" },
      {
        insert:
          "Limit added sugar to <5% of daily calories — one soda can exceed this.",
      },
      { insert: "\n" },
      {
        insert:
          "High sugar intake is linked to obesity, type 2 diabetes, and heart disease.",
      },
      { insert: "\n" },
      {
        insert:
          "Water is a simple, cost-effective way to cut calories and improve health.",
      },
      { insert: "\n" },
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
        className="prose mt-10 max-w-none font-medium border-b-2 pb-10 border-primary"
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
