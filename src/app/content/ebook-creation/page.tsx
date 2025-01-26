"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { contentCreationServices } from "@/lib/constants";
import {
  ebookBenefits,
  ebookServices,
  ebookProcessSteps,
  ebookTools,
} from "@/lib/content-constants";

const EbookCreationServices: FC = () => {
  const router = useRouter();

  return (
    <main className="w-11/12 mx-auto py-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        E-Book Creation Services
      </h1>
      {contentCreationServices.map((service) => {
        return (
          <div key={service.name} className="text-center text-lg my-4">
            {service.name === "eBook Creation" && (
              <div>
                <span className="mt-4">{service.info}</span>
              </div>
            )}
          </div>
        );
      })}

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Why E-Books Matter</h2>
        <p className="my-4">
          E-books are a powerful way to showcase your expertise, build brand
          authority, and provide value to your audience. Whether for lead
          generation, education, or monetization, a well-crafted e-book can set
          you apart.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {ebookBenefits.map((benefit) => (
            <li key={benefit.title}>
              <span className="font-bold text-secondary">{benefit.title}:</span>{" "}
              {benefit.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Our E-Book Creation Services</h2>
        <p className="my-4">
          We handle every aspect of e-book creation, from initial concept to
          final design.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {ebookServices.map((service) => (
            <li key={service.title}>
              <span className="font-bold text-secondary">{service.title}:</span>{" "}
              {service.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Our Process</h2>
        <p className="my-4">
          The timeline for e-book creation depends on factors such as the topic,
          length, complexity, target audience, and design requirements. Typical
          projects range from 2 to 6 weeks.
        </p>
        <ul className="list-decimal pl-6 space-y-2">
          {ebookProcessSteps.map((step) => (
            <li key={step.title}>
              <span className="font-bold text-secondary">{step.title}:</span>{" "}
              {step.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Tools We Use</h2>
        <p className="my-4">
          We leverage the best tools to create high-quality e-books:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {ebookTools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <p className="my-4">
          Our pricing is tailored to your specific needs and the scope of your
          project. Factors that influence pricing include:
        </p>
        {contentCreationServices.map((service) => {
          return (
            <>
              {service.name === "eBook Creation" && (
                <ul className="list-disc pl-6 space-y-2">
                  {service.pricingTiers.map((pricing) => (
                    <li key={pricing.name}>
                      <span className="font-bold text-secondary">
                        {pricing.name}:
                      </span>
                      <span className="pl-2">{pricing.info}</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          );
        })}
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Get Started Today</h2>
        <p className="my-4">
          Ready to create a captivating e-book that elevates your brand?{" "}
          <Button
            variant={"link"}
            onClick={() => {
              router.push("/contact");
            }}
            className="p-0 inline-flex m-0"
          >
            Contact us for a free consultation.
          </Button>
        </p>
      </section>
    </main>
  );
};

export default EbookCreationServices;
