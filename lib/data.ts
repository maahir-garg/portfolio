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
  updated: "25 Sep 2026",
  heroStatus:
    "researching cheating-risk signals at AICET, teaching CS3230 and CS3263, and building Trader's Edge with my FYP team",
  sections: [
    {
      label: "Building",
      items: [
        {
          primary: "Trader's Edge",
          secondary: "the FYP MVP for strategy specification and backtesting, still moving",
        },
        {
          primary: "AICET",
          secondary: "the Keytrace research spike, ongoing",
        },
      ],
    },
    {
      label: "Just wrapped",
      items: [
        {
          primary: "PGPals",
          secondary:
            "ran the Emerald Challenge through September, shut it down on schedule with the review queue at zero",
        },
      ],
    },
    {
      label: "Teaching",
      items: [
        { primary: "CS3230", secondary: "Design and Analysis of Algorithms" },
        { primary: "CS3263", secondary: "Foundations of Artificial Intelligence" },
      ],
    },
    {
      label: "Watching",
      items: [
        { primary: "Formula 1", secondary: "the 2026 season" },
      ],
    },
    {
      label: "Off-screen",
      items: [
        { primary: "Badminton" },
        { primary: "Chess", secondary: "blitz, mostly" },
        { primary: "Drums" },
        { primary: "Photography" },
        { primary: "Swimming" },
        { primary: "Poker" },
      ],
    },
  ],
} as const;

