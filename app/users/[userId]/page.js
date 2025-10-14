import UserBadge from "@/app/_components/UserBadge";
import { FaHeart, FaRegCommentDots } from "react-icons/fa6";
import { TbCalendarSmile, TbPencilHeart } from "react-icons/tb";
import { BsChatSquareHeart } from "react-icons/bs";
import { AiOutlineComment } from "react-icons/ai";
import { TiDocumentText } from "react-icons/ti";
import BlogItem from "@/app/_components/BlogItem";
import UserEditButton from "@/app/_components/UserEditButton";

const blogs = [
  {
    id: 1,
    title: "How to Drink Water Consistently?",
    content:
      "Staying hydrated sounds simple, but for many people, it’s surprisingly hard to do consistently. You might know your body needs water, especially during long work sessions or workouts, but you just forget or avoid it. Maybe it feels boring, or maybe you’re distracted by coffee, tea, or sugary drinks. In this post, I’ll share the mindset shift and small habits that helped me drink more water daily — without forcing it or relying on reminders.",
    category: { name: "Personal", bgColor: "#f87171" },
    author: "Shayan Yousefi",
    date: "2025-09-09",
  },
  {
    id: 2,
    title: "The Hidden Cost of Multitasking",
    content:
      "Multitasking feels productive — juggling emails, meetings, and side projects all at once. But the truth is, it’s draining your focus and reducing the quality of your work. Every time you switch tasks, your brain pays a cognitive toll. In this post, I break down the science behind task-switching fatigue, share my experience transitioning to deep work blocks, and offer tips to reclaim your attention in a noisy world.",
    category: { name: "Productivity", bgColor: "#60a5fa" },
    author: "Parsa Nikbakht",
    date: "2025-08-22",
  },
  {
    id: 3,
    title: "Why I Stopped Using Social Media for a Month",
    content:
      "I didn’t quit social media out of frustration — I did it out of curiosity. What would happen if I removed the constant stream of updates, likes, and notifications for 30 days? The first week was weird. I felt disconnected, even anxious. But then something shifted: I had more time, more clarity, and more presence in my day. This post is about what I learned, what I missed, and why I’m not going back to the old habits.",
    category: { name: "Lifestyle", bgColor: "#34d399" },
    author: "Sara Mohammadi",
    date: "2025-07-15",
  },
  {
    id: 4,
    title: "Understanding Jalali vs Gregorian Dates in Web Apps",
    content:
      "If you’ve ever built a calendar or date picker for Persian users, you know the Jalali vs Gregorian challenge is real. It’s not just about formatting — it’s about respecting cultural expectations and making sure your app feels native. In this post, I walk through how I handled dual calendar support, timezone quirks, and localization edge cases using Next.js and custom date logic. It’s a deep dive for devs who care about inclusive UX.",
    category: { name: "Tech", bgColor: "#fbbf24" },
    author: "Parsa Nikbakht",
    date: "2025-09-01",
  },
];

export default async function Page({ params }) {
  const { userId } = await params;

  return (
    <div className="min-h-[calc(100vh-186px)] pt-6 pb-16 px-16 max-w-[1440px] mx-auto relative">
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary w-32 aspect-square rounded-full"></div>
        <h1 className="text-3xl font-semibold mt-5">Shayan Yousefi</h1>
        <p className="max-w-3xl mt-3">
          Shayan Yousefi’s website is a great spot to see her photography, with
          a super clean design that lets her photos take center stage. It’s easy
          to navigate, so you can quickly dive into her galleries. Each shot
          feels like it’s telling its own story, giving you a glimpse into her
          unique style and perspective.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Activities</h2>
        <div className="flex flex-wrap mt-5 gap-5">
          <UserBadge
            icon={
              <TbCalendarSmile
                size={40}
                className="stroke-primary"
                strokeWidth={1.5}
              />
            }
            title={`2 Days`}
            body={`You've been a member of Chronicle`}
          />
          <UserBadge
            icon={<FaHeart size={36} className="fill-primary" />}
            title={`6 Blogs`}
            body={`You've liked`}
          />
          <UserBadge
            icon={<FaRegCommentDots size={35} className="fill-primary" />}
            title={`2 Comments`}
            body={`You've written`}
          />
          <UserBadge
            icon={<BsChatSquareHeart size={35} className="fill-primary" />}
            title={`7 Likes`}
            body={`You've received on your comments`}
          />
          <UserBadge
            icon={<TiDocumentText size={36} className="fill-primary" />}
            title={`4 Blogs`}
            body={`Published on Chronicle`}
          />
          <UserBadge
            icon={<TbPencilHeart size={38} className="stroke-primary" />}
            title={`6 Blogs`}
            body={`Received on your blogs`}
          />
          <UserBadge
            icon={<AiOutlineComment size={38} className="fill-primary" />}
            title={`14 Comments`}
            body={`Written by readers on your blogs`}
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <div className="flex gap-6 flex-wrap mt-5">
          {blogs.map((blog) => (
            <BlogItem blog={blog} key={blog.id} />
          ))}
        </div>
      </div>

      <UserEditButton userId={userId} />
    </div>
  );
}
