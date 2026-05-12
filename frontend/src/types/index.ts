export type Service = {
  slug: string;
  title: string;
  headline: string;
  shortDescription: string;
  description: string;
  whoItsFor: string;
  outcomes: string[];
  icon: React.ComponentType<{ className?: string }>;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
};