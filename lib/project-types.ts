export type Project = {
  id: string;
  slug: string;
  name: string;
  code: string;
  summary: string;
  description: string;
  technologies: string[];
  screenshot_url: string;
  links: {
    live: string;
  };
};

export type ProjectsData = {
  projects: Project[];
};
