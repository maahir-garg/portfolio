export const DATA = {
  name: "Maahir Garg",
  initials: "MG",
  location: "Singapore",
  locationLink: "https://www.google.com/maps/place/singapore",
  description:
    "AI engineer and Computer Science student at NUS. I like working on systems that have real users and real constraints.",
  summary:
    "I study Computer Science and Quantitative Finance at NUS and work as an AI Engineer at GIC. Most of my time goes into fine‑tuning language models, building data pipelines, and prototyping spatial computing experiences for Apple Vision Pro. Before that I did a mix of research, teaching, and hands‑on engineering work.",
  avatarUrl: "/me.png",
  skills: {
    Programming: ["Python", "Java", "JavaScript", "C/C++", "Swift", "R", "LaTeX"],
    "ML & AI": ["PyTorch", "TensorFlow", "Hugging Face", "LLM Fine-tuning", "RAG Pipelines", "Agentic Workflows"],
    "Data & Distributed": ["Kafka", "Spark", "Airflow", "ETL Pipelines"],
    "Cloud & DevOps": ["AWS (EC2, S3, Lambda)", "Docker", "Git", "Bash"],
    "Web & DB": ["React", "HTML/CSS", "PHP", "SQL (MySQL, PostgreSQL, Snowflake)"],
    Analysis: ["Pandas", "NumPy", "Matplotlib", "MATLAB", "Looker Studio"],
    Tools: ["RealityKit", "Figma", "Adobe Suite"],
  },
  contact: {
    email: "maahirrgarg@gmail.com",
    tel: "+65 86219217",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/maahir-garg",
        icon: "github",
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/maahir-garg",
        icon: "linkedin",
      },
      email: {
        name: "Send Email",
        url: "mailto:maahirrgarg@gmail.com",
        icon: "mail",
      },
    },
  },
  work: [
    {
      company: "GIC",
      href: "https://www.gic.com.sg",
      badges: [],
      location: "Singapore",
      title: "AI Engineer",
      logoUrl: "/gic.png",
      start: "Jan 2026",
      end: "Present",
      description:
        "Working on advanced AI initiatives.",
    },
    {
      company: "Interactive 3D Labs",
      href: "",
      badges: [],
      location: "Singapore",
      title: "Swift Developer",
      logoUrl: "/i3d.png",
      start: "Mar 2025",
      end: "Dec 2025",
      description:
        "Designed and developed immersive 3D applications for Apple Vision Pro using Swift, Unity, and RealityKit. Collaborated with researchers to prototype AR/VR applications focused on accessibility and interaction fidelity.",
    },
    {
      company: "NUS Computing",
      href: "https://www.comp.nus.edu.sg",
      badges: [],
      location: "Singapore",
      title: "Undergraduate Teaching Assistant",
      logoUrl: "/nus.png",
      start: "Aug 2024",
      end: "Dec 2025",
      description:
        "Taught CS3230 (Algorithms), CS2040S (Data Structures), and CS1231S (Discrete Structures). Guided students on dynamic programming, graph algorithms, and complexity analysis.",
    },
    {
      company: "National University of Singapore",
      href: "https://nus.edu.sg",
      badges: [],
      location: "Singapore",
      title: "Orbital Programme Advisor",
      logoUrl: "/nus.png",
      start: "May 2025",
      end: "Aug 2025",
      description:
        "Mentored project teams, providing technical guidance on software architecture and project management. Assessed deliverables and coached students on best practices.",
    },
    {
      company: "National University of Singapore",
      href: "https://nus.edu.sg",
      badges: [],
      location: "Singapore",
      title: "Research Assistant",
      logoUrl: "/nus.png",
      start: "Aug 2024",
      end: "Apr 2025",
      description:
        "Developed and optimized data pipelines from Stack Overflow to analyze the impact of feedback mechanisms on content quality.",
    },
    {
      company: "Accelerice Indonesia",
      href: "https://accelerice.com",
      badges: [],
      location: "Jakarta, Indonesia",
      title: "Data Scientist",
      logoUrl: "/accelerice.png",
      start: "May 2024",
      end: "Aug 2024",
      description:
        "Developed scalable databases and dashboards, integrating APIs and web-scraped data. Spearheaded SEO strategies improving search rankings.",
    },
    {
      company: "NUS Information Technology",
      href: "https://nusit.nus.edu.sg",
      badges: [],
      location: "Singapore",
      title: "Cyber Security Analyst",
      logoUrl: "/nus.png",
      start: "Feb 2024",
      end: "Jul 2024",
      description:
        "Led IT security projects, negotiated vendors, and promoted digital security best practices.",
    },
    {
      company: "National University of Singapore",
      href: "https://nus.edu.sg",
      badges: [],
      location: "Singapore",
      title: "Student Assistant",
      logoUrl: "/nus.png",
      start: "Nov 2023",
      end: "Feb 2024",
      description:
        "Automated Google Scholar data scraping using Python and Postman, saving 520 hours and ensuring timely publication.",
    },
    {
      company: "National University of Singapore",
      href: "https://nus.edu.sg",
      badges: [],
      location: "Singapore",
      title: "Research Assistant (CAAQMS)",
      logoUrl: "/nus.png",
      start: "Sep 2023",
      end: "Jan 2024",
      description:
        "Developed a Python-based web scraper using SQLite and JWT for CAAQMS air pollution data, saving over 10,000 hours of manual entry.",
    },
    {
      company: "Augmented Human Lab",
      href: "https://www.ahlab.org",
      badges: [],
      location: "Singapore",
      title: "Research Study Assistant",
      logoUrl: "/ahlab.png",
      start: "Sep 2023",
      end: "Nov 2023",
      description:
        "Collaborated with Meta on a large AR/VR motion sickness study with 500+ participants.",
    },
  ],
  education: [
    {
      school: "National University of Singapore",
      href: "https://nus.edu.sg",
      degree: "Bachelor of Computing, Computer Science",
      logoUrl: "/nus.png",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "Optimizing BERT for Question Answering",
      slug: "bert-qa-quant-prune",
      href: "",
      dates: "Nov 2025",
      active: true,
      description:
        "Achieved a 69% reduction in model size (440MB to 128MB) with <0.5% F1 loss via post-training quantization. Implemented custom mask-enforced pruning to reach 54.7% sparsity and analyzed efficiency vs generalization trade-offs.",
      technologies: ["BERT", "Quantization", "Pruning", "NLP", "Python"],
      links: [
        {
          type: "Private Repo",
          href: "",
          icon: "lock",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Domain-Specific LLM Reasoning with PEFT",
      slug: "llm-reasoning-peft-bitfit",
      href: "",
      dates: "Oct 2025",
      active: true,
      description:
        "Built a PEFT pipeline (BitFit + few-shot) for health insurance claim reasoning, fine-tuning <0.1% of parameters (bias terms only). Improved reasoning accuracy from 47% to 73% on clause-extracted scenarios.",
      technologies: ["LLM", "PEFT", "BitFit", "Few-Shot Learning", "AI"],
      links: [
        {
          type: "Private Repo",
          href: "",
          icon: "lock",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "3D iPhone hand tracking",
      slug: "3d-iphone",
      href: "https://github.com/maahir-garg/3D-iPhone",
      dates: "Dec 2025",
      active: true,
      description:
        "Immersive 3D application for Apple Vision Pro using Swift and RealityKit. (Inferred from role)",
      technologies: [
        "Swift",
        "RealityKit",
        "VisionPro",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/maahir-garg/3D-iPhone",
          icon: "github",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "StackExchange Scraping",
      slug: "stackexchange-scraping",
      href: "https://github.com/maahir-garg/StackExchange-Scraping",
      dates: "Sep 2024",
      active: true,
      description:
        "Data pipelines to analyze Stack Overflow feedback mechanisms.",
      technologies: [
        "Python",
        "Data Engineering",
        "Web Scraping"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/maahir-garg/StackExchange-Scraping",
          icon: "github",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Google Scholar Scraping",
      slug: "google-scholar-scraping",
      href: "https://github.com/maahir-garg/Google-Scholar-scraping",
      dates: "Mar 2024",
      active: true,
      description:
        "Automated scraping tool for academic research analysis, saving 520+ hours.",
      technologies: [
        "Python",
        "Postman",
        "Automation"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/maahir-garg/Google-Scholar-scraping",
          icon: "github",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CAAQMS Web Scraping",
      slug: "caaqms-web-scraping",
      href: "https://github.com/maahir-garg/CAAQMS-web-scraping",
      dates: "Mar 2024",
      active: true,
      description:
        "Air quality data scraper using SQLite and JWT, saving 10,000+ hours.",
      technologies: [
        "Python",
        "SQLite",
        "JWT"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/maahir-garg/CAAQMS-web-scraping",
          icon: "github",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Llama2 Finetuning",
      slug: "llama2-finetuning",
      href: "https://github.com/maahir-garg/llama2-finetuning",
      dates: "Mar 2024",
      active: true,
      description:
        "Code to fine-tune Llama2 large language models.",
      technologies: [
        "Python",
        "LLM",
        "Jupyter"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/maahir-garg/llama2-finetuning",
          icon: "github",
        },
      ],
      image: "",
      video: "",
    },

  ],
} as const;
