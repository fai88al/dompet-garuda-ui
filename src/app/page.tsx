import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Security } from "@/components/sections/security";
import { ArticlesTeaser } from "@/components/sections/articles-teaser";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <HowItWorks />
      <Features />
      <Security />
      <ArticlesTeaser />
      <Footer />
    </main>
  );
}
