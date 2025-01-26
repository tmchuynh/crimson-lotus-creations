"use client";

import { Badge } from "@/components/ui/badge";
import {
  emergingTrendsList,
  whatsNextList,
  howToPrepareList,
} from "@/lib/constants";
import React from "react";

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="space-y-8">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            The Future of JavaScript Frameworks
          </h1>
          <p className="text-sm text-gray-500">By Michael Lee – June 5, 2025</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Badge className="text-sm">#JavaScript</Badge>
            <Badge className="text-sm">#WebDevelopment</Badge>
            <Badge className="text-sm">#Frameworks</Badge>
            <Badge className="text-sm">#FutureTech</Badge>
          </div>
        </header>

        <section className="space-y-4">
          <p className="text-lg">
            With the rapid evolution of <strong>JavaScript frameworks</strong>{" "}
            like React, Vue, and Angular, staying ahead of the curve is crucial
            for developers. As the web development landscape continues to grow
            and adapt to new technologies, the future of JavaScript frameworks
            promises exciting opportunities and challenges. This article
            explores emerging trends and what they mean for developers and
            businesses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Why JavaScript Frameworks Matter
          </h2>
          <p className="text-lg">
            JavaScript frameworks have been at the forefront of modern web
            development for years. They streamline the process of building
            complex applications, enhance performance, and provide developers
            with the tools needed to create rich user experiences. Frameworks
            like React, Vue, Angular, and Svelte have empowered developers to
            build scalable, maintainable, and efficient web applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Emerging Trends in JavaScript Frameworks
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {emergingTrendsList.map((trend, index) => (
              <li key={index}>
                <strong>{trend.title}:</strong> {trend.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            What’s Next for Developers?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {whatsNextList.map((item, index) => (
              <li key={index}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            How to Prepare for the Future
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {howToPrepareList.map((item, index) => (
              <li key={index}>
                <strong>{item.title}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-secondary mb-4">
            Conclusion
          </h2>
          <p className="text-lg">
            The future of JavaScript frameworks is full of possibilities. As
            frameworks evolve to meet the demands of modern web development,
            they will continue to push the boundaries of what’s possible on the
            web. By staying informed and adaptable, developers can harness these
            tools to create innovative, high-performance applications that stand
            the test of time.
          </p>
        </section>

        <footer className="mt-8 text-center">
          <p className="text-sm">
            For more on <strong>JavaScript</strong> and{" "}
            <strong>Web Development</strong>, visit our{" "}
            <a href="#" className="text-primary underline">
              Blog
            </a>{" "}
            and follow us for the latest updates on emerging technologies.
          </p>
        </footer>
      </article>
    </div>
  );
};

export default BlogPage;
