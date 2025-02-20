import { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";

export type LengthType = number | string;

export type ServiceTypeKeys =
  | "comprehensiveWebsiteSolutions"
  | "seoOptimizedContentCreationServices"
  | "corporateDigitalSolutions"
  | "digitalAndWebDevelopmentContracts"
  | "contentAndMarketingContracts"
  | "paymentAndSalesContracts"
  | "generalClientAgreements";

export interface FormDataType {
  name: string;
  email: string;
  subject: string;
  message: string;
  paymentPlan: string;
  comprehensiveWebsiteSolutions: string[];
  seoOptimizedContentCreationServices: string[];
  corporateDigitalSolutions: string[];
  digitalAndWebDevelopmentContracts: string[];
  contentAndMarketingContracts: string[];
  paymentAndSalesContracts: string[];
  generalClientAgreements: string[];
}

export interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export interface LengthObject {
  value: number;
  unit: string;
}

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Menu {
  title: string;
  href: string;
  description: string;
}

export interface PricingTier {
  name: string;
  startingPrice: number;
  info: string;
}

export interface Category {
  name: string;
  type: ServiceTypeKeys;
  title: string;
  short: string;
  info: Information;
}

export interface Information {
  description: string[];
  detail: string;
  short: string;
  intro: string;
  sub: string[];
}

export interface SubItem {
  category: string;
  name: string;
  info: SubInformation;
  details: SubDetail[];
  cta: CTA;
}

export interface SubInformation {
  name: string;
  title: string;
  menuCaption?: string;
  description: string;
  startingPrice?: number;
  info: string;
  details: string;
  short: string;
  featured?: boolean;
  Icon?: string;
  pricingTierIntro?: {
    title: string;
    text: string;
  };
  pricingTiers?: PricingTier[];
}

export interface SubDetail {
  title: string;
  description?: string;
  intro?: string[];
  lists?: {
    title?: string;
    description: string;
    info?: ListDetail[];
  }[];
}

export interface ListDetail {
  title?: string;
  description?: string;
  list?: ListDetail[];
}

export interface CTA {
  title: string;
  intro?: string;
  text?: string;
  button: string;
  afterButtonText?: string;
}

export interface PaymentDetails {
  name: string;
  title: string;
  short: string;

  info: {
    intro: string[];
    description: string;
    short: string;
    features: string[];
    shortFeatures: ListDetail[];
  };

  explanation: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  details: ListDetail[];
}

export interface PaymentPlan {
  title: string;
  description: string;
  details: string[];
  route: string;
}

export interface Testimonial {
  name: string;
  featured: boolean;
  position?: string;
  rating?: number;
  quote: string;
}

export interface BlogPost {
  title: string;
  author: string;
  date: DateObject;
  wordCount: number;
  timeSpan: string;
  time: string;
  excerpt: string;
  featured?: boolean;
  icons: string[];
  topics: string[];
  intro: string[];
  list?: ListDetail[];
  conclusions: string[];
}

export interface DateObject {
  month: number;
  day: number;
  year: number;
}

export interface Project {
  title: string;
  name: string;
  featured: boolean;
  description: string;
  short: string;
  tags: string[];
  languages: string[];
  frameworks?: string[];
  libraries?: string[];
  technologies?: string[];
  githubLink?: string;
  liveLink?: string;
}

export interface JobPosition {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  information: string;
}

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
}
