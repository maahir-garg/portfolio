export type WorkItem = {
  company: string;
  href: string;
  location: string;
  title: string;
  dates: string;
  current?: boolean;
  featured?: boolean;
  description: string;
};

export type ProjectLink = {
  type: string;
  href: string;
  icon: "external" | "github" | "lock";
};

export type ProjectEvidence = {
  label: string;
  body: string;
};

export type Project = {
  title: string;
  slug: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  notes: string;
  evidence: ProjectEvidence[];
  technologies: string[];
  links: ProjectLink[];
  liveStats?: boolean;
};

export const NOW = {
  updated: "7 Sep 2026",
  heroStatus:
    "researching cheating-risk signals at AICET, teaching at NUS, and iterating on PGPals and Trader's Edge",
  sections: [
    {
      label: "Building",
      items: [
        {
          primary: "PGPals",
          secondary:
            "The Emerald Challenge platform, built around 100 challenges",
        },
        {
          primary: "Trader's Edge",
          secondary:
            "iterating on a working FYP MVP for strategy specification and backtesting",
        },
      ],
    },
    {
      label: "Watching",
      items: [
        { primary: "Formula 1",
          secondary: "following the 2026 season"
        },
      ],
    },
    {
      label: "Off-screen",
      items: [
        {
          primary: "Badminton",
        },
        {
          primary: "Chess",
          secondary: "playing blitz",
        },
        {
          primary: "Drums",
        },
        {
          primary: "Photography",
          secondary: "landscape, street, and urban photography",
        },
      ],
    },
  ],
} as const;

export const ABOUT_PARAGRAPHS = [
  "Hello. I'm Maahir. I study Computer Science and Quantitative Finance at NUS, and I currently work as an AI Engineer with AICET's Team Koditsu, developing model-based cheating-risk signals for coding assessments from character-level editor interactions.",
  "Before AICET, I was an AI Engineer at GIC, where I built an internal agentic CLI and sandboxed Chainlit assistant for an 11-person team. The system combined eight custom tools, multi-agent orchestration, skill routing, more than 50 automated audit tests, custom evaluations, step-level guardrails, and Arize tracing. A separate audit pipeline queried Snowflake and SharePoint, ran ETL, and produced audit-ready reports from plain-English prompts, automating two manual data sources and reducing evidence retrieval from hours to near-instant.",
  "I also teach CS3230 and CS3263 at NUS. My current CS3230 tutorial has 21 students, and earlier teaching earned a 4.8/5.0 rating against a 4.2 faculty average plus a place on the NUS Honour List of Student Tutors.",
  "Before that, I worked with Interactive 3D Lab in collaboration with Apple, co-developing a multimodal iPhone and Apple Vision Pro tracking framework for stroke-rehabilitation assessment. The work reached 89% cross-device accuracy, 30 fps, and sub-millisecond latency. I am a co-author on a paper in preparation and a co-inventor on a patent application in progress.",
  "Outside work, I carry a camera, play badminton and chess, and follow Formula 1. The thread that keeps recurring in my engineering work is measurement, constraint, and trade-off. If a model is 69% smaller, I want to know what the other 31% paid for it. If a pipeline runs in seconds, I want to know what it assumes.",
] as const;

