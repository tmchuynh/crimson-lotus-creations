"use client";
import { Badge } from "@/components/ui/badge";
import { booksToRead } from "@/lib/blog-constants";
import React from "react";

const BlogPage = () => {
  return (
    <div className="w-10/12 md:w-11/12 mx-auto py-6">
      <article className="space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 text-center">
            Books to Read as a Developer
          </h1>
          <p>
            Choosing a career in tech means embracing a lifelong journey of
            learning and adaptation. The industry is constantly evolving, with
            new programming languages, frameworks, tools, and best practices
            emerging all the time. Staying ahead requires curiosity, dedication,
            and a willingness to continuously expand your skill set. But then
            again, isn’t that true for any career? Growth and improvement are
            essential in every field, and technology is no exception. The best
            developers, engineers, and tech professionals are those who actively
            seek out knowledge, refine their craft, and adapt to change. Whether
            you’re learning a new coding language, mastering a complex
            algorithm, or understanding better ways to collaborate with a team,
            improvement is the key to success. The ever-changing nature of tech
            might seem overwhelming, but it’s also what makes it so exciting.
            Every project, challenge, and breakthrough presents an opportunity
            to learn something new. In this dynamic field, the willingness to
            stay curious and continuously grow is what sets apart great
            professionals from the rest.
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant={"outline"} className="text-sm">
              #books
            </Badge>
            <Badge variant={"outline"} className="text-sm">
              #self-development
            </Badge>
            <Badge variant={"outline"} className="text-sm">
              #career
            </Badge>
          </div>
        </header>

        {booksToRead.map((book, index) => (
          <section key={index}>
            <h2 className="text-3xl font-semibold mb-6 text-secondary">
              {book.title}
            </h2>
            <p>{book.description}</p>
            {book.details.map((details, index) => (
              <p key={index}>{details}</p>
            ))}
          </section>
        ))}

        <section>
          <h2 className="text-3xl font-semibold mb-6 text-secondary">
            Conclusion
          </h2>
          <p>
            Are there any other must-read books you'd recommend? As new
            developers enter the industry, fresh editions and groundbreaking
            books continue to emerge. Which ones do you think deserve a spot on
            this list? With so many valuable resources out there, no one can
            read them all—but we can share and learn together!
          </p>
          <p>Happy coding!</p>
        </section>

        <footer className="mt-8 text-center">
          <p>
            For more insights on <strong>Software Development</strong>, check
            out our{" "}
            <a href="#" className="text-primary underline">
              Blog
            </a>{" "}
            and stay informed about best practices and emerging trends.
          </p>
        </footer>
      </article>
    </div>
  );
};

export default BlogPage;
