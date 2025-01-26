"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { contentCreationServices } from "@/lib/constants";
import {
  productGuideBenefits,
  productGuideServices,
  productGuideProcessSteps,
  productGuideTools,
} from "@/lib/content-constants";

const ProductGuidesManualsServices: FC = () => {
  const router = useRouter();

  return (
    <main className="w-11/12 mx-auto py-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Product Guides and Manuals Writing Services
      </h1>
      {contentCreationServices.map((service) => {
        return (
          <div key={service.name} className="text-center text-lg my-4">
            {service.name === "Product Guides/Manuals" && (
              <div>
                <span className="mt-4">{service.info}</span>
              </div>
            )}
          </div>
        );
      })}

      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          Why Product Guides and Manuals Matter
        </h2>
        <p className="my-4">
          Clear, concise, and user-friendly product guides and manuals are
          essential for improving customer satisfaction and reducing support
          costs. Whether for hardware, software, or consumer products,
          professionally written manuals ensure users understand and maximize
          your product's potential.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {productGuideBenefits.map((benefit) => (
            <li key={benefit.title}>
              <span className="font-bold text-secondary">{benefit.title}:</span>{" "}
              {benefit.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          Our Product Guides and Manuals Services
        </h2>
        <p className="my-4">
          We specialize in creating detailed, easy-to-follow documentation
          tailored to your product and audience.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {productGuideServices.map((service) => (
            <li key={service.title}>
              <span className="font-bold text-secondary">{service.title}:</span>{" "}
              {service.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Our Process</h2>{" "}
        <p className="my-4">
          Project timelines depend on the manual's length, complexity, and
          audience. Typical projects take 2–6 weeks.
        </p>
        <ul className="list-decimal pl-6 space-y-2">
          {productGuideProcessSteps.map((step) => (
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
          We leverage industry-leading tools to create high-quality product
          guides and manuals:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {productGuideTools.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <p className="my-4">
          Pricing is determined by the scope, length, and technical complexity
          of the manual.
        </p>
        {contentCreationServices.map((service) => {
          return (
            <>
              {service.name === "Product Guides/Manuals" && (
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
          Ready to create clear, professional product guides and manuals?{" "}
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

export default ProductGuidesManualsServices;
