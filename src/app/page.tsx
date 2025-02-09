"use client";

import AboutSection from "@/components/AboutSection";
import CallToAction from "@/components/CallToAction";
import FeaturedBlogs from "@/components/FeaturedBlogs";
import FeaturedProjects from "@/components/FeaturedProjects";
import EmphasizeText from "@/components/Highlighted";
import JoinUs from "@/components/JoinUs";
import ServiceHighlights from "@/components/ServiceHighlights";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { GoRocket } from "react-icons/go";
import "swiper/css";

const WelcomePage: FC = () => {
  const router = useRouter();

  const navigateToServices = () => {
    router.push("/services");
  };

  return (
    <main className="mx-auto py-6">
      <section className="mb-16 mx-auto w-11/12 text-center">
        <Image
          src="/images/logo.png"
          alt="Phoenix Code Studio Logo"
          width={500}
          height={500}
          className="w-72 h-72 rounded-t-md object-cover mx-auto mb-1"
        />
      </section>

      {/* Welcome Section */}
      <section className="my-16 mx-auto w-11/12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Welcome to Phoenix Code Studio
        </h1>
        <h2 className="inline-flex items-center gap-3">
          <GoRocket className="text-accent-1" />
          <GoRocket className="text-accent-1" />
          This Is Where Ideas Take Flight!
          <GoRocket className="text-accent-1" />
          <GoRocket className="text-accent-1" />
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl my-4">
          Your vision is more than just an idea—it’s a future waiting to be
          built. At Phoenix Code Studio, we merge strategic creativity,
          innovative technology, and bold design to craft transformative digital
          experiences that don’t just exist but thrive. Whether you're launching
          a brand, redefining your online presence, or building something
          entirely groundbreaking, we’re here to turn your aspirations into
          reality.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl my-4">
          We create high-performance, visually stunning websites, engaging
          content, and tailored digital solutions designed to enhance user
          experience, drive engagement, and accelerate business growth. Our
          expertise in SEO optimization, responsive design, and cutting-edge
          development ensures that your brand doesn’t just compete—it leads.
        </p>
        <p className="text-lg md:text-xl lg:text-2xl my-4">
          At Phoenix Code Studio, we don’t just build—we ignite possibilities,
          empower brands, and shape the future of digital success.
        </p>
        <Button
          className="w-2/3 md:w-1/2 my-2 py-3 text-lg font-semibold"
          onClick={navigateToServices}
        >
          Start Your Journey With Us
        </Button>
      </section>

      {/* Services Highlight Section */}
      <ServiceHighlights />

      <JoinUs />

      {/* About Section */}
      <AboutSection />

      {/* Call to Action Section */}
      <CallToAction />

      {/* Featured Projects Section */}
      <FeaturedProjects />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Featured Blogs Section */}
      <FeaturedBlogs />
    </main>
  );
};

export default WelcomePage;
