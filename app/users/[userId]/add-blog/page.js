import AddBlogForm from "@/app/_components/AddBlogForm";

export default function Page() {
  return (
    <section className="px-16 min-h-[calc(100vh-186px)] max-w-[1440px] mx-auto mt-4 mb-16">
      <h1 className="text-4xl font-medium mb-6">Add Blog</h1>
      <AddBlogForm />
    </section>
  );
}
