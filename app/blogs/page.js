import BlogItem from "../_components/BlogItem";
import Button from "../_components/Button";
import InputField from "../_components/InputField";
import InputSelect from "../_components/InputSelect";

export const metadata = {
  title: "Chronicle — Explore Blogs",
  description:
    "Browse all blog posts on Chronicle — a modern platform for storytelling, technical insights, and cultural perspectives. Discover curated content across design, development, lifestyle, and more.",
  keywords: ["Chronicle blog", "blog archive", "all blogs"],
  authors: [{ name: "Parsa Shirafkan" }],
};

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
  {
    id: 5,
    title: "How I Built a Blog Platform in 7 Days",
    content:
      "I challenged myself to build a full-featured blog platform in just one week — from schema design to deployment. I used Next.js for the frontend, Supabase for the backend, and Tailwind for styling. Along the way, I hit snags with authentication, comment threading, and like systems, but I learned a ton. This post is a breakdown of my architecture, tradeoffs, and what I’d do differently next time. If you’re building something similar, this might save you hours.",
    category: { name: "DevLog", bgColor: "#a78bfa" },
    author: "Ali Rezaei",
    date: "2025-08-30",
  },
  {
    id: 6,
    title: "The Psychology Behind Procrastination",
    content:
      "We all procrastinate — but why? It’s not just laziness. It’s fear of failure, perfectionism, and sometimes even fear of success. In this post, I explore the psychological roots of procrastination, how dopamine plays a role, and what strategies actually helped me break the cycle. If you’ve ever stared at a blank screen or delayed a task for no good reason, this post might help you understand what’s really going on.",
    category: { name: "Mindset", bgColor: "#fb923c" },
    author: "Niloofar Jafari",
    date: "2025-09-10",
  },
  {
    id: 7,
    title: "What I Learned From Living Without Internet for a Week",
    content:
      "No Wi-Fi, no mobile data — just offline life. I didn’t expect how much I’d miss random Googling or how quiet my mind would become. This post is about the discomfort, clarity, and unexpected joy of disconnecting.",
    category: { name: "Personal", bgColor: "#f87171" },
    author: "Reza Kiani",
    date: "2025-09-11",
  },
  {
    id: 8,
    title: "My Go-To Comfort Meals That Don’t Take Hours",
    content:
      "Comfort food doesn’t have to mean slow cooking or fancy ingredients. These are my favorite quick meals that feel warm, nostalgic, and satisfying — even on a busy day.",
    category: { name: "Food", bgColor: "#facc15" },
    author: "Fatemeh Rahimi",
    date: "2025-08-28",
  },
  {
    id: 9,
    title: "How I Started Reading Again After Years of Burnout",
    content:
      "I used to love books. Then life got loud. This post is about how I slowly rebuilt my reading habit — without pressure — and found joy in quiet pages again.",
    category: { name: "Lifestyle", bgColor: "#34d399" },
    author: "Sara Mohammadi",
    date: "2025-09-03",
  },
  {
    id: 10,
    title: "The Tiny Habits That Changed My Mental Health",
    content:
      "Big changes felt overwhelming. So I started small — drinking water, stepping outside, journaling for 2 minutes. This post shares the micro-habits that made a real difference in how I feel day to day.",
    category: { name: "Health", bgColor: "#f87171" },
    author: "Mohammad Karimi",
    date: "2025-08-18",
  },
  {
    id: 11,
    title: "Why I Started Saying No More Often",
    content:
      "I used to say yes to everything — events, favors, extra work. It left me drained. This post is about learning to say no with kindness and how it helped me protect my energy.",
    category: { name: "Mindset", bgColor: "#fb923c" },
    author: "Niloofar Jafari",
    date: "2025-09-12",
  },
  {
    id: 12,
    title: "How I Made My Room Feel Like a Retreat",
    content:
      "Your space affects your mood. I didn’t realize how much until I started changing my lighting, layout, and colors. This post is about creating a cozy, calming room that feels like a personal retreat.",
    category: { name: "Lifestyle", bgColor: "#34d399" },
    author: "Ali Rezaei",
    date: "2025-09-05",
  },
  {
    id: 13,
    title: "The Best Budgeting Trick I Learned From My Grandma",
    content:
      "Forget spreadsheets — my grandma taught me a simple envelope method that actually works. This post shares her wisdom and how I adapted it for digital life.",
    category: { name: "Finance", bgColor: "#fbbf24" },
    author: "Fatemeh Rahimi",
    date: "2025-08-25",
  },
  {
    id: 14,
    title: "How I Found My Style Without Following Trends",
    content:
      "Fashion used to feel like chasing trends. Then I started dressing for how I wanted to feel. This post is about building a personal style that’s expressive, comfortable, and uniquely mine.",
    category: { name: "Fashion", bgColor: "#a78bfa" },
    author: "Sara Mohammadi",
    date: "2025-07-30",
  },
  {
    id: 15,
    title: "The Playlist That Gets Me Through Tough Days",
    content:
      "Music has always been my emotional anchor. This post is a love letter to the songs that lift me up, calm me down, and remind me I’m not alone.",
    category: { name: "Music", bgColor: "#60a5fa" },
    author: "Reza Kiani",
    date: "2025-09-06",
  },
  {
    id: 16,
    title: "How I Started Drawing Again After a Decade",
    content:
      "I used to sketch all the time. Then life got busy. Picking up a pencil again felt awkward — but also healing. This post is about rediscovering creativity without judgment.",
    category: { name: "Art", bgColor: "#a78bfa" },
    author: "Niloofar Jafari",
    date: "2025-09-13",
  },
  {
    id: 17,
    title: "What I Learned From My First Public Speaking Gig",
    content:
      "I was terrified. But I said yes. This post is about the nerves, the prep, the awkward moments — and the confidence I gained from stepping on stage.",
    category: { name: "Personal", bgColor: "#f87171" },
    author: "Mohammad Karimi",
    date: "2025-08-29",
  },
  {
    id: 18,
    title: "The Ritual That Helps Me End My Day With Peace",
    content:
      "Evenings used to blur into sleep. Now I have a simple ritual — tea, journaling, and a short walk — that helps me wind down with intention. This post shares how I built it and why it matters.",
    category: { name: "Health", bgColor: "#f87171" },
    author: "Fatemeh Rahimi",
    date: "2025-09-14",
  },
  {
    id: 19,
    title: "How I Made Friends as an Introvert",
    content:
      "Making friends felt hard — especially as someone who avoids big crowds. This post is about small steps, quiet courage, and how I built meaningful connections without pretending to be someone I’m not.",
    category: { name: "Relationships", bgColor: "#fb923c" },
    author: "Sara Mohammadi",
    date: "2025-08-20",
  },
  {
    id: 20,
    title: "The Case for Doing Nothing on Sundays",
    content:
      "I used to fill Sundays with errands and catch-up tasks. Now I protect them as sacred rest days. This post is about the joy of doing nothing — and why it’s not lazy.",
    category: { name: "Lifestyle", bgColor: "#34d399" },
    author: "Ali Rezaei",
    date: "2025-09-08",
  },
];

