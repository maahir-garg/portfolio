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
  updated: "28 Aug 2026",
  heroStatus:
    "researching cheating-risk signals at AICET, teaching at NUS, and building PGPals and Trader's Edge",
  sections: [
    {
      label: "Building",
      items: [
        {
          primary: "PGPals",
          secondary:
            "preparing 100 challenges and the review workflow for 200+ pre-launch sign-ups",
        },
        {
          primary: "Trader's Edge",
          secondary:
            "building the FYP MVP for AI-generated and backtested trading strategies",
        },
      ],
    },
    {
      label: "Watching",
      items: [
        { primary: "Formula 1",
          secondary: "Ferarri fans anyone?"
        },
        { primary: "Ted Lasso",
          secondary: "re-watching the first three seasons before the fourth",
         },
      ],
    },
    {
      label: "Off-screen",
      items: [
        {
          primary: "Badminton",
          secondary: "I'm not very good",
        },
        {
          primary: "Chess",
          secondary: "playing blitz cause I don't have time for anything else",
        },
        {
          primary: "Board games",
          secondary: "Dnup and No Thanks, among others",
        },
        {
          primary: "Photography",
          secondary: "carrying a camera and shooting film",
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
        "Researching model-based cheating-risk signals for Koditsu's coding-assessment platform from character-level editor interactions and periodic code-state snapshots. Investigating sequence-model and LLM approaches that produce probabilistic signals for human review; the work remains in research and model development.",
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
        "Advised student software-project teams across two separate summer appointments, covering architecture, implementation, code review, and release management. In the 2025 cohort, advised 12 teams and all 12 passed at or above their target grade; 2026 outcomes are not yet claimed.",
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
      href: "https://pgpals.vercel.app",
      dates: "Jul 2026 – Present",
      active: true,
      description:
        "Sole-built PGPals, a Next.js, TypeScript, and Supabase event platform prepared for 200+ pre-launch sign-ups and exactly 100 challenges, combining roster-based access, media submissions, RA review, PGP Coin scoring, announcements, and leaderboard controls.",
      notes:
        "PGPals supports The Emerald Challenge, scheduled for 31 Aug to 13 Sep 2026, with a finale on 17 Sep. As of 28 Aug, the event has not started, and the unit behind the 200+ sign-ups remains unconfirmed. The platform is ready for launch, but no participant, submission, reviewer-activity, or completion outcome is claimed yet.",
      evidence: [
        { label: "Ownership", body: "Sole-built by Maahir for the PGPals event workflow." },
        { label: "Architecture", body: "Next.js App Router and TypeScript over Supabase PostgreSQL, Auth, Storage, row-level security, and RPC, deployed in Vercel's Singapore region." },
        { label: "Operations", body: "Roster import and regrouping, roster-based access, photo and group-task submissions, approval, rejection and reversion, PGP Coin scoring, bonus awards, scheduled challenges, announcements, and leaderboard controls." },
        { label: "Pre-launch scale", body: "Prepared for 200+ pre-launch sign-ups, exactly 100 challenges split 50 per week, and 10 configured RA accounts. Configured accounts are not described as active reviewers." },
      ],
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
      links: [{ type: "Live site", href: "https://pgpals.vercel.app", icon: "external" }],
    },
    {
      title: "Trader's Edge",
      slug: "traders-edge",
      href: "https://traders-edge-eta.vercel.app",
      dates: "May 2026 – Present",
      active: true,
      description:
        "A team final-year project advised by Anand Bhojan, building a working MVP for students to specify and backtest trading strategies in an interactive learning environment.",
      notes:
        "The current MVP pairs plain-English strategy specification with historical-data backtesting. Survivorship bias, look-ahead leakage, regime dependence, and overfitting are learning topics; implementation of specific safeguards is not claimed until the team's scope is confirmed. Maahir's exact personal implementation boundary is also still being documented.",
      evidence: [
        { label: "Intended user", body: "Students learning how trading strategies behave against historical data." },
        { label: "Current status", body: "Working MVP with a public demo that requires Google sign-in." },
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
        "The engine separates pure, unit-testable quantitative functions from read-only venue adapters and in-memory orchestration. It never places orders, holds funds, uses trading authentication, or reports realised P&L. Thin overlap between venues can legitimately produce few matched opportunities, so a quiet screen is not automatically a matching failure.",
      evidence: [
        { label: "Architecture", body: "Pure compute functions, read-only venue adapters, in-memory orchestration, FastAPI and Pydantic, plus a dependency-free inspection dashboard." },
        { label: "Matching", body: "Requires a human-confirmed pairing before an opportunity is actionable, adds predicate-conflict checks, and excludes expired or implausible-gross rows." },
        { label: "Economics", body: "Models taker fees, available liquidity, and equal-contract depth fills to preserve hedged economics." },
        { label: "Validation", body: "36+ tests and live-endpoint plausibility checks cover matching, calibration, fees, malformed settings, duplicates, and API failure modes." },
        { label: "Boundary", body: "Research-only and read-only, with no order placement, funds, or realised P&L. The demo may take about 20 seconds to wake." },
      ],
      technologies: ["Python", "FastAPI", "Pydantic", "pytest", "REST APIs"],
      links: [{ type: "Demo, cold start may take about 20 seconds", href: "https://pm-intelligence-7vob.onrender.com", icon: "external" }],
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
        "Post-training quantisation and mask-enforced pruning were evaluated as separate interventions. The useful result is the measured efficiency-versus-generalisation trade-off, not an unsupported claim about a particular F1-curve shape or long-tail behaviour.",
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
        "This was a bounded domain evaluation, not a deployment or a claim about general-domain performance. The result shows what a small parameter update achieved on the stated clause-extracted scenarios.",
      evidence: [
        { label: "Method", body: "BitFit updated bias terms only, keeping the trained share at no more than 0.1% of parameters." },
        { label: "Evaluation", body: "Reasoning accuracy increased from 47% to 73% on clause-extracted health-insurance scenarios." },
        { label: "Boundary", body: "No deployment or general-domain performance claim." },
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
        "The work unified iPhone and Apple Vision Pro into one tracking surface. It is associated with a paper in preparation and a patent application in progress. The implementation repository is withheld pending patent, lab, and co-inventor disclosure clearance.",
      evidence: [
        { label: "Contribution", body: "Built the visionOS spatial UI, real-time hand and gaze tracking, and an iPhone companion app." },
        { label: "Validation", body: "Reached 89% cross-device accuracy, 30 fps, and sub-millisecond latency; evaluated across three sessions with three patients per session." },
        { label: "Research status", body: "Co-author on a paper in preparation and co-inventor on a patent application in progress." },
      ],
      technologies: ["Swift", "RealityKit", "visionOS", "ARKit", "iOS"],
      links: [{ type: "Source withheld pending disclosure clearance", href: "", icon: "lock" }],
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
        "This is a practice surface rather than a resume project. It stays focused on category coverage and live statistics; Streak Wars ownership is not claimed here until the contribution boundary is confirmed.",
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
        "Research infrastructure, not a product. The lab wanted to know whether feedback signals - votes, accepted answers, edit cycles - shape content quality over time. Most of the interesting decisions ended up being about backoff strategy and resumable extraction rather than the analysis on top; the Stack Exchange API is generous if you respect it and brutal if you don't. Taught me that for any long-running scrape, the first thing worth designing is the resume path, not the happy path.",
      evidence: [
        { label: "Architecture", body: "Python and pandas pipeline over XML archives extracted from .7z files." },
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
        "Built to free 520 hours the lab was burning on manual citation entry. Scholar doesn't expose an official API, so the tool routes through Postman with careful pacing to avoid getting flagged. Boring code that solved a real problem - most of the value was in the resumability and the dedup on the backend, not the scrape itself. A small reminder that the unglamorous infrastructure projects often return the most time.",
      evidence: [
        { label: "Use", body: "Collected author, publication, and citation data and exported research-ready spreadsheets." },
        { label: "Impact", body: "Replaced manual collection and saved about 520 hours against a tight publication deadline." },
      ],
      technologies: ["Python", "BeautifulSoup", "pandas", "Automation"],
      links: [{ type: "Private (for now)", href: "", icon: "lock" }],
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
        "The visible public implementation writes to Excel and contains captured cookies, so it is not linked. SQLite and JWT architecture is omitted here until the public and private implementation histories are reconciled.",
      evidence: [
        { label: "Collection", body: "Retrieved configured station data across 24 pollutant and environmental fields." },
        { label: "Impact", body: "Eliminated more than 10,000 hours of manual entry for the research workflow." },
      ],
      technologies: ["Python", "pandas", "HTTP APIs", "Data Engineering"],
      links: [{ type: "Private (for now)", href: "", icon: "lock" }],
    },
    {
      title: "Llama-2 Fine-Tuning",
      slug: "llama2-finetuning",
      href: "https://github.com/maahir-garg/llama2-finetuning",
      dates: "Feb–Mar 2024",
      active: false,
      description:
        "Fine-tuned Llama-2-7b-chat on the Platypus dataset with LoRA and PEFT, improving target-task accuracy from 73% to 87% in a separately confirmed evaluation.",
      notes:
        "The public notebook covers supervised fine-tuning and evaluation mechanics. The 73% to 87% result is separately confirmed but is not presented as currently reproducible from the repository alone because the repository does not document that result.",
      evidence: [
        { label: "Method", body: "LoRA and PEFT supervised fine-tuning on the Platypus dataset." },
        { label: "Result", body: "Target-task accuracy improved from 73% to 87% in the confirmed evaluation." },
        { label: "Reproducibility boundary", body: "The linked repository demonstrates the workflow but does not currently substantiate the reported metric." },
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
