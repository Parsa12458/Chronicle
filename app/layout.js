import "@/app/_styles/index.css";
import { Nunito } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Chronicle — Stories That Stay With You",
  description:
    "Chronicle is a modern blogging platform where ideas, insights, and stories come to life. Explore curated content across health, tech, lifestyle, and more.",
  keywords: ["Chronicle", "blog", "stories", "writing", "publishing"],
  authors: [{ name: "Parsa Shirafkan" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.className} text-darkGreen antialiased bg-background`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
