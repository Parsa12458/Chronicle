import Cta from "./_components/Cta";
import FadeInSection from "./_components/FadeInSection";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import LastBlogs from "./_components/LastBlogs";

export const metadata = {
  title: "Chronicle — Stories That Stay With You",
  description:
    "Chronicle is a modern blogging platform where ideas, insights, and stories come to life. Explore curated content across health, tech, lifestyle, and more.",
  keywords: ["Chronicle", "blog", "stories", "writing", "publishing"],
  authors: [{ name: "Parsa Shirafkan" }],
};

export default function Page() {
  return (
    <div>
      <Header />
      <FadeInSection>
        <Hero />
      </FadeInSection>

      <FadeInSection>
        <LastBlogs />
      </FadeInSection>

      <FadeInSection>
        <Cta />
      </FadeInSection>
      <Footer />
    </div>
  );
}
