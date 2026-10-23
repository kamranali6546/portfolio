export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phones: string[];
  whatsapp: string;
  linkedin: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    years: string;
  };
  cvUrl: string;
  availability: {
    status: string;
    timezones: string;
  };
}

export const profile: Profile = {
  name: "Kamran Ali",
  title: "Senior Frontend Developer",
  location: "Pakistan / Georgia (open to relocation)",
  email: "kamranali6546@gmail.com",
  phones: ["+92 346 8051600", "+995 568 772 744"],
  whatsapp: "https://wa.me/995568772744",
  linkedin: "https://www.linkedin.com/in/kamranali6546",
  summary:
    "Senior Frontend Developer with over 6 years of experience architecting high-performance web applications and scalable enterprise design systems using React.js, Next.js, and TypeScript. Focused on pioneering the integration of AI-assisted engineering workflows and next-generation AI-driven interfaces. Aiming for a high-impact Senior/Lead role that combines frontend architecture with AI innovation to build intelligent, high-conversion digital products.",
  education: {
    degree: "Bachelor of Computer Science",
    institution: "Lahore Garrison University",
    location: "Pakistan",
    years: "2015 to 2019",
  },
  cvUrl: "/Kamran_Ali_CV.pdf",
  availability: {
    status: "Open to relocation & remote roles",
    timezones: "PKT (UTC+5) / GET (UTC+4)",
  },
};