export const ABOUT_PARAGRAPHS = [
  "I'm Maahir. I'm finishing a Computer Science and Quantitative Finance degree at NUS, and I spend most of my week at AICET trying to catch cheating in coding assessments without accusing someone who didn't cheat. The honest headline from that work isn't a nice accuracy number. A model that looked promising turned out to be statistically indistinguishable from chance once I ran the right test, and a plain lookup of which question it was beat it anyway. That's a confound, not a detector. I built the tooling that surfaced it, and I'd rather have found it than shipped it.",
  "Before that I was at GIC, building AI tooling for an eleven-person team in a classified-data environment, the kind of place where you can't just point Copilot at a problem. The part I cared about most was the guardrails: checks on every action an agent takes, so nobody downstream has to trust it blindly. A separate pipeline turned hunting for audit evidence across Snowflake and SharePoint into something close to instant.",
  "In the second half of 2025 I worked at Interactive 3D Lab, in collaboration with Apple, on hand and eye tracking for stroke rehabilitation. I built the visionOS side, the spatial interface and real-time tracking, plus the iPhone companion app. It was tested with real clinicians and real patients, which is the part I'm most careful about describing properly. A paper is in preparation and a patent application is in progress.",
  "I also teach. This semester I'm a TA for CS3230, the algorithms course I took as a student, and CS3263, Foundations of AI. Marking algorithm proofs with a red pen is where this site's red pen comes from. I'm also a Residential Assistant at Prince George's Park, and this September I built and ran PGPals, the platform for our residence's Emerald Challenge. Ninety-six teams played, and when it closed there was nothing left waiting in the review queue.",
  "Away from a keyboard: a camera goes most places with me, I play blitz chess faster than I should, badminton and drums fill the rest of the week, and I have strong opinions about Formula 1 pit-stop calls made from my couch.",
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
    "Maahir Garg studies Computer Science and Quantitative Finance at NUS and works as an AI Engineer with AICET's Team Koditsu, where he tests whether editing behaviour can flag likely cheating in coding assessments. He previously built agentic AI tooling at GIC and teaches Algorithms and Foundations of AI at NUS.",
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
        "Trying to catch cheating in coding assessments without accusing anyone innocent, which turns out to be a statistics problem more than an engineering one. The most useful thing I built was the test that showed a promising 0.778 AUROC was indistinguishable from chance, and a plain lookup of which question a student got beat it anyway.",
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
        "Teaching CS3230, the algorithms course I took myself as a student, and CS3263, foundations of AI. Four semesters in, students rate the teaching 4.8 out of 5, and it got me onto the NUS Honour List of Student Tutors.",
    },
    {
      company: "NUS",
      href: "https://www.comp.nus.edu.sg/orbital/",
      location: "Singapore",
      title: "Orbital Programme Advisor",
      dates: "May–Aug 2025; May–Aug 2026",
      description:
        "Two summers advising student teams from architecture to release. In 2025 every team I advised hit its target grade.",
    },
    {
      company: "GIC",
      href: "https://www.gic.com.sg",
      location: "Singapore",
      title: "AI Engineer",
      dates: "Jan 2026 – Jul 2026",
      featured: true,
      description:
        "Six months building AI tooling for a team where the usual shortcuts, like pointing Copilot at a problem, aren't allowed. I'm prouder of the guardrails I built to check every action an agent takes than of the agents themselves, and of a Snowflake-and-SharePoint pipeline that turned hunting for audit evidence into something close to instant.",
    },
    {
      company: "Interactive 3D Lab, in collaboration with Apple",
      href: "https://www.i3d.design",
      location: "Singapore",
      title: "Swift Developer, Apple Vision Pro",
      dates: "May 2025 – Dec 2025",
      featured: true,
      description:
        "Hand and eye tracking on Apple Vision Pro and iPhone for stroke rehabilitation, in collaboration with Apple. I built the visionOS side and the iPhone companion app, and it was tested with real clinicians and real patients. A paper is in preparation and a patent application is in progress.",
    },
    {
      company: "NUS, School of Computing",
      href: "https://www.comp.nus.edu.sg",
      location: "Singapore",
      title: "Research Assistant, Prof. Nan Chen",
      dates: "Aug 2024 – Apr 2025",
      description:
        "Built the data pipelines for a study of what actually predicts a good Stack Overflow answer, since upvotes and being marked accepted turn out not to be the same signal.",
    },
    {
      company: "Accelerice, NUS Overseas Colleges",
      href: "https://accelerice.com",
      location: "Jakarta, Indonesia",
      title: "Data Engineer",
      dates: "May 2024 – Aug 2024",
      description:
        "A summer in Jakarta building dashboards and databases a non-technical ops team used every day, plus some SEO and performance work on the side.",
    },
    {
      company: "NUS Information Technology",
      href: "https://nusit.nus.edu.sg",
      location: "Singapore",
      title: "Cyber Security Analyst",
      dates: "Feb 2024 – Jul 2024",
      description:
        "Supported NUS IT's bug-bounty and security programme, including vendor negotiation and running security-awareness sessions for people who mostly wanted to get back to work.",
    },
    {
      company: "NUS, Economics",
      href: "https://nus.edu.sg",
      location: "Singapore",
      title: "Research Assistant, Prof. Julian Wright",
      dates: "Nov 2023 – Feb 2024",
      description:
        "An economics paper had a deadline that wasn't moving and a mountain of citation data to collect by hand. I wrote a script instead, and it saved about 520 hours.",
    },
    {
      company: "NUS",
      href: "https://nus.edu.sg",
      location: "Singapore",
      title: "Research Assistant, Prof. Nils Martin Mattsson",
      dates: "Sep 2023 – Jan 2024",
      description:
        "An air-quality study needed years of pollutant readings from a system that assumed a human would copy them out by hand. I wrote the scraper so nobody had to.",
    },
    {
      company: "Augmented Human Lab",
      href: "https://www.ahlab.org",
      location: "Singapore",
      title: "Research Study Assistant",
      dates: "Sep 2023 – Nov 2023",
      description:
        "Ran sessions for a large AR/VR motion-sickness study with Meta, which mostly meant calibrating headsets and reassuring people that feeling slightly sick was, unfortunately, the data.",
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
        "I built and ran the platform for my residence's Emerald Challenge alone, start to closing ceremony. Ninety-six teams played, and the review queue was empty when it closed.",
      notes:
        "Backend, database, deploy, and then the actual running of it: reviewing submissions and fixing whatever broke, for two weeks. The leaderboard went dark before the closing ceremony so the last hour couldn't be gamed, and by the time it closed, nothing was left waiting in the queue. It's offline now, the way a two-week event should be.",
      evidence: [
        { label: "Scale", body: "164 authenticated users across 96 teams, 2,297 submissions and 3,763 photo/video attachments across 103 challenges." },
        { label: "Collaboration", body: "78 multi-team pairings, 2,196 approved submissions, 2,289 credited team-challenge completions, and 46,540 PGP Coins awarded." },
        { label: "Moderation", body: "10 administrators covered the entire submission workload with a 3.2-hour median turnaround and zero submissions left pending at event close." },
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
        "A team final-year project, advised by Anand Bhojan, that turns a plain-English trading idea into a backtest for students who haven't yet learned a strategy can cheat by knowing the future.",
      notes:
        "We're building this for students who haven't yet learned that a strategy can quietly cheat by knowing the future. It takes a plain-English idea, turns it into a backtest against historical data, and surfaces the usual traps: survivorship bias, look-ahead leakage, regime dependence, overfitting. The MVP works; it's still moving.",
      evidence: [
        { label: "Product", body: "A working MVP for specifying a strategy in plain English and backtesting it against historical data." },
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
        "A research engine watching Polymarket and Kalshi for the same question priced differently on each. It never places a trade, since prediction markets are restricted where I live.",
      notes:
        "Most of the free money disappears once you account for fees, thin order books, and settlement timing. Telling a real mispricing from two mismatched order books, rather than a matching bug, was the actual work: the engine needs a human to confirm a pairing before it counts as an opportunity at all.",
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
        "I wanted to know how small a BERT question-answering model could get before it noticeably got worse, and where exactly that line was.",
      notes:
        "Quantisation and a custom mask-enforced pruning path were the two levers, tested separately so I could tell which was actually doing the work. The interesting part was mapping compression against F1 closely enough to see exactly where the model starts to break instead of just noticing that it eventually does.",
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
        "How little of a model can you touch and still move it? I trained only the bias terms, a rounding error's worth of parameters, and reasoning accuracy jumped anyway.",
      notes:
        "BitFit limits training to just the bias terms, which is about as small a nudge as fine-tuning gets. I ran it on clause-extracted health-insurance scenarios to see how far that small a nudge could move reasoning accuracy, and it moved more than I expected.",
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
        "iPhone and Apple Vision Pro working as one tracking surface to assess hand and eye movement after a stroke, built in collaboration with Apple at Interactive 3D Lab.",
      notes:
        "I built the visionOS app, the spatial interface and the real-time tracking, plus the iPhone companion. It was tested with real clinicians and real patients. The implementation link stays private while the research disclosure process continues.",
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
        "Mostly an excuse to put a live feed of my LeetCode stats somewhere instead of just saying yeah, I practice.",
      notes:
        "The numbers here are pulled live from my public LeetCode profile. I also built Streak Wars, a Telegram bot that nags my friends about their own LeetCode streaks so I'm not the only one keeping score.",
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
        "Built for a study on what makes a Stack Overflow answer good, since upvotes and being marked accepted turn out not to be the same signal.",
      notes:
        "It pulls the raw StackExchange archives apart, posts, users, votes, comments, badges, and exports them into tables you can actually run statistics on instead of scrolling through.",
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
        "An economics paper had a deadline that wasn't moving and a mountain of citation data to collect by hand. I wrote the script instead. The paper made its deadline.",
      notes:
        "It searches by paper and author metadata, pulls out profiles and publication records, works out citation windows, and hands back a spreadsheet ready for the paper rather than a pile of browser tabs.",
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
        "An air-quality study needed years of pollutant readings from a system that assumed a human would copy them out by hand. I wrote the scraper so nobody had to.",
      notes:
        "It builds the encoded requests the CAAQMS system expects, pulls pollutant and environmental readings for every configured station, tracks which stations are done, and writes the results out to Excel for the actual analysis.",
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
        "An early exercise in learning parameter-efficient fine-tuning by doing it: LoRA on the Platypus dataset. The notebook is public.",
      notes:
        "This was mostly about learning LoRA by using it rather than reading about it: fine-tune Llama-2-7b-chat on Platypus, then check whether target-task accuracy actually moved.",
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
      dates: "Apr 2026 – Present",
      active: true,
      description:
        "This site: paper, ink, one red pen that marks things up as you scroll, and photos you can pick up and toss like real prints.",
      notes:
        "The red pen is the whole idea: hand-drawn marks that draw themselves in as you scroll, the way I mark up a proof. Photos behave like prints left on a desk, you can pick one up, drag it, toss it aside. Press Cmd+K to jump anywhere on the site, and the flights I've taken get drawn as routes on a map instead of listed as a table.",
      evidence: [
        { label: "Architecture", body: "Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion." },
        { label: "Accessibility", body: "Skip navigation, labelled controls, a keyboard-operable jump bar and lightbox, and full reduced-motion support." },
        { label: "Interaction", body: "Hand-drawn red-pen marks and physical-feeling photo prints, both built by hand rather than pulled from a template." },
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      links: [{ type: "Source", href: "https://github.com/maahir-garg/portfolio", icon: "github" }],
    },
  ],
};
