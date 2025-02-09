"use client";

import CallToAction from "@/components/CallToAction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import { FAQs } from "@/lib/constants";
import { FC } from "react";
import RootLayout from "@/app/layout"; // Assuming RootLayout is imported
import { Button } from "@/components/ui/button";

const FAQPage: FC = () => {
  return (
    <RootLayout
      title="Frequently Asked Questions - Phoenix Code Studio"
      description="Find answers to the most common questions about our services, products, and processes. Explore FAQs related to digital solutions, project workflows, and more."
    >
      <main className="w-10/12 md:w-11/12 mx-auto py-6">
        <DynamicBreadcrumb />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
          Welcome to Our FAQs Page!
        </h1>
        <p className="mt-4">
          Got questions? We’ve got answers! This page is your go-to resource for
          quick, clear information about our services, products, and processes.
          Whether you're exploring our offerings, seeking guidance, or
          troubleshooting an issue, you’ll find solutions right here.
        </p>
        <p>
          Can’t find what you’re looking for?{" "}
          <Button variant={"link"} className="p-0 m-0 h-fit">
            Reach out to us anytime
          </Button>{" "}
          - we’re happy to help!
        </p>
        <section className="mb-8">
          <Accordion type="single" collapsible className="w-full">
            {FAQs.map((question, index) => (
              <AccordionItem value={`${index}`} key={index}>
                <AccordionTrigger className="text-start">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{question.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <CallToAction />
      </main>
    </RootLayout>
  );
};

export default FAQPage;
