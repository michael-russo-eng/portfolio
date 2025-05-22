export interface ProjectLink {
  label: string;
  url: string;
  icon?: React.ReactNode;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  impact: string[];
  category: string;
  details?: React.ReactNode;
  links?: {
    label: string;
    url: string;
    icon?: React.ReactNode;
  }[];
  color:string;
} 