import "@/app/_styles/index.css";
import { Nunito } from "next/font/google";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

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
        className={`${nunito.className} text-darkGreen antialiased bg-background min-h-screen flex flex-col flex-1`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={true}
            containerClassName="mt-2"
            toastOptions={{
              className: "!px-4 font-medium !max-w-full",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
