import BlogItem from "./BlogItem";

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
];

function LastBlogs() {
  return (
    <section className="max-w-[1440px] px-16 mx-auto mt-16">
      <h2 className="text-5xl font-medium text-center mb-10">Last Blogs</h2>

      <div className="flex gap-8 flex-wrap justify-center">
        {blogs.map((blog, i) => (
          <BlogItem blog={blog} key={i} />
        ))}
      </div>
    </section>
  );
}

export default LastBlogs;
