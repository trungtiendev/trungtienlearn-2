import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LatestBlogPosts } from "@/components/home/LatestBlogPosts";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Courses */}
      <FeaturedCourses />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Latest Blog Posts */}
      <LatestBlogPosts />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
