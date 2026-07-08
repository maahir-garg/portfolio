export const DATA = {
  name: "Maahir Garg",
  initials: "MG",
  location: "Singapore",
  locationLink: "https://www.google.com/maps/place/singapore",
  description:
    "AI Engineer at GIC. I build agentic LLM tooling for classified-data environments and optimize models that have to run in production.",
  summary:
    "I study Computer Science and Quantitative Finance at NUS and work as an AI Engineer at GIC, where I built an internal CLI agent and sandboxed Chainlit assistant for an 11-person team and agentic pipelines that automate audit workflows end-to-end. Before GIC I prototyped a multimodal hand-tracking framework on Apple Vision Pro for stroke rehabilitation (patent application in progress), taught algorithms at NUS, and shipped data infrastructure across a handful of research and industry roles.",
  avatarUrl: "/me.png",
  skills: {
    Programming: ["Python", "Java", "JavaScript", "C/C++", "Swift", "R", "LaTeX"],
    "ML & AI": ["PyTorch", "Hugging Face", "LLM Fine-tuning", "Agentic LLMs", "GraphRAG", "Vector Databases"],
    "Data & Distributed": ["Snowflake", "Databricks", "Kafka", "Spark", "Airflow", "ETL Pipelines"],
    "Cloud & DevOps": ["AWS (EC2, S3, Lambda)", "Docker", "Git", "Bash"],
    "Web & DB": ["React", "Next.js", "SQL (MySQL, PostgreSQL, Snowflake)"],
    Analysis: ["Pandas", "NumPy", "Matplotlib", "MATLAB", "Looker Studio"],
    Tools: ["RealityKit", "Figma"],
  },
  contact: {
    email: "maahirrgarg@gmail.com",
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
        "Built an internal agentic CLI agent and a sandboxed Chainlit assistant over proprietary models, with 8 custom tools, multi-agent orchestration, and skill-routing, giving an 11-person team AI tooling where classified-data constraints rule out Copilot. Engineered step-level guardrails via custom hooks that audit and validate every agent action, and designed an agentic audit pipeline that queries Snowflake and SharePoint as tools, runs ETL, and generates audit-ready reports from plain-English prompts, automating two previously manual data sources from hours to near-instant.",
    },
    {
      company: "Interactive 3D Lab",
      href: "https://www.i3d.design",
      badges: [],
      location: "Singapore",
      title: "Swift Developer, Apple Vision Pro",
      logoUrl: "/i3d.png",
      start: "May 2025",
      end: "Dec 2025",
      description:
        "Co-inventor of a multimodal tracking framework (patent application in progress) for hand-eye coordination assessment in stroke rehabilitation, unifying Apple Vision Pro and iPhone into one tracking surface at 89% cross-device accuracy, 30 fps, and sub-millisecond latency (Swift, RealityKit). Ran controlled user studies with healthcare practitioners and iterated system design from empirical findings. Co-author on a research paper in preparation.",
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
        "Three semesters across CS3230 (Design & Analysis of Algorithms), CS2040S (Data Structures & Algorithms), and CS1231S (Discrete Structures). Coached students through dynamic programming, graph algorithms, and complexity analysis. 4.8/5.0 teaching effectiveness rating vs 4.2 faculty average; named to the NUS Honour List of Student Tutors.",
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
        "Effectively a TA for a full semester-long software-engineering project: advised 12 student teams across the whole build: architecture, implementation planning, code review, and release management. All 12 projects passed at or above their targeted grade level.",
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
        "Built and optimized data pipelines against Stack Overflow under Prof. Nan Chen, modeling how feedback signals (upvotes, downvotes, acceptance rates) shape content quality over time, in support of an empirical paper.",
    },
    {
      company: "Accelerice",
      href: "https://accelerice.com",
      badges: [],
      location: "Jakarta, Indonesia",
      title: "Data Engineer (NUS Overseas College)",
      logoUrl: "/accelerice.png",
      start: "May 2024",
      end: "Aug 2024",
      description:
        "Shipped data-driven dashboards and backend databases with Python and API integrations, lifting data accessibility across the ops team by 40%. Led SEO and performance work: 30% lift in search ranking, 25% cut in page load time, 20% growth in organic traffic.",
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
        "Supported NUS IT's bug-bounty and security programme: led security projects, negotiated with vendors, and ran security-awareness training sessions for staff and peers.",
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
        "Automated Google Scholar citation scraping with Python and Postman for an economics paper on a tight deadline, saving roughly 520 hours and enabling on-time publication.",
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
        "Built a Python web scraper using SQLite and JWT to automate CAAQMS air-quality data collection under Prof. Nils Mattsson, eliminating over 10,000 hours of manual entry, and ran the downstream analysis.",
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
        "Ran a 500+ participant AR/VR motion-sickness study in collaboration with Meta, the largest of its kind at NUS: conducted individual sessions, logged data via Python scripts and surveys, and calibrated VR headsets, informing UX improvements to Meta's headsets.",
    },
  ],
  education: [
    {
      school: "National University of Singapore",
      href: "https://nus.edu.sg",
      degree: "Bachelor of Computing (Honours), Computer Science; Second Major in Quantitative Finance",
      logoUrl: "/nus.png",
      start: "2023",
      end: "2027",
    },
  ],
  leadership: [
    {
      org: "PGPR, NUS",
      role: "Residential Assistant",
      start: "May 2025",
      end: "Present",
      description:
        "Supporting 1,000+ residents: pastoral care, events, and first-contact conflict resolution and crisis management.",
    },
    {
      org: "NUS Mathematics Society",
      role: "Associate Logistics Director",
      start: "Aug 2024",
      end: "May 2025",
      description:
        "Ran event logistics, vendor relations, and procurement within budget.",
    },
    {
      org: "Project CUP, NUS (Rotary Club)",
      role: "Mathematics Mentor",
      start: "Aug 2023",
      end: "Dec 2024",
      description:
        "Taught maths to students using visual, interactive tools like animations and graphs.",
    },
  ],
  projects: [
    {
      title: "PGPals",
      slug: "pgpals",
      href: "https://pgpals-seven.vercel.app",
      dates: "Jul 2026 – Present",
      active: true,
      description:
        "An event platform for PGPR's two-week buddy challenge: ~200 teams of two complete photo tasks, RAs review submissions and award PGP Coins, and everyone watches the leaderboard — until it goes dark before the closing ceremony.",
      notes:
        "PGPR runs this buddy challenge every orientation cycle: paired teams work through a photo-task list, and an RA reviews each submission before awarding PGP Coins. The whole thing lives or dies by the leaderboard — it's the thing 200 teams check obsessively, so the one deliberate mechanic is timing: it goes dark right before the closing ceremony so the final standings land as a reveal instead of a slow leak. Scale is modest (~400 users) but the app has to feel responsive at event peak, so server functions are pinned to Vercel's sin1 region to stay close to the Singapore-hosted Supabase database rather than round-tripping across the Pacific. Everything else — auth, storage, Postgres — is sized to fit comfortably inside free tiers. Still building.",
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "shadcn/ui"],
      links: [
        {
          type: "Live Site",
          href: "https://pgpals-seven.vercel.app",
          icon: "external",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Trader's Edge",
      slug: "traders-edge",
      href: "https://traders-edge-eta.vercel.app",
      dates: "May 2026 – Present",
      active: true,
      description:
        "My final-year project (advisor: Anand Bhojan): an AI platform that generates and backtests trading strategies, then packages them into an interactive, data-rich learning environment for students. Working MVP shipped (private).",
      notes:
        "The thesis is that most people learn trading backwards: they read strategy descriptions long before they ever watch one fail on real data. Trader's Edge inverts that. You describe an idea in plain English, the system turns it into a backtestable strategy, and you watch it play out against historical data before you trust it. The hard part isn't the generation; LLMs are good at that now. It's the guardrails around backtesting: survivorship bias, look-ahead leakage, overfitting to a single regime. The learning environment exists so a student can see why a strategy that looks great in-sample falls apart out-of-sample. Still building; the MVP is private for now.",
      technologies: ["AI", "LLMs", "Backtesting", "Quantitative Finance", "Python"],
      links: [
        {
          type: "Live Demo",
          href: "https://traders-edge-eta.vercel.app",
          icon: "external",
        },
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
      title: "Prediction-Market Arbitrage Engine",
      slug: "prediction-market-arbitrage",
      href: "https://pm-intelligence-7vob.onrender.com",
      dates: "Feb 2026 – Present",
      active: true,
      description:
        "A student-led research prototype exploring cross-venue arbitrage on prediction markets (Polymarket, Kalshi). Surfaces mispricings via expected-value and execution-cost modeling. A research prototype only: no live capital, no realized P&L.",
      notes:
        "The premise: the same real-world event is often priced differently on Polymarket and Kalshi, and the gap should be capturable. Modeling it honestly meant the execution-cost side mattered more than the signal; fees, slippage, and settlement timing routinely ate spreads that looked like free money on paper. The expected-value layer had to account for resolution risk too: two venues can word the 'same' contract just differently enough that they don't actually resolve together. I kept this strictly a research prototype, so there was never live capital or realized P&L; the value was the modeling discipline, not a deployment.",
      technologies: ["Python", "Quantitative Finance", "Arbitrage", "Modeling"],
      links: [
        {
          type: "Live Demo",
          href: "https://pm-intelligence-7vob.onrender.com",
          icon: "external",
        },
        {
          type: "Research Prototype",
          href: "",
          icon: "lock",
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Optimizing BERT for Question Answering",
      slug: "bert-qa-quant-prune",
      href: "",
      dates: "Nov 2025",
      active: true,
      description:
        "Achieved a 69% reduction in model size (440MB to 128MB) with <0.5% F1 loss via post-training quantization. Implemented custom mask-enforced pruning to reach 54.7% sparsity and analyzed efficiency vs generalization trade-offs.",
      notes:
        "I went in expecting quantization to be the headline. It wasn't - int8 was basically free, the real story was pruning. Hugging Face's built-in pruning rounds the mask too aggressively for fine-grained sparsity, so I enforced the zero-mask inside the forward hook to keep the sparsity I asked for. Past 50% sparsity the F1 curve develops a clear elbow: cheap until it isn't, and the cliff erases the long-tail of generalization first. The interesting decision wasn't 'how small can it get' but 'where do I stop.'",
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
      notes:
        "A study in how little you can actually train and still meaningfully shift behavior. BitFit touches only the bias terms - under a tenth of a percent of parameters - so this was as much a diagnostic as a fine-tune: is the base model close enough that a nudge gets us there. The unexpected finding was that domain coverage of the few-shot examples mattered far more than count; three well-chosen scenarios beat ten near-duplicates. I wouldn't ship BitFit alone in production, but it's now my first step before reaching for LoRA - it tells you whether the problem is reachable from where the base model already sits.",
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
      title: "Multimodal Hand Tracking for Stroke Rehab",
      slug: "3d-iphone",
      href: "https://github.com/maahir-garg/3D-iPhone",
      dates: "Dec 2025",
      active: true,
      description:
        "A multimodal framework (patent application in progress) that unifies iPhone and Apple Vision Pro into a single tracking surface for hand-eye coordination assessment in stroke rehabilitation. Co-invented at Interactive 3D Lab; built in Swift and RealityKit; validated in controlled studies with healthcare practitioners at 89% cross-device accuracy. Research paper in preparation.",
      notes:
        "We wanted to assess hand-eye coordination in stroke patients without sensors or a lab rig. Vision Pro tracks hands beautifully but only inside its own world space; the iPhone sees the room from outside. The hard part wasn't the geometry - it was the latency budget. Frame sync between the two devices had to stay tight enough that a fast reach didn't desync the surfaces, and that single constraint dictated the whole architecture. The clinical sessions were where the design pressure became real: practitioners don't have time to recalibrate, so the system had to stay accurate without intervention for a full assessment.",
      technologies: [
        "Swift",
        "RealityKit",
        "Vision Pro",
        "iPhone",
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
      title: "LeetCoding",
      slug: "leetcoding",
      href: "https://leetcode.com/u/maahir_garg/",
      dates: "Ongoing",
      active: true,
      liveStats: true,
      description:
        "An ongoing LeetCode practice track focused on deepening algorithmic thinking and problem‑solving speed, backed by live stats.",
      notes:
        "Less about grinding count, more about pattern fluency. I track which categories I'm slow on - DP transitions, monotonic stacks, range queries - and bias practice toward those rather than whatever feels easy. The live stats are partly to keep me honest. To keep my friends and me honest too, I built Streak Wars - a quick Telegram bot that tracks our LeetCode streaks and nudges whoever's slipping. The longer I do it, the less it feels like prep and the more it feels like a small daily warm-up for thinking precisely.",
      technologies: [
        "Algorithms",
        "Data Structures",
        "Problem Solving",
        "Python"
      ],
      links: [
        {
          type: "Profile",
          href: "https://leetcode.com/u/maahir_garg/",
          icon: "external",
        },
        {
          type: "Streak Wars (Telegram bot)",
          href: "https://github.com/maahir-garg/streak-wars",
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
        "Resumable data pipelines analyzing how Stack Overflow's feedback mechanisms — votes, accepted answers, edit cycles — shape content quality over time.",
      notes:
        "Research infrastructure, not a product. The lab wanted to know whether feedback signals - votes, accepted answers, edit cycles - shape content quality over time. Most of the interesting decisions ended up being about backoff strategy and resumable extraction rather than the analysis on top; the Stack Exchange API is generous if you respect it and brutal if you don't. Taught me that for any long-running scrape, the first thing worth designing is the resume path, not the happy path.",
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
        "Automated Google Scholar citation scraper with careful pacing, resumability, and dedup — freed 520+ hours of manual citation entry for an NUS research lab.",
      notes:
        "Built to free 520 hours the lab was burning on manual citation entry. Scholar doesn't expose an official API, so the tool routes through Postman with careful pacing to avoid getting flagged. Boring code that solved a real problem - most of the value was in the resumability and the dedup on the backend, not the scrape itself. A small reminder that the unglamorous infrastructure projects often return the most time.",
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
        "Python scraper for India's CAAQMS air-quality network — JWT session handling, SQLite storage for portability, and 10,000+ hours of manual entry saved.",
      notes:
        "A Python scraper for India's CAAQMS air-quality monitoring data. The portal sits behind a JWT-based session with a finicky token-refresh loop, so the bulk of the work was the auth dance, not the data shaping. SQLite for portability - research collaborators could sync the file rather than spin up a database. Saved the team well over 10,000 hours of manual entry across its lifetime.",
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
      title: "Llama2 Fine-tuning",
      slug: "llama2-finetuning",
      href: "https://github.com/maahir-garg/llama2-finetuning",
      dates: "Mar 2024",
      active: true,
      description:
        "End-to-end pipeline for fine-tuning Llama2 large language models using LoRA / PEFT adapters. Covers data preparation, supervised fine-tuning, and evaluation - built as a reproducible notebook for experimenting with domain adaptation of open-weight LLMs.",
      notes:
        "A learning project to internalize the LoRA pipeline end-to-end: data prep, supervised fine-tuning, adapter merge, and a small eval harness. Scope was deliberately narrow so I could touch every piece. The base model is dated now, but the muscle memory transferred - when I reach for PEFT in newer work, it's because of what this project taught me about adapters and merge mechanics.",
      technologies: [
        "Python",
        "Llama2",
        "LoRA",
        "PEFT",
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
    {
      title: "Portfolio Website",
      slug: "portfolio",
      href: "https://github.com/maahir-garg/portfolio",
      dates: "Apr 2026",
      active: true,
      description:
        "This site. Editorial field-notebook redesign: warm paper canvas and oxidized-red pencil mark, indexed sections, live Singapore clock, both light and dark tuned independently. Built with Next.js 16 + Tailwind v4; motion respects prefers-reduced-motion; a11y basics from skip-link to keyboard lightbox.",
      notes:
        "A deliberate departure from the standard developer-portfolio aesthetic. I wanted the site to read like a field notebook - paper-warm, restrained, with one accent color carrying all the emphasis. Both light and dark were tuned independently rather than inverted; the dark mode uses lighter font weights because the same type reads heavier on a dark canvas. Every animation respects prefers-reduced-motion, the lightbox is keyboard-navigable, and there's a skip-link in the right place. The whole thing should feel quiet - that's the design goal.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS v4"
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/maahir-garg/portfolio",
          icon: "github",
        },
      ],
      image: "",
      video: "",
    },

  ],
} as const;
