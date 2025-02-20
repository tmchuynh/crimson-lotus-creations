"use client";

import { Badge } from "@/components/ui/badge";
import DynamicBreadcrumb from "@/components/ui/breadcrumb-dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BpCheckbox } from "@/components/ui/checkbox-custom";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useBetweenLargeAndXL from "@/lib/onlyLargerScreens";
import useSmallScreen from "@/lib/useSmallScreen";
import {
  cn,
  formatNumber,
  getDaySuffix,
  parseReadingTimeToSeconds,
  setSlug,
  sortBlogsByDate,
} from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState, useCallback } from "react";
import { blogs } from "@/lib/blog-posts";
import { useTheme } from "next-themes";
import useMediumScreen from "@/lib/useMediumScreen";
import { BlogPost } from "@/lib/interfaces";

const BlogDisplayPage: FC = () => {
  const router = useRouter();
  const isSmallDevice = useSmallScreen();
  const isMediumDevice = useMediumScreen();
  const isLargerScreen = useBetweenLargeAndXL();
  const { theme } = useTheme();

  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedLength, setSelectedLength] = useState<string[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [openYear, setOpenYear] = useState<number | null>(null);
  const [openMonth, setOpenMonth] = useState<number | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);

  const [dropdownOpen, setDropdownOpen] = useState({
    topic: false,
    date: false,
    year: false,
    month: false,
    author: false,
  });
  const [filtersCleared, setFiltersCleared] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);

  // Calculate the indexes for pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle articles per page change
  const handleArticlesPerPageChange = (value: number) => {
    setArticlesPerPage(value);
    setCurrentPage(1); // Reset to the first page when articles per page changes
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / articlesPerPage);

  // Manage which collapsible is open
  const handleCollapsibleChange = (
    collapsible: "topic" | "date" | "author" | "month" | "year",
    value: number | null = null
  ) => {
    switch (collapsible) {
      case "year":
        // If the year is being toggled, check if it’s already open.
        // If it’s open, close it, and also close all its months.
        if (openYear === value) {
          setOpenYear(null);
          setOpenMonth(null); // Close all months if the year is closed
        } else {
          setOpenYear(value); // Open the year
        }
        break;

      case "month":
        // If the month is being toggled, simply toggle the respective month.
        setOpenMonth(openMonth === value ? null : value);
        break;

      case "date":
        // If "date" collapsible is closed, close all year and month collapsibles.
        setOpenCollapsible(openCollapsible === "date" ? null : "date");
        setOpenYear(null); // Close all years
        setOpenMonth(null); // Close all months
        break;

      case "author":
      case "topic":
        // Handle other collapsibles like "author" and "topic"
        setOpenCollapsible(
          openCollapsible === collapsible ? null : collapsible
        );
        break;

      default:
        break;
    }
  };

  const handleFilter = useCallback(() => {
    let filtered = blogs;

    // Filter by topics
    if (selectedTopics.length > 0) {
      filtered = filtered.filter((blog) =>
        blog.topics.some((topic) => selectedTopics.includes(topic))
      );
    }

    // Filter by reading time
    if (selectedLength.length > 0) {
      filtered = filtered
        .filter((blog) => selectedLength.includes(blog.timeSpan))
        .sort((a, b) => {
          const aTime = parseReadingTimeToSeconds(a.time);
          const bTime = parseReadingTimeToSeconds(b.time);

          return aTime - bTime;
        });
    }

    // Filter by authors
    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedAuthors.includes(blog.author)
      );
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected years, months, and days
    if (selectedYears.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedYears.includes(String(blog.date.year))
      );
    }

    if (selectedMonths.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedMonths.includes(`${blog.date.year}-${blog.date.month}`)
      );
    }

    // Filter by selected days
    if (selectedDays.length > 0) {
      filtered = filtered.filter((blog) =>
        selectedDays.includes(
          `${blog.date.year}-${blog.date.month}-${blog.date.day}`
        )
      );
    }

    // Handle no results
    if (filtered.length === 0) {
      if (filtersCleared) {
        setTimeout(() => setNoResults(true), 2500);
      } else {
        setNoResults(true);
        setTimeout(() => {
          setSelectedTopics([]);
          setSelectedLength([]);
        }, 250);
      }

      // Sort original blogs
      setFilteredBlogs(sortBlogsByDate(blogs));

      setTimeout(() => setNoResults(false), 4000);
    } else {
      setNoResults(false);
      if (selectedLength.length > 0) {
        setFilteredBlogs(filtered);
      } else {
        // Sort filtered blogs
        setFilteredBlogs(sortBlogsByDate(filtered));
      }
    }
  }, [
    blogs,
    selectedTopics,
    selectedLength,
    selectedAuthors,
    searchQuery,
    filtersCleared,
    selectedYears,
    selectedMonths,
    selectedDays,
  ]);

  const clearFilters = (e?: string) => {
    setSelectedTopics([]);
    setSelectedLength([]);
    setSelectedAuthors([]);
    setSelectedDays([]);
    setSelectedMonths([]);
    setSelectedYears([]);
    setSearchQuery("");
    setOpenCollapsible(null);
    setNoResults(false);
    setFilteredBlogs(sortBlogsByDate(blogs));
    if (!e) {
      setFiltersCleared(true);
      setTimeout(() => setFiltersCleared(false), 4000);
    }
  };

  const readingLength = Array.from(new Set(blogs.map((blog) => blog.timeSpan)));

  // const authors = Array.from(new Set(blogs.map((blog) => blog.author)));

  const topicCounts: Record<string, number> = blogs.reduce((acc, blog) => {
    blog.topics.forEach((topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const lengthCount = readingLength.reduce((acc, length) => {
    acc[length] = blogs.filter((blog) => blog.timeSpan === length).length;
    return acc;
  }, {} as Record<string, number>);

  // const authorCounts = authors.reduce((acc, author) => {
  //   acc[author] = blogs.filter((blog) => blog.author === author).length;
  //   return acc;
  // }, {} as Record<string, number>);

  const topics = Object.keys(topicCounts).sort();

  const handleTopicChange = (updatedTopics: string[]) => {
    setSelectedTopics(updatedTopics);
  };

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  function handleOpen(
    dropdown: "topic" | "date" | "author" | "year" | "month"
  ) {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: !dropdownOpen[dropdown],
    });
  }

  const handleTopicCheckboxChange = (topic: string, checked: boolean) => {
    if (checked) {
      handleTopicChange([...selectedTopics, topic]);
    } else {
      handleTopicChange(selectedTopics.filter((t) => t !== topic));
    }
    handleOpen("topic");
  };

  const handleDayCheckboxChange = (
    day: number,
    month: number,
    year: number,
    checked: boolean
  ) => {
    const dayString = `${year}-${month}-${day}`; // Use a "year-month-day" format for unique identification

    if (checked) {
      setSelectedDays((prev) => [...prev, dayString]); // Add the day to the selectedDays array
    } else {
      setSelectedDays((prev) => prev.filter((day) => day !== dayString)); // Remove the day if unchecked
    }
  };

  // const handleAuthorCheckboxChange = (author: string, checked: boolean) => {
  //   if (checked) {
  //     setSelectedAuthors((prevAuthors) => [...prevAuthors, author]);
  //   } else {
  //     setSelectedAuthors((prevAuthors) =>
  //       prevAuthors.filter((t) => t !== author)
  //     );
  //   }
  //   handleOpen("author");
  // };

  // Adjust the `handleCheckboxChange` function
  const handleCheckboxChange = (
    type: "day" | "month" | "year",
    value: { year: number; month?: number; day?: number },
    checked: boolean
  ) => {
    const day = value.day || 1; // Default to the 1st if no day provided
    const month = value.month || 1; // Default to January if no month provided
    const year = value.year;

    const dayKey = `${year}-${month}-${day}`;
    const monthKey = `${year}-${month}`;

    if (type === "day") {
      // Handle the checkbox change for a specific day
      if (checked) {
        setSelectedDays([...selectedDays, dayKey]);
      } else {
        setSelectedDays(selectedDays.filter((d) => d !== dayKey));
      }
    } else if (type === "month") {
      if (checked) {
        setSelectedMonths([...selectedMonths, monthKey]);
        setSelectedDays(
          selectedDays.filter((d) => !d.startsWith(`${monthKey}-`))
        );
      } else {
        setSelectedMonths(selectedMonths.filter((d) => d !== monthKey));
      }
    } else if (type === "year") {
      if (checked) {
        setSelectedYears([...selectedYears, `${year}`]);
        setSelectedMonths(
          selectedMonths.filter((d) => !d.startsWith(`${year}-`))
        );
        setSelectedDays(selectedDays.filter((d) => !d.startsWith(`${year}-`)));
      } else {
        setSelectedYears(selectedYears.filter((d) => d !== `${year}`));
      }
    }
  };

  const handleTopicClick = (topic: string) => {
    clearFilters("topic");
    if (!selectedTopics.includes(topic)) {
      const updatedTopics = [...selectedTopics, topic];
      setSelectedTopics(updatedTopics);
      handleFilter();
    }
  };

  const handleReadingLengthClick = (length: string) => {
    clearFilters("readingLength");
    if (!selectedLength.includes(length)) {
      const updatedLength = [length];
      setSelectedLength(updatedLength);
      handleFilter();
    }
  };

  function getBlogPostsByYearMonthDayAndCount(data: BlogPost[]): {
    [year: number]: {
      [month: number]: {
        count: number;
        groupedByDay: BlogPost[][];
      };
    };
  } {
    // Group blogs by year and month, and count the number of blogs
    const groupedData = data.reduce((acc, blog) => {
      const { year, month, day } = blog.date;

      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = { count: 0, groupedByDay: [] };
      }

      acc[year][month].count += 1;

      // Group by day
      let dayGroup = acc[year][month].groupedByDay.find(
        (group) => group[0].date.day === day
      );
      if (!dayGroup) {
        dayGroup = [];
        acc[year][month].groupedByDay.push(dayGroup);
      }
      dayGroup.push(blog);

      return acc;
    }, {} as { [year: number]: { [month: number]: { count: number; groupedByDay: BlogPost[][] } } });

    return groupedData;
  }

  const sortedData = Object.entries(
    getBlogPostsByYearMonthDayAndCount(blogs)
  ).map(([year, yearData]) => {
    return {
      year: parseInt(year), // Convert the year to number
      months: Object.entries(yearData)
        .map(([month, monthData]) => ({
          month: parseInt(month), // Convert the month to number
          count: monthData.count,
          blogsForMonth: monthData.groupedByDay, // You can use this to get the blog data for the month
        }))
        .sort((a, b) => a.month - b.month), // Sort months by month number
    };
  });

  return (
    <main className="w-10/12 md:w-11/12 mx-auto py-6">
      <DynamicBreadcrumb />
      <h1>Phoenix Code Studio Blogs</h1>
      <p className="mt-4">
        Stay ahead in the ever-evolving world of web development, UX design, and
        digital strategy with expert insights, cutting-edge trends, and
        actionable best practices. Whether you’re looking to optimize
        performance, boost conversions, or leverage emerging technologies, our
        content provides practical solutions to enhance your online presence,
        user engagement, and business growth.
      </p>
      <p>
        Explore a wealth of industry updates, innovative strategies, and expert
        tips designed to keep you competitive, informed, and inspired. From
        conversion-driven design to SEO optimization and user experience
        enhancements, our blogs equip you with the knowledge to build for the
        future. Stay informed, stay inspired, and stay ahead with Phoenix Code
        Studio.
      </p>

      {/* Filter Options */}
      <section className="mb-8">
        <section className="flex flex-col lg:flex-row justify-center sm:items-end sm:space-y-4 md:gap-4">
          <div className="w-full gap-3 grid grid-cols-1 pb-5 items-start">
            {/* Topic Filter */}
            <div className="flex flex-wrap items-center">
              <Collapsible
                open={openCollapsible === "topic"}
                onOpenChange={() => handleCollapsibleChange("topic")}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between space-x-4">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center w-full">
                      <ChevronsUpDown className="h-4 w-4" />{" "}
                      <label htmlFor="topic" className="ml-2 text-lg w-full">
                        <p>Filter by Topic:</p>
                      </label>
                      <span className="sr-only">Toggle</span>
                    </div>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2 ml-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-start items-start w-full">
                    {topics.sort().map((topic) => (
                      <div key={topic} className="flex items-center mr-1">
                        <BpCheckbox
                          id={topic}
                          checked={selectedTopics.includes(topic)}
                          onChange={(e) =>
                            handleTopicCheckboxChange(topic, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={topic}
                          className="ml-2"
                          onClick={() => handleOpen("topic")}
                        >
                          <p>
                            {topic}
                            <span className="ml-1 text-accent-4">
                              ({topicCounts[topic]})
                            </span>
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Date Filter */}
            <div className="flex flex-wrap items-center">
              <Collapsible
                open={openCollapsible === "date"}
                onOpenChange={() => handleCollapsibleChange("date")}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between space-x-4">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center w-full">
                      <ChevronsUpDown className="h-4 w-4" />
                      <label htmlFor="topic" className="ml-2 text-lg w-full">
                        <p>Filter by Date:</p>
                      </label>
                      <span className="sr-only">Toggle</span>
                    </div>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="space-y-2 ml-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {sortedData.map((yearData, yearIndex) => {
                    const { year, months } = yearData;

                    return (
                      <Collapsible
                        key={yearIndex}
                        open={openYear === year}
                        onOpenChange={() =>
                          handleCollapsibleChange("year", year)
                        }
                        className="w-full space-y-2"
                      >
                        <div className="flex items-center justify-between space-x-4">
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center w-full">
                              <ChevronsUpDown className="h-4 w-4" />
                              <label
                                htmlFor="topic"
                                className="ml-2 text-lg w-full"
                              >
                                <p>{year}</p>
                              </label>
                              <span className="sr-only">Toggle</span>
                            </div>
                          </CollapsibleTrigger>
                        </div>

                        <CollapsibleContent className="space-y-2 ml-5">
                          {/* "Select All Days in Year" Checkbox */}
                          <div className="flex items-center">
                            <BpCheckbox
                              id={`ALL-${year}`}
                              checked={selectedYears.includes(`${year}`)}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  "year",
                                  { year },
                                  e.target.checked
                                )
                              }
                            />
                            <label htmlFor={`ALL-${year}`} className="ml-2">
                              <p>Select Entire Year</p>
                            </label>
                          </div>

                          {/* Iterate over each month */}
                          {months.map((monthData, monthIndex) => {
                            const monthNames = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];

                            const sortedDays = monthData.blogsForMonth.sort(
                              (a, b) => a[0]?.date.day - b[0]?.date.day
                            );

                            return (
                              <Collapsible
                                key={monthIndex}
                                open={openMonth === monthData.month}
                                onOpenChange={() =>
                                  handleCollapsibleChange(
                                    "month",
                                    monthData.month
                                  )
                                }
                                className="w-full space-y-2"
                              >
                                <div className="flex items-center justify-between space-x-4">
                                  <CollapsibleTrigger asChild>
                                    <div className="flex items-center w-full">
                                      <ChevronsUpDown className="h-4 w-4" />
                                      <label
                                        htmlFor="topic"
                                        className="ml-2 text-lg w-full"
                                      >
                                        <p>
                                          {monthNames[monthData.month - 1]}
                                          <span className="ml-1 text-accent-4">
                                            ({monthData.count})
                                          </span>
                                        </p>
                                      </label>
                                      <span className="sr-only">Toggle</span>
                                    </div>
                                  </CollapsibleTrigger>
                                </div>

                                <CollapsibleContent className="space-y-2 ml-5">
                                  {/* "Select All Days in Month" Checkbox */}
                                  <div className="flex items-center">
                                    <BpCheckbox
                                      id={`ALL-${year}-${monthData.month}`}
                                      checked={selectedMonths.includes(
                                        `${year}-${monthData.month}`
                                      )}
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          "month",
                                          { year, month: monthData.month },
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={`ALL-${year}-${monthData.month}`}
                                      className="ml-2"
                                    >
                                      <p>Select Entire Month</p>
                                    </label>
                                  </div>

                                  {/* Iterate over days within each month */}
                                  <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-1">
                                    {sortedDays.map((dayData, dayIndex) => {
                                      const day = dayData[0]?.date.day;
                                      const suffix = getDaySuffix(day);

                                      return (
                                        <div
                                          key={dayIndex}
                                          className="flex items-center mr-1"
                                        >
                                          <BpCheckbox
                                            id={`${year}-${monthData.month}`}
                                            checked={selectedDays.includes(
                                              `${year}-${monthData.month}-${day}`
                                            )}
                                            onChange={(e) =>
                                              handleDayCheckboxChange(
                                                day,
                                                monthData.month,
                                                year,
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <label
                                            htmlFor={`${year}-${monthData.month}`}
                                            className="ml-2"
                                          >
                                            <p>
                                              {day}
                                              <span>{suffix}</span>
                                              <span className="ml-1 text-accent-4">
                                                ({sortedDays[dayIndex].length})
                                              </span>
                                            </p>
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            );
                          })}
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Author Filter */}
            {/* <div className="flex flex-wrap items-center">
              <Collapsible
                open={openCollapsible === "author"}
                onOpenChange={() => handleCollapsibleChange("author")}
                className="w-full space-y-2"
              >
                <div className="flex items-center justify-between space-x-4">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center w-full">
                      <ChevronsUpDown className="h-4 w-4" />
                      <label htmlFor="author" className="ml-2 text-lg w-full">
                        <p>Filter by Author:</p>
                      </label>
                      <span className="sr-only">Toggle</span>
                    </div>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2 ml-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 justify-start items-start w-full">
                    {authors.sort().map((author) => (
                      <div key={author} className="flex items-center mr-1">
                        <BpCheckbox
                          id={author}
                          className={theme === "dark" ? "text-foreground" : ""}
                          checked={selectedAuthors.includes(author)}
                          onChange={(e) =>
                            handleAuthorCheckboxChange(author, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={author}
                          className={`ml-2 flex items-center ${
                            selectedDates.includes(author)
                              ? "font-bold text-accent-2"
                              : ""
                          }`}
                          onClick={() => handleOpen("date")}
                        >
                          <p>
                            {" "}
                            {author}{" "}
                            <span className="ml-1 text-accent-4">
                              ({authorCounts[author]})
                            </span>
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div> */}
          </div>
        </section>

        {/* Search Bar */}
        <section className="flex pb-5">
          <Input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-border rounded w-11/12 md:w-full mx-auto md:h-12 lg:h-14 md:text-md lg:text-xl placeholder:text-accent-2"
          />
        </section>

        {/* Reading Length Times */}
        <section
          className={cn(
            "grid grid-cols-1 space-y-3 md:space-y-0 md:grid-cols-4 md:gap-2 lg:gap-4",
            isSmallDevice && "w-11/12 mx-auto"
          )}
        >
          {readingLength
            .sort((a, b) => {
              if (a.length === b.length) {
                return b.localeCompare(a);
              }
              return a.length - b.length;
            })
            .map((length, index) => (
              <Button
                variant={theme === "dark" ? "accent" : "outline"}
                size={isMediumDevice ? "sm" : "default"}
                className="capitalize"
                key={index}
                onClick={() => handleReadingLengthClick(length)}
              >
                {length} Articles{" "}
                <small className="font-normal">({lengthCount[length]})</small>
              </Button>
            ))}
        </section>

        <section className="w-11/12 md:w-full mx-auto flex flex-col md:flex-row gap-2 justify-center md:justify-between">
          {/* Articles per page DropdownMenu */}
          <section className="flex flex-col md:justify-end items-center mt-4">
            <label htmlFor="articlesPerPage" className="mr-2">
              <p>Articles per page:</p>
            </label>
            <DropdownMenu className="w-full">
              <DropdownMenuTrigger className="w-full">
                <div className="p-2 bg-muted text-sm md:text-md lg:text-lg rounded px-5">
                  {articlesPerPage} articles per page
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleArticlesPerPageChange(10)}
                  className="md:text-md lg:text-lg px-3"
                >
                  10 articles per page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleArticlesPerPageChange(15)}
                  className="md:text-md lg:text-lg px-3"
                >
                  15 articles per page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleArticlesPerPageChange(25)}
                  className="md:text-md lg:text-lg px-3"
                >
                  25 articles per page
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleArticlesPerPageChange(50)}
                  className="md:text-md lg:text-lg px-3"
                >
                  50 articles per page
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>

          {/* Clear Filters Button */}
          <Button
            variant={"destructive"}
            className="md:mt-16"
            onClick={() => clearFilters()}
            size={isSmallDevice ? "sm" : "default"}
          >
            Clear Filters
          </Button>
        </section>

        {filtersCleared && noResults && (
          <section className="h-12 p-1">
            {/* Confirmation Text for Filters Cleared */}
            {filtersCleared && (
              <div className="my-4 text-center">
                {filtersCleared && (
                  <p className="text-destructive font-extrabold m-0 p-0">
                    Filters have been cleared successfully!
                  </p>
                )}
              </div>
            )}

            {/* No results warning */}
            {noResults && (
              <div className="my-4 text-center">
                {noResults && (
                  <p className="text-destructive font-extrabold m-0 p-0">
                    No blogs match your selected filters. Filters have been
                    cleared.
                  </p>
                )}
              </div>
            )}
          </section>
        )}
      </section>

      {/* Pagination controls */}
      <Pagination className="gap-5 flex items-center">
        <PaginationPrevious
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          variant={currentPage === 1 ? "disabled" : "outline"}
          className={
            currentPage === 1 ? "cursor-not-allowed" : "cursor-default"
          }
        />
        {!isSmallDevice && (
          <section className="text-center">
            {indexOfLastArticle >= filteredBlogs.length && totalPages === 1 ? (
              filteredBlogs.length === blogs.length ? (
                <p>Showing all {filteredBlogs.length} blogs</p>
              ) : (
                <p>Showing all {filteredBlogs.length} filtered blogs</p>
              )
            ) : (
              <p>
                Showing {indexOfFirstArticle + 1} to{" "}
                {indexOfLastArticle > filteredBlogs.length
                  ? filteredBlogs.length
                  : indexOfLastArticle}{" "}
                of {filteredBlogs.length} blogs
              </p>
            )}
          </section>
        )}
        <PaginationNext
          onClick={() => {
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
          variant={currentPage === totalPages ? "disabled" : "outline"}
          className={
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-default"
          }
        />
      </Pagination>

      {/* Displaying filtered blog cards dynamically */}
      <section className="my-8">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 xl:grid-cols-3">
          {currentArticles.map((blog, index) => (
            <Card
              key={index}
              className="border-2 border-transparent dark:hover:border-border rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <Image
                  src={`/images/blog_card_images/${setSlug(blog.title)}.jpg`}
                  width={500}
                  height={300}
                  alt={blog.title}
                  className="w-full h-40 md:h-52 xl:h-64 rounded-t-md object-cover mx-auto mb-1 object-center"
                />
                <div className="px-4 pb-2 flex flex-col justify-between h-fit md:h-[24rem] lg:h-[32em] 2xl:h-[35em] relative">
                  <div>
                    {blog.wordCount && blog.time && (
                      <div className="flex justify-between mx-1 pt-5">
                        {blog.wordCount && (
                          <p className="mt-0 text-xs md:text-sm lg:text-md 2xl:text-lg">
                            <strong className="text-foreground">Words:</strong>{" "}
                            <span>{formatNumber(blog.wordCount)}</span>
                          </p>
                        )}
                        {blog.time && (
                          <p className="mt-0 text-xs md:text-sm lg:text-md 2xl:text-lg">
                            <strong className="text-foreground">
                              Reading Time:
                            </strong>{" "}
                            <span>{blog.time}</span>
                          </p>
                        )}
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      className="text-primary underline underline-offset-2 px-0 mb-2 font-SofiaSans tracking-wider font-bold hover:bg-transparent hover:text-primary hover:no-underline text-wrap text-left text-md md:text-2xl 2xl:text-3xl md:my-2 2xl:my-3"
                      onClick={() => {
                        router.push(`/info/blogs/${setSlug(blog.title)}`);
                      }}
                    >
                      {blog.title}
                    </Button>

                    <div>
                      <p className="mb-0 text-sm md:text-lg lg:text-lg">
                        <strong className="text-foreground">By:</strong>{" "}
                        {blog.author}
                      </p>
                      <p className="mt-0">
                        <span className="italic text-sm lg:text-lg">
                          {blog.date.month} / {blog.date.day} / {blog.date.year}
                        </span>
                      </p>
                    </div>
                    <p className="pb-4 md:text-[15px] lg:text-[18px] 2xl:text-[20px] leading-6">
                      {blog.excerpt}
                    </p>
                  </div>

                  {isSmallDevice ? null : isLargerScreen ? (
                    <div className="mt-4 flex flex-col bottom-2 absolute">
                      {blog.topics.length > 0 && (
                        <div className="mt-6">
                          {blog.topics.sort().map((topic, index) => (
                            <Badge
                              key={index}
                              variant={"secondary"}
                              className="mr-2 cursor-pointer xl:text-[15px] xl:leading-5"
                              onClick={() => handleTopicClick(topic)}
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-4 absolute bottom-4">
                      {blog.topics.length > 0 && (
                        <div className="mt-6 gap-2 flex flex-wrap">
                          {blog.topics.sort().map((topic, index) => (
                            <Badge
                              key={index}
                              variant={"secondary"}
                              className="mr-2 cursor-pointer md:text-sm md:leading-4 lg:text-[17px] lg:leading-5 2xl:text-[18px]"
                              onClick={() => handleTopicClick(topic)}
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pagination controls */}
      <Pagination className="gap-5 flex items-center">
        <PaginationPrevious
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          variant={currentPage === 1 ? "disabled" : "outline"}
          className={
            currentPage === 1 ? "cursor-not-allowed" : "cursor-default"
          }
        />
        {!isSmallDevice && (
          <section className="text-center">
            {indexOfLastArticle >= filteredBlogs.length && totalPages === 1 ? (
              filteredBlogs.length === blogs.length ? (
                <p>Showing all {filteredBlogs.length} blogs</p>
              ) : (
                <p>Showing all {filteredBlogs.length} filtered blogs</p>
              )
            ) : (
              <p>
                Showing {indexOfFirstArticle + 1} to{" "}
                {indexOfLastArticle > filteredBlogs.length
                  ? filteredBlogs.length
                  : indexOfLastArticle}{" "}
                of {filteredBlogs.length} blogs
              </p>
            )}
          </section>
        )}
        <PaginationNext
          onClick={() => {
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
          variant={currentPage === totalPages ? "disabled" : "outline"}
          className={
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-default"
          }
        />
      </Pagination>
    </main>
  );
};

export default BlogDisplayPage;
