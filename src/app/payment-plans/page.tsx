"use client";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { paymentPlans } from "@/lib/constants";
import { useTheme } from "next-themes";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import RootLayout from "../layout";

const PaymentPlansPage: FC = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <>
      <RootLayout
        title="Flexible Payment Plans - Phoenix Code Studio"
        description="Explore our flexible payment plans to make your digital transformation easy and affordable. We offer tailored options for businesses of all sizes."
      >
        <main className="w-10/12 md:w-11/12 mx-auto py-6">
          <DynamicBreadcrumb />
          {/* Page Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Our Payment Plans
            </h1>
            <p className="mt-4">
              We offer flexible payment options designed to accommodate your
              budget and project requirements, making it easier for businesses
              of all sizes to get started. Whether you prefer a pay-as-you-go
              model or an extended payment plan, our options provide
              transparency, convenience, and financial flexibility. Choose from
              a variety of plans tailored to meet your needs, ensuring smooth
              collaboration throughout the project lifecycle. With clear terms
              and no hidden fees, our payment plans allow you to stay on track
              while bringing your vision to life seamlessly and affordably.
            </p>
          </header>

          {/* Displaying each plan in a vertical layout similar to blogs */}
          <section className="space-y-8">
            {paymentPlans.map((plan, index) => (
              <div key={index}>
                <div className="flex flex-col w-full">
                  {/* Plan Title */}
                  <h3>{plan.title}</h3>

                  {/* Plan Description */}
                  <p className="mb-6">{plan.description}</p>

                  {/* Plan Details */}
                  <ul className="text-lg">
                    {plan.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <Button
                    variant={theme === "dark" ? "outline" : "secondary"}
                    className="my-7 w-1/3 self-end"
                    onClick={() => {
                      router.push(plan.route);
                    }}
                  >
                    Learn More
                  </Button>
                </div>
                {index !== paymentPlans.length - 1 && <hr />}
              </div>
            ))}
          </section>
        </main>
      </RootLayout>
    </>
  );
};

export default PaymentPlansPage;