const categories = {
  all: "All Categories",
  personal: "Personal Stories",
  lifestyle: "Lifestyle",
  health: "Health & Wellness",
  travel: "Travel",
  food: "Food & Recipes",
  relationships: "Relationships",
  education: "Education",
  career: "Career & Work",
  finance: "Finance & Budgeting",
  parenting: "Parenting",
  entertainment: "Entertainment",
  tech: "Technology",
  fashion: "Fashion & Style",
  art: "Art & Design",
  photography: "Photography",
  music: "Music",
  books: "Books & Literature",
  spirituality: "Spirituality",
  opinion: "Opinions & Commentary",
  humor: "Humor & Satire",
  culture: "Culture & Society",
  history: "History",
  sports: "Sports",
  news: "Current Events",
  activism: "Activism & Causes",
};

const sortByOptions = {
  newest: "Newest",
  oldest: "Oldest",
  mostLiked: "Most Popular",
};

export default async function Page({ searchParams }) {
  const { category, sortBy } = await searchParams;
  console.log(category, sortBy);

  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">All Blogs</h1>

      <div className="flex gap-2 mb-6">
        <InputField id="search" placeholder="Search blog posts..." />
        <Button>Search</Button>
        <InputSelect label="category" id="category" options={categories} />
        <InputSelect label="sort by" id="sortBy" options={sortByOptions} />
      </div>

      <div className="flex gap-6 flex-wrap justify-center">
        {blogs.map((blog) => (
          <BlogItem blog={blog} key={blog.id} />
        ))}
      </div>
    </section>
  );
}