export const DATA: {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: Record<string, readonly string[]>;
  honours: readonly string[];
  contact: {
    email: string;
    social: Record<string, { name: string; url: string; icon: string }>;
  };
  work: WorkItem[];
  education: Array<{
    school: string;
    href: string;
    degree: string;
    details: readonly string[];
    dates: string;
  }>;
  leadership: Array<{
    org: string;
    role: string;
    dates: string;
    description: string;
  }>;
  projects: Project[];
} = {
  name: "Maahir Garg",
  initials: "MG",
  location: "Singapore",
  locationLink: "https://www.google.com/maps/place/singapore",
  description:
    "AI Engineer at AICET's Team Koditsu, NUS Computer Science and Quantitative Finance student, and former GIC AI Engineer.",
  summary:
    "Maahir Garg studies Computer Science and Quantitative Finance at NUS and works as an AI Engineer with AICET's Team Koditsu, researching model-based cheating-risk signals for coding assessments. He previously built agentic systems, evaluations, tracing, guardrails, and audit pipelines at GIC, and also teaches Algorithms and Foundations of AI at NUS.",
  avatarUrl: "/me.jpg",
  skills: {
    Languages: ["Python", "Java", "C/C++", "JavaScript/TypeScript", "Swift", "R", "SQL", "Bash", "LaTeX"],
    "AI & ML": ["PyTorch", "Hugging Face", "scikit-learn", "PEFT", "BitFit", "LoRA", "quantisation", "pruning", "agentic LLMs", "tool-calling", "custom evaluations", "Arize tracing", "GraphRAG", "vector databases"],
    "Quantitative methods": ["probability", "statistics", "regression", "linear algebra", "multivariable calculus", "stochastic processes", "optimisation", "expected-value reasoning", "hypothesis testing"],
    "Backend & testing": ["FastAPI", "Pydantic", "pytest", "REST APIs", "Chainlit"],
    "Data & distributed systems": ["NumPy", "pandas", "Spark", "Kafka", "Airflow", "ETL", "Snowflake", "Databricks"],
    "Web & databases": ["Next.js", "React", "HTML/CSS", "Supabase", "PostgreSQL", "MySQL"],
    "Cloud & DevOps": ["AWS EC2, S3, and Lambda", "Docker", "Git"],
    "Apple & spatial computing": ["SwiftUI", "RealityKit", "visionOS", "ARKit", "iOS", "Xcode"],
    "Analysis & design": ["Matplotlib", "MATLAB", "Looker Studio", "Excel", "Figma", "Adobe creative tools"],
  },
  honours: [
    "JEE top 0.5% of 1.2 million candidates",
    "Class 12 National Topper in Mathematics and 3rd overall in State among DAV schools",
    "NUS Honour List of Student Tutors",
    "Artificial Intelligence Specialisation with Distinction",
  ],
  contact: {
    email: "maahirrgarg@gmail.com",
    social: {
      GitHub: { name: "GitHub", url: "https://github.com/maahir-garg", icon: "github" },
      LinkedIn: { name: "LinkedIn", url: "https://www.linkedin.com/in/maahir-garg", icon: "linkedin" },
      email: { name: "Send Email", url: "mailto:maahirrgarg@gmail.com", icon: "mail" },
    },
  },
  work: [
    {
      company: "AI Centre for Educational Technologies, Team Koditsu",
      href: "https://aicet.comp.nus.edu.sg/projects/",
      location: "Singapore",
      title: "AI Engineer",
      dates: "Aug 2026 – Present",
      current: true,
      featured: true,
      description:
        "Researching model-based cheating-risk signals for Koditsu's coding-assessment platform from character-level editor interactions and periodic code-state snapshots. Current work investigates sequence-model and LLM approaches that produce probabilistic signals for human review.",
    },
    {
      company: "NUS, School of Computing",
      href: "https://www.comp.nus.edu.sg",
      location: "Singapore",
      title: "Undergraduate Teaching Assistant",
      dates: "Aug 2024 – Dec 2025; Aug 2026 – Present",
      current: true,
      featured: true,
      description:
        "Currently teaching CS3230 and CS3263 and leading a 21-student CS3230 tutorial. Across four teaching semesters and five course appointments, taught algorithms, data structures, discrete mathematics, and foundations of AI; earned a 4.8/5.0 teaching rating against a 4.2 faculty average and a place on the NUS Honour List of Student Tutors.",
    },
    {
      company: "NUS",
      href: "https://www.comp.nus.edu.sg/orbital/",
      location: "Singapore",
      title: "Orbital Programme Advisor",
      dates: "May–Aug 2025; May–Aug 2026",
      description:
        "Advised student software-project teams across two separate summer appointments, covering architecture, implementation, code review, and release management. In the 2025 cohort, all 12 teams passed at or above their target grade.",
    },
    {
      company: "GIC",
      href: "https://www.gic.com.sg",
      location: "Singapore",
      title: "AI Engineer",
      dates: "Jan 2026 – Jul 2026",
      featured: true,
      description:
        "Built an internal agentic CLI and sandboxed Chainlit assistant for an 11-person team with eight custom tools, multi-agent orchestration, and skill routing. Automated more than 50 audit tests, added step-level guardrails through custom hooks, built separate custom evaluations, and added Arize tracing. A Snowflake and SharePoint pipeline automated two manual data sources and reduced evidence retrieval from hours to near-instant.",
    },
    {
      company: "Interactive 3D Lab, in collaboration with Apple",
      href: "https://www.i3d.design",
      location: "Singapore",
      title: "Swift Developer, Apple Vision Pro",
      dates: "May 2025 – Dec 2025",
      featured: true,
      description:
        "Co-developed a multimodal iPhone and Apple Vision Pro tracking framework for stroke-rehabilitation assessment at 89% cross-device accuracy, 30 fps, and sub-millisecond latency. Co-author on a paper in preparation and co-inventor on a patent application in progress.",
    },
    {
      company: "NUS, School of Computing",
      href: "https://www.comp.nus.edu.sg",
      location: "Singapore",
      title: "Research Assistant, Prof. Nan Chen",
      dates: "Aug 2024 – Apr 2025",
      description:
        "Built and optimised Stack Overflow data-collection pipelines and modelled how votes and answer acceptance relate to content quality for an empirical study.",
    },
    {
      company: "Accelerice, NUS Overseas Colleges",
      href: "https://accelerice.com",
      location: "Jakarta, Indonesia",
      title: "Data Engineer",
      dates: "May 2024 – Aug 2024",
      description:
        "Shipped Python and API-backed dashboards and databases that improved operations-team data accessibility by 40%; raised search rankings 30% and organic traffic 20% while cutting page-load time 25%.",
    },
    {
      company: "NUS Information Technology",
      href: "https://nusit.nus.edu.sg",
      location: "Singapore",
      title: "Cyber Security Analyst",
      dates: "Feb 2024 – Jul 2024",
      description:
        "Supported NUS IT's bug-bounty and security programme through project delivery, vendor negotiation, and security-awareness training for staff and peers.",
    },
    {
      company: "NUS, Economics",
      href: "https://nus.edu.sg",
      location: "Singapore",
      title: "Research Assistant, Prof. Julian Wright",
      dates: "Nov 2023 – Feb 2024",
      description:
        "Automated Google Scholar citation collection with Python, saving about 520 hours and helping an economics paper meet a tight publication deadline.",
    },
    {
      company: "NUS",
      href: "https://nus.edu.sg",
      location: "Singapore",
      title: "Research Assistant, Prof. Nils Martin Mattsson",
      dates: "Sep 2023 – Jan 2024",
      description:
        "Automated CAAQMS air-quality collection with Python, eliminating more than 10,000 hours of manual entry and supporting downstream analysis.",
    },
    {
      company: "Augmented Human Lab",
      href: "https://www.ahlab.org",
      location: "Singapore",
      title: "Research Study Assistant",
      dates: "Sep 2023 – Nov 2023",
      description:
        "Ran sessions for a 500+ participant AR/VR motion-sickness study conducted in collaboration with Meta, logging data with Python scripts and surveys and calibrating VR equipment.",
    },
  ],
  education: [
    {
      school: "National University of Singapore",
      href: "https://nus.edu.sg",
      degree: "Bachelor of Computing (Honours), Computer Science",
      dates: "Aug 2023 – May 2027 expected",
      details: [
        "Second Major in Quantitative Finance",
        "Minor in Data Engineering",
        "Specialisations in Artificial Intelligence with Distinction, Database Systems, and Computer Networks",
        "GPA 4.71/5.00",
        "Currently enrolled in CS3216 Software Product Engineering for Digital Markets and IT2900 Technical Management and Leadership",
      ],
    },
  ],
  leadership: [
    {
      org: "Spatial Hack AI 2026",
      role: "Mentor",
      dates: "7, 8, and 10 Aug 2026",
      description:
        "Mentor at a 126-participant event held at NUS and Apple Developer Center Singapore.",
    },
    {
      org: "PGPR, NUS",
      role: "Residential Assistant",
      dates: "May 2025 – Present",
      description:
        "Supporting 1,000+ residents through pastoral care, events, and first-contact conflict resolution and crisis management.",
    },
    {
      org: "NUS Mathematics Society",
      role: "Associate Logistics Director",
      dates: "Aug 2024 – May 2025",
      description: "Managed event logistics, vendor relations, and procurement within budget.",
    },
    {
      org: "Project CUP, NUS",
      role: "Mathematics Mentor",
      dates: "Aug 2023 – Dec 2024",
      description: "Taught mathematics using visual and interactive tools.",
    },
  ],
  projects: [
    {
      title: "PGPals",
      slug: "pgpals",
      href: "https://github.com/maahir-garg/pgpals",
      dates: "Jul 2026 – Sep 2026",
      active: false,
      description:
        "Built and operated PGPals, a full-stack event platform supporting 164 authenticated users across 96 teams during a two-week residential challenge; processed 2,297 submissions and 3,763 photo/video attachments across 103 challenges.",
      notes:
        "Developed collaboration, moderation, and scoring workflows that enabled 78 multi-team pairings, 2,196 approved submissions, 2,289 credited team–challenge completions, and 46,540 PGP Coins awarded.",
      evidence: [
        { label: "Scale", body: "Supported 164 authenticated users across 96 teams, processing 2,297 submissions and 3,763 photo/video attachments across 103 challenges." },
        { label: "Collaboration", body: "Enabled 78 multi-team pairings, 2,196 approved submissions, 2,289 credited team–challenge completions, and 46,540 PGP Coins awarded." },
        { label: "Moderation", body: "Enabled 10 administrators to review the complete submission workload with a 3.2-hour median turnaround and zero submissions left pending at event close." },
        { label: "Architecture", body: "Next.js App Router and TypeScript over Supabase PostgreSQL, Auth, Storage, row-level security, and RPC, deployed in Vercel's Singapore region." },
      ],
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      links: [{ type: "Source code", href: "https://github.com/maahir-garg/pgpals", icon: "github" }],
    },
    {
      title: "Trader's Edge",
      slug: "traders-edge",
      href: "https://traders-edge-eta.vercel.app",
      dates: "May 2026 – Present",
      active: true,
      description:
        "A team final-year project advised by Anand Bhojan, with a working MVP that helps students specify and backtest trading strategies in an interactive learning environment.",
      notes:
        "Trader's Edge turns plain-English strategy ideas into historical-data backtests and places the results in a learning environment for students. The project is a team FYP, and its public source is the NUS-FinTechAI organisation repository.",
      evidence: [
        { label: "Product", body: "Working MVP for students to specify strategies in plain English and test them against historical data." },
        { label: "Collaboration", body: "Team final-year project advised by Anand Bhojan, with source published through the NUS-FinTechAI organisation." },
        { label: "Access", body: "The public demo requires Google sign-in." },
      ],
      technologies: ["AI", "LLMs", "Backtesting", "Quantitative Finance", "Python"],
      links: [
        { type: "Demo, Google sign-in required", href: "https://traders-edge-eta.vercel.app", icon: "external" },
        { type: "Source, team repository", href: "https://github.com/NUS-FinTechAI/traders_edge", icon: "github" },
      ],
    },
    {
      title: "Prediction-Market Arbitrage and Research Engine",
      slug: "prediction-market-arbitrage",
      href: "https://pm-intelligence-7vob.onrender.com",
      dates: "Feb 2026 – Jul 2026",
      active: false,
      description:
        "A student-led, read-only FastAPI research engine over live Polymarket and Kalshi feeds, surfacing human-confirmed cross-venue mispricings after fees, liquidity, and hedge-equal depth fills.",
      notes:
        "The engine separates pure, unit-testable quantitative functions from read-only venue adapters and in-memory orchestration. It uses public market data for research without trading authentication, order placement, or custody of funds.",
      evidence: [
        { label: "Architecture", body: "Pure compute functions, read-only venue adapters, in-memory orchestration, FastAPI and Pydantic, plus a dependency-free inspection dashboard." },
        { label: "Matching", body: "Requires a human-confirmed pairing before an opportunity is actionable, adds predicate-conflict checks, and excludes expired or implausible-gross rows." },
        { label: "Economics", body: "Models taker fees, available liquidity, and equal-contract depth fills to preserve hedged economics." },
        { label: "Validation", body: "36+ tests and live-endpoint plausibility checks cover matching, calibration, fees, malformed settings, duplicates, and API failure modes." },
        { label: "Operating model", body: "Research-only and read-only, with no order placement, custody of funds, or realised P&L." },
      ],
      technologies: ["Python", "FastAPI", "Pydantic", "pytest", "REST APIs"],
      links: [{ type: "Demo", href: "https://pm-intelligence-7vob.onrender.com", icon: "external" }],
    },
    {
      title: "Optimising BERT for Question Answering",
      slug: "bert-qa-quant-prune",
      href: "",
      dates: "Nov 2025",
      active: false,
      description:
        "Reduced a BERT question-answering model by 69%, from 440 MB to 128 MB, with no more than 0.5% F1 loss, and reached 54.7% sparsity through custom mask-enforced pruning.",
      notes:
        "I evaluated post-training quantisation and mask-enforced pruning as separate interventions, then profiled compression settings against F1 to map the efficiency-versus-generalisation trade-off.",
      evidence: [
        { label: "Quantisation", body: "Post-training quantisation reduced model size from 440 MB to 128 MB, a 69% reduction, with no more than 0.5% F1 loss." },
        { label: "Pruning", body: "A custom mask-enforced pruning path reached 54.7% sparsity." },
        { label: "Validation", body: "Profiled compression settings against the measured efficiency-versus-generalisation trade-off." },
      ],
      technologies: ["BERT", "PyTorch", "Quantisation", "Pruning", "NLP"],
      links: [{ type: "Private source", href: "", icon: "lock" }],
    },
    {
      title: "Domain-Specific LLM Reasoning with PEFT",
      slug: "llm-reasoning-peft-bitfit",
      href: "",
      dates: "Oct 2025",
      active: false,
      description:
        "Used BitFit to update no more than 0.1% of model parameters, limited to bias terms, and improved reasoning accuracy from 47% to 73% on clause-extracted health-insurance scenarios.",
      notes:
        "BitFit limited training to bias terms, testing how far a very small parameter update could move reasoning accuracy on clause-extracted health-insurance scenarios.",
      evidence: [
        { label: "Method", body: "BitFit updated bias terms only, keeping the trained share at no more than 0.1% of parameters." },
        { label: "Evaluation", body: "Reasoning accuracy increased from 47% to 73% on clause-extracted health-insurance scenarios." },
        { label: "Scope", body: "Evaluation used clause-extracted health-insurance scenarios." },
      ],
      technologies: ["LLM", "PEFT", "BitFit", "PyTorch", "AI"],
      links: [{ type: "Private source", href: "", icon: "lock" }],
    },
    {
      title: "Multimodal Hand Tracking for Stroke Rehabilitation",
      slug: "3d-iphone",
      href: "",
      dates: "May 2025 – Dec 2025",
      active: false,
      description:
        "A multimodal iPhone and Apple Vision Pro tracking framework for stroke-rehabilitation assessment, co-developed at Interactive 3D Lab in collaboration with Apple.",
      notes:
        "The work unified iPhone and Apple Vision Pro into one tracking surface and is associated with a paper in preparation and a patent application in progress. The implementation link remains private while the research disclosure process continues.",
      evidence: [
        { label: "Contribution", body: "Built the visionOS spatial UI, real-time hand and gaze tracking, and an iPhone companion app." },
        { label: "Validation", body: "Reached 89% cross-device accuracy, 30 fps, and sub-millisecond latency; evaluated across three sessions with three patients per session." },
        { label: "Research status", body: "Co-author on a paper in preparation and co-inventor on a patent application in progress." },
      ],
      technologies: ["Swift", "RealityKit", "visionOS", "ARKit", "iOS"],
      links: [{ type: "Research source private", href: "", icon: "lock" }],
    },
    {
      title: "LeetCoding",
      slug: "leetcoding",
      href: "https://leetcode.com/u/maahir_garg/",
      dates: "Ongoing",
      active: true,
      liveStats: true,
      description:
        "An ongoing personal practice page for algorithms and data structures, backed by live LeetCode statistics.",
      notes:
        "This page turns ongoing algorithms and data-structures practice into a live view of progress, with statistics fetched from my public LeetCode profile.",
      evidence: [
        { label: "Purpose", body: "Tracks ongoing practice across algorithms and data-structure patterns." },
        { label: "Status", body: "Live statistics are fetched from the public LeetCode profile." },
      ],
      technologies: ["Algorithms", "Data Structures", "Problem Solving", "Python"],
      links: [{ type: "LeetCode profile", href: "https://leetcode.com/u/maahir_garg/", icon: "external" }],
    },
    {
      title: "StackExchange Research Pipeline",
      slug: "stackexchange-scraping",
      href: "https://github.com/maahir-garg/StackExchange-Scraping",
      dates: "Sep 2024",
      active: false,
      description:
        "A public data pipeline that downloads StackExchange archives, parses posts, users, votes, comments, and badges, and exports structured datasets for research analysis.",
      notes:
        "Built for an empirical study of content-quality feedback mechanisms, the pipeline turns StackExchange archives into structured tables for analysing how votes and answer acceptance relate to content quality.",
      evidence: [
        { label: "Architecture", body: "Python and pandas pipeline over XML archives extracted from .7z files, with malformed-line recovery and file-existence checks." },
        { label: "Output", body: "Aggregates posts, users, votes, comments, and badges into structured CSV files." },
      ],
      technologies: ["Python", "pandas", "XML", "py7zr", "Data Engineering"],
      links: [{ type: "Source", href: "https://github.com/maahir-garg/StackExchange-Scraping", icon: "github" }],
    },
    {
      title: "Google Scholar Research Automation",
      slug: "google-scholar-scraping",
      href: "",
      dates: "Nov 2023 – Feb 2024",
      active: false,
      description:
        "Python automation for collecting Google Scholar citation data for an NUS economics research workflow, replacing manual collection and saving about 520 hours.",
      notes:
        "The workflow searches by paper and author metadata, extracts profiles and publication records, calculates citation windows, and exports research-ready spreadsheets.",
      evidence: [
        { label: "Use", body: "Collected author, publication, and citation data and exported research-ready spreadsheets." },
        { label: "Impact", body: "Replaced manual collection and saved about 520 hours against a tight publication deadline." },
      ],
      technologies: ["Python", "BeautifulSoup", "pandas", "Automation"],
      links: [{ type: "Source withheld", href: "", icon: "lock" }],
    },
    {
      title: "CAAQMS Air-Quality Scraper",
      slug: "caaqms-web-scraping",
      href: "",
      dates: "Sep 2023 – Jan 2024",
      active: false,
      description:
        "Python automation for collecting CAAQMS air-quality data, eliminating more than 10,000 hours of manual entry and supporting downstream analysis.",
      notes:
        "The collection workflow builds encoded CAAQMS requests, retrieves 24 pollutant and environmental fields for configured stations, tracks station-level completion, and exports the results to Excel.",
      evidence: [
        { label: "Collection", body: "Retrieved configured station data across 24 pollutant and environmental fields." },
        { label: "Impact", body: "Eliminated more than 10,000 hours of manual entry for the research workflow." },
      ],
      technologies: ["Python", "pandas", "HTTP APIs", "Data Engineering"],
      links: [{ type: "Source withheld", href: "", icon: "lock" }],
    },
    {
      title: "Llama-2 Fine-Tuning",
      slug: "llama2-finetuning",
      href: "https://github.com/maahir-garg/llama2-finetuning",
      dates: "Feb–Mar 2024",
      active: false,
      description:
        "Fine-tuned Llama-2-7b-chat on the Platypus dataset with LoRA and PEFT, improving target-task accuracy from 73% to 87%.",
      notes:
        "The public notebook packages the supervised fine-tuning and evaluation workflow, from parameter-efficient training through target-task assessment.",
      evidence: [
        { label: "Method", body: "LoRA and PEFT supervised fine-tuning on the Platypus dataset." },
        { label: "Result", body: "Target-task accuracy improved from 73% to 87%." },
        { label: "Notebook", body: "Public supervised fine-tuning and evaluation workflow." },
      ],
      technologies: ["Python", "Llama-2", "LoRA", "PEFT", "Jupyter"],
      links: [{ type: "Source", href: "https://github.com/maahir-garg/llama2-finetuning", icon: "github" }],
    },
    {
      title: "Portfolio Website",
      slug: "portfolio",
      href: "https://github.com/maahir-garg/portfolio",
      dates: "Apr 2026",
      active: true,
      description:
        "This editorial field-notebook portfolio, built with Next.js, React, TypeScript, and Tailwind CSS, with independently tuned light and dark themes and accessible navigation.",
      notes:
        "The design uses a warm paper canvas, a restrained red accent, and typography-led hierarchy. Motion respects reduced-motion preferences, the site includes a skip link, and the photography lightbox supports keyboard navigation.",
      evidence: [
        { label: "Architecture", body: "Next.js App Router, React, TypeScript, and Tailwind CSS." },
        { label: "Accessibility", body: "Skip navigation, labelled controls, keyboard-operable lightbox, and reduced-motion support." },
        { label: "Presentation", body: "Light and dark themes are tuned independently within the same editorial system." },
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      links: [{ type: "Source", href: "https://github.com/maahir-garg/portfolio", icon: "github" }],
    },
  ],
};
