"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { contentCreationServices } from "@/lib/constants";
import {
  seoOptimizationBenefits,
  seoOptimizationServices,
  processStepsSEO,
  toolsUsedSEO,
} from "@/lib/content-constants";

const SEOOptimization: FC = () => {
  const router = useRouter();

  return (
    <main className="w-11/12 mx-auto py-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        SEO Optimization Services
      </h1>
      {contentCreationServices.map((service) => {
        return (
          <div key={service.name} className="text-center text-lg my-4">
            {service.name === "SEO Optimization" && (
              <div>
                <span className="mt-4">{service.info}</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Why SEO Optimization Matters */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Why SEO Optimization Matters</h2>
        <p className="my-4">
          SEO (Search Engine Optimization) optimization is the practice of
          enhancing your website’s content, structure, and technical aspects to
          rank higher on search engine results pages (SERPs). Our SEO
          optimization services help ensure that your website is discoverable by
          your target audience, increasing organic traffic and boosting your
          visibility.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {seoOptimizationBenefits.map((benefit) => (
            <li key={benefit.title}>
              <span className="font-bold text-secondary">{benefit.title}:</span>{" "}
              {benefit.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Our SEO Optimization Services */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">
          Our SEO Optimization Services
        </h2>
        <p className="my-4">
          We offer comprehensive SEO services to enhance your website's
          visibility and increase organic traffic.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {seoOptimizationServices.map((service) => (
            <li key={service.title}>
              <span className="font-bold text-secondary">{service.title}:</span>{" "}
              {service.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Our Process */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Our Process</h2>
        <ul className="list-decimal list-inside space-y-4">
          {processStepsSEO.map((step) => (
            <li key={step.title}>
              <span className="font-bold text-secondary">{step.title}:</span>{" "}
              {step.description}
            </li>
          ))}
        </ul>
        <p className="my-4">
          <span className="font-bold text-secondary">Timeline:</span> SEO
          projects typically take 2 to 6 weeks, depending on the complexity and
          scope of the services required.
        </p>
      </section>

      {/* Tools We Use */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Tools We Use</h2>
        <p className="my-4">
          We utilize industry-leading tools to optimize your website for SEO:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {toolsUsedSEO.map((tool, index) => (
            <li key={index}>{tool}</li>
          ))}
        </ul>
      </section>

      {/* Pricing Tiers */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Pricing Tiers</h2>
        <p className="my-4">
          Our pricing for SEO optimization services is tailored to your
          business's needs. Pricing is based on the complexity and scope of the
          project:
        </p>
        {contentCreationServices.map((service) => {
          return (
            <>
              {service.name === "SEO Optimization" && (
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

      {/* Get Started Section */}
      <section className="my-8">
        <h2 className="text-2xl font-semibold">Get Started Today</h2>
        <p className="my-4">
          Ready to boost your website's visibility with our SEO optimization
          services?{" "}
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

export default SEOOptimization;
