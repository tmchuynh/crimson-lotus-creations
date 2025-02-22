"use client";

import LoadingIndicator from "@/components/Loading";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { jobPositions } from "@/lib/constants";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

const ApplicantSubmissionPage = () => {
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [portfolioLinks, setPortfolioLinks] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 150);
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
    });
  }, [loading]);

  if (loading) {
    return <LoadingIndicator />;
  }

  // Handle position selection
  const handlePositionChange = (
    position: string,
    checked: boolean | string
  ) => {
    setSelectedPositions((prev) =>
      checked ? [...prev, position] : prev.filter((p) => p !== position)
    );
  };

  // Handle portfolio link updates
  const handlePortfolioChange = (value: string, index: number) => {
    setPortfolioLinks((prevState) =>
      prevState.map((link, i) => (i === index ? value : link))
    );
  };

  // Allow pasting and handle it
  const handlePaste: (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => void = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    const pastedValue = e.clipboardData.getData("Text");
    handlePortfolioChange(pastedValue, index); // Update the link state for the corresponding input
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;

    // Validation
    if (selectedPositions.length === 0) {
      setError("Please select at least one position.");
      return;
    }

    if (portfolioLinks.every((link) => link.trim() === "")) {
      setError("Please provide at least one portfolio link.");
      return;
    }

    if (formElement) {
      emailjs
        .send("service_8nwkxet", "application-forms-sub", {
          from_name: formData.name,
          reply_to: formData.email,
          from_email: formData.email,
          user_email: "tinamchuynh@gmail.com",
          positions: selectedPositions.join(", "),
        })
        .then(
          (response) => {
            console.log("Success:", response);
          },
          (error) => {
            console.error("Error submitting the form:", error);
            setError(
              "There was an issue submitting the form. Please try again."
            );
          }
        );
    }

    // Simulated form submission
    setTimeout(() => {
      setSuccessMessage("Your application has been submitted successfully!");
      setSelectedPositions([]);
      setSuccessMessage(null);
      setPortfolioLinks([""]);
    }, 350);
  };

  return (
    <main className="w-10/12 md:w-11/12 mx-auto py-6">
      <DynamicBreadcrumb />
      <h1>Apply for Open Positions</h1>
      <p>
        We invite you to apply for one or more of our available job openings. To
        ensure your application is complete, please upload your most recent
        resume and include at least one link to your portfolio showcasing your
        work. While submitting a cover letter is optional, we encourage you to
        include one to help us better understand your motivations and
        qualifications for the role. We look forward to reviewing your
        application and learning more about the value you can bring to our team.
      </p>

      {error && <p className="text-destructive font-bold">{error}</p>}
      {successMessage && (
        <p className="text-success font-bold">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} id="application-form" className="space-y-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold">
            Name
          </label>
          <input
            autoCapitalize="on"
            inputMode="text"
            autoComplete="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold">
            Email
          </label>
          <input
            autoCapitalize="off"
            inputMode="email"
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
            }}
            required
            className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <section>
          <h2>Important Note</h2>
          <p>
            Please email your resume and cover letter(s) to the following email:
            <Button variant={"link"}>tinamchuynh@gmail.com</Button>
          </p>
        </section>

        {/* Job Positions Selection */}
        <section>
          <h2>Select the position(s) you're applying for:</h2>
          <p>
            Please take a moment to carefully review the available positions and
            select the one (or more) that best aligns with your skills,
            experience, and career aspirations. Each role has specific
            requirements, so be sure to choose positions where your
            qualifications match. If you are interested in multiple roles, feel
            free to apply for all that interest you, and we will evaluate your
            application for the most suitable opportunity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-5">
            {jobPositions.map((position) => (
              <div key={position.title} className="flex items-center">
                <Checkbox
                  id={position.title}
                  checked={selectedPositions.includes(position.title)}
                  onCheckedChange={(checked) =>
                    handlePositionChange(position.title, checked)
                  }
                />
                <label htmlFor={position.title} className="ml-2">
                  <p>{position.title}</p>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Links (At Least One Required) */}
        <section>
          <h2>Portfolio Links</h2>
          <p>
            Please include <strong>at least one link</strong> to your portfolio
            to showcase your work. Whether it's a personal website, GitHub
            repository, or a collection of relevant projects, your portfolio
            gives us a clearer understanding of your skills and abilities. If
            you have multiple portfolio links, feel free to include them so we
            can explore a variety of your work.
          </p>
          <div className="space-y-3 flex flex-col">
            <Button
              variant={"accent"}
              onClick={() => setPortfolioLinks((prev) => [...prev, ""])}
              className="w-full md:w-1/2 lg:w-1/3"
            >
              Add another portfolio link
            </Button>
            {portfolioLinks.map((link, index) => (
              <Input
                key={index}
                type="url"
                onPaste={(e) => handlePaste(e, index)}
                onChange={(e) => handlePortfolioChange(e.target.value, index)}
                placeholder={`Portfolio Link ${index + 1}`}
                value={link}
                className="border border-border rounded w-11/12 md:w-full mx-auto md:h-12 md:text-md lg:text-xl placeholder:text-accent-2"
              />
            ))}
          </div>
        </section>

        {/* Submit Button */}
        <section className="mt-4">
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </section>
      </form>
    </main>
  );
};

export default ApplicantSubmissionPage;
