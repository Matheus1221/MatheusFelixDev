export type Profile = {
  name: string;
  role: string;
  summary: string;
  professionalSince: number;
  education: {
    course: string;
    expectedCompletion: string;
  };
  technicalEducation?: {
    course: string;
    startYear: number;
  };
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  location?: string;
  availability?: string;
};

export type Experience = {
  company: string;
  role: string;
  startDate: string;
  // Dates use YYYY-MM. Omit endDate or use null for a current position.
  endDate?: string | null;
};

export type StackGroup = {
  category: string;
  technologies: readonly string[];
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  role: string;
  featured: boolean;
  technologies: readonly string[];
  highlights: readonly string[];
  proprietary?: boolean;
  confidentialityNotice?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: {
    context: readonly string[];
    problem: readonly string[];
    solution: readonly string[];
    participation: readonly string[];
    status?: string;
    metrics?: readonly { value: string; label: string }[];
    architecture?: string;
    performance?: {
      problem: string;
      investigation?: string;
      correction?: string;
      result?: string;
    };
  };
  images?: readonly ProjectImage[];
};

export type ProjectImage = {
  src: `/${string}`;
  alt: string;
  width: number;
  height: number;
  caption: string;
};
