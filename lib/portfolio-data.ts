export type ProjectCategory =
  | 'All Projects'
  | 'Business Websites'
  | 'Online Stores'
  | 'WordPress Solutions'
  | 'Web Applications'
  | 'Tools & Experiments';

export interface ProjectRouteLink {
  label: string;
  url: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  index: string;
  slug: string;
  title: string;
  shortTitle: string;
  industry: string;
  tagline: string;
  clientSummary: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  filterTags: Array<Exclude<ProjectCategory, 'All Projects'>>;
  isClientWork: boolean;
  featured: boolean;
  year: string;
  role: string;
  clientOrContext: string;
  liveUrl?: string;
  embedUrl?: string;
  githubUrl?: string;
  secondaryGithubUrl?: string;
  secondaryGithubLabel?: string;
  embedAllowed: boolean;
  blockingHeader?: string;
  desktopScreenshot: string;
  mobileScreenshot: string;
  previewImage: string;
  accentColor: string;
  // Customer-friendly case study narrative
  businessOverview: string;
  objective: string;
  whatIDelivered: string;
  keyFeaturesPlain: string[];
  // Legacy / Recruiter technical narrative
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  techStack: string[];
  technicalHighlights: string[];
  challengesAndSolutions: Array<{
    challenge: string;
    solution: string;
  }>;
  verifiedRoutes: ProjectRouteLink[];
  architectureNotes: string[];
  ownershipLabel?: string;
  personalBuildScope?: string[];
  primaryActionLabel?: string;
  primaryActionUrl?: string;
  relatedCaseStudySlugs?: string[];
}

export interface ServiceCreativeSample {
  title: string;
  type: string;
  description: string;
  tags: string[];
  accentColor: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  slug: string;
  title: string;
  shortTitle: string;
  benefitStatement: string;
  heroSubtitle: string;
  overview: string;
  whoItIsFor: string[];
  problemsSolved: string[];
  deliverables: string[];
  capabilities: string[];
  processSteps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  previewImage: string;
  isSampleVisual?: boolean;
  sampleLabel?: string;
  accentColor: string;
  whatsappMessage: string;
  ctaHeading: string;
  relatedProjectSlugs: string[];
  creativeSamples?: ServiceCreativeSample[];
}

export interface ExperimentItem {
  id: string;
  index: string;
  title: string;
  category: 'Live Web Apps' | 'WordPress & PHP' | 'React Utilities';
  type: string;
  language: string;
  description: string;
  technicalDetail: string;
  previewImage: string;
  liveUrl?: string;
  embedUrl?: string;
  githubUrl: string;
  embedAllowed: boolean;
  verifiedDate: string;
}

export interface ExpertiseDomain {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  businessValue: string;
  summary: string;
  deliverables: string[];
  technologies: string[];
  relatedProjects: Array<{ title: string; slug: string; image: string }>;
  architecturalProof: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  artifacts: string[];
}

export const DEVELOPER_PROFILE = {
  name: 'Abdul Hameed',
  role: 'Full-Stack Web Developer | Custom Websites, Plugins & Web Applications',
  shortRole: 'Full-Stack Web Developer',
  tagline:
    'I design and engineer complete web products across frontend interfaces and backend logic—building custom WordPress platforms, PHP plugins, Shopify storefronts, and Next.js applications.',
  location: 'Lahore, Pakistan',
  company: 'DE Media Solutions Pvt. Ltd.',
  education: 'BS Computer Science — Virtual University of Pakistan (Ongoing)',
  email: 'hameedrjt@gmail.com',
  whatsappDisplay: '+92 329 6988010',
  whatsappDigits: '923296988010',
  whatsappAltDisplay: '+92 370 4214181',
  whatsappAltDigits: '923704214181',
  githubUrl: 'https://github.com/abdulhameed-developer',
  githubHandle: 'abdulhameed-developer',
  linkedinUrl: 'https://www.linkedin.com/in/abdul-hameed-website-developer/',
  wordpressOrgUrl: 'https://profiles.wordpress.org/codian/',
  wordpressHandle: 'codian',
  coreTracTicketUrl: 'https://core.trac.wordpress.org/ticket/66548',
  coreTracTicketNumber: '#66548',
};

export function getWhatsAppUrl(
  message = 'Hello Abdul Hameed, I visited your portfolio and would like to discuss a project.',
  phoneDigits = DEVELOPER_PROFILE.whatsappDigits
): string {
  const cleanDigits = phoneDigits.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanDigits}?text=${encodeURIComponent(message)}`;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-development',
    index: '01',
    slug: 'website-development',
    title: 'Website Design & Development',
    shortTitle: 'Website Development',
    benefitStatement:
      'Modern, responsive websites designed to represent your brand and make it easier for customers to connect.',
    heroSubtitle:
      'Custom business websites, landing pages, and web applications built for clarity, mobile usability, and customer trust.',
    overview:
      'Your website is often the first impression a potential customer has of your business. I design and develop clean, fast, mobile-friendly websites that explain what you offer clearly, showcase your work or services, and guide visitors smoothly toward contacting you or making an enquiry.',
    whoItIsFor: [
      'Small and medium businesses launching a new digital presence',
      'Service providers, studios, clinics, salons, and consultancies',
      'Startups and founders needing a credible product or company site',
      'Professionals and organizations refreshing an outdated website',
    ],
    problemsSolved: [
      'Outdated websites that look broken or cramped on mobile phones',
      'Confusing navigation that makes visitors leave without inquiring',
      'Slow-loading pages that hurt customer trust and search visibility',
      'Generic templates that fail to reflect the quality of your business',
    ],
    deliverables: [
      'Custom responsive website tailored to your brand and audience',
      'Mobile-first layouts tested across phones, tablets, and desktops',
      'Clear service pages, project galleries, and customer enquiry forms',
      'Direct WhatsApp, phone, and email lead-generation integration',
      'Clean semantic HTML, fast asset loading, and foundational SEO setup',
    ],
    capabilities: [
      'Business websites',
      'Company websites',
      'Landing pages',
      'Personal & portfolio websites',
      'Frontend React & Next.js web applications',
      'Website redesigns & modernizations',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Understand Your Business & Goals',
        description:
          'We discuss your services, target customers, visual preferences, and the actions you want visitors to take.',
      },
      {
        step: '02',
        title: 'Structure & Visual Direction',
        description:
          'I organize your pages, headings, and visual hierarchy so customers immediately understand your value.',
      },
      {
        step: '03',
        title: 'Responsive Development',
        description:
          'Your website is built with clean, modern code and tested carefully across mobile, tablet, and desktop screens.',
      },
      {
        step: '04',
        title: 'Review, Polish & Launch',
        description:
          'We review the live preview together, refine details, verify contact forms and speed, and launch smoothly.',
      },
    ],
    faqs: [
      {
        question: 'Will my website work properly on mobile phones?',
        answer:
          'Yes. Every website I build is designed mobile-first and tested across phone, tablet, and desktop screen sizes so customers can browse and contact you effortlessly from any device.',
      },
      {
        question: 'Can you redesign my existing website without starting from scratch?',
        answer:
          'Absolutely. I can audit your current site, preserve your valuable content and domain setup, and rebuild the design, layout, and mobile responsiveness.',
      },
      {
        question: 'Can you integrate WhatsApp and direct enquiry forms?',
        answer:
          'Yes. I can add clear WhatsApp buttons with prefilled messages, click-to-call links, and simple enquiry workflows tailored to your services.',
      },
    ],
    previewImage: '/images/v5/service-web-design.jpg',
    accentColor: '#E04F33',
    whatsappMessage:
      "Hello Abdul Hameed, I'm interested in Website Design & Development. I'd like to discuss my website requirements.",
    ctaHeading: 'Need a modern website for your business? Let’s discuss your idea.',
    relatedProjectSlugs: ['shawn-salon', 'mustafai-help-mission', 'boxpad-chat-dashboard'],
  },
  {
    id: 'wordpress-development',
    index: '02',
    slug: 'wordpress-development',
    title: 'WordPress Development & Custom Features',
    shortTitle: 'WordPress Solutions',
    benefitStatement:
      'Flexible WordPress websites and custom functionality built around how your business actually works.',
    heroSubtitle:
      'From easy-to-manage business websites to searchable directories, booking systems, and custom WordPress plugins.',
    overview:
      'WordPress powers millions of businesses, but off-the-shelf themes and bloated plugins often fall short when you need specific features. I build and customize WordPress websites—and develop custom PHP plugins when needed—so your site looks polished, runs reliably, and gives your team an easy dashboard to manage content.',
    whoItIsFor: [
      'Businesses wanting a professional website they can easily update themselves',
      'Education consultancies, agencies, and organizations needing searchable directories',
      'Service businesses requiring appointment scheduling or consultation booking',
      'Existing WordPress site owners needing custom features, fixes, or plugin development',
    ],
    problemsSolved: [
      'Rigid WordPress themes that cannot match your branding or layout needs',
      'Missing custom workflows like course comparison, filtering, or timezone booking',
      'Plugin conflicts, layout bugs, or slow administration dashboards',
      'Difficulty organizing structured content like courses, services, or programmes',
    ],
    deliverables: [
      'Custom WordPress website setup, theme customization, and responsive styling',
      'Dynamic content directories using Custom Post Types and custom filters',
      'Bespoke WordPress plugins for booking, comparison tables, or PDF exports',
      'Third-party API integrations (such as Google Calendar appointment syncing)',
      'Security-conscious PHP code following official WordPress standards',
    ],
    capabilities: [
      'WordPress website development',
      'Theme & layout customization',
      'Dynamic content & searchable directories',
      'Booking & consultation systems',
      'Custom WordPress plugin development',
      'API integrations & website improvements',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Requirements & Content Mapping',
        description:
          'We identify the pages, dynamic content types, and custom interactions your visitors and admin team need.',
      },
      {
        step: '02',
        title: 'Custom Theme or Plugin Architecture',
        description:
          'I choose the cleanest approach—customizing your WordPress theme or building a modular plugin without unnecessary bloat.',
      },
      {
        step: '03',
        title: 'Frontend & Admin Implementation',
        description:
          'I build a responsive customer-facing interface alongside an intuitive WordPress admin settings experience.',
      },
      {
        step: '04',
        title: 'Testing & Handover',
        description:
          'Every form, filter, and booking flow is tested on desktop and mobile so your team can manage the site with confidence.',
      },
    ],
    faqs: [
      {
        question: 'Will I be able to edit text and images myself after launch?',
        answer:
          'Yes. WordPress makes content management straightforward, and I structure custom fields and pages so your team can update text, photos, and listings without touching code.',
      },
      {
        question: 'Can you build a custom WordPress plugin for my specific workflow?',
        answer:
          'Yes. For example, I developed Course Comparator Pro (side-by-side course comparison with PDF export) and Consultation Booking Pro (timezone-aware scheduling with Google Calendar sync) for a live international education portal.',
      },
      {
        question: 'Can you improve or fix my existing WordPress website?',
        answer:
          'Yes. I regularly customize existing WordPress sites, improve mobile layouts, add new sections, and resolve technical or styling issues.',
      },
    ],
    previewImage: '/images/v5/service-wordpress-cms.jpg',
    accentColor: '#0D9488',
    whatsappMessage:
      "Hello Abdul Hameed, I'm interested in WordPress development. I'd like to discuss my requirements.",
    ctaHeading: 'Need a WordPress website or custom feature? Let’s talk.',
    relatedProjectSlugs: [
      'tjs-studysteps',
      'shawn-salon',
      'course-comparator-pro',
      'consultation-booking-pro',
      'mustafai-help-mission',
    ],
  },
  {
    id: 'ecommerce-development',
    index: '03',
    slug: 'ecommerce-development',
    title: 'E-Commerce & Online Stores',
    shortTitle: 'E-Commerce Stores',
    benefitStatement:
      'Professional online stores that showcase your products beautifully and make browsing and purchasing straightforward.',
    heroSubtitle:
      'Shopify storefront customization and WordPress e-commerce experiences tailored for fashion, retail, and growing brands.',
    overview:
      'Selling online requires more than just uploading product photos. Customers judge your brand by how smoothly your store loads, how clearly product details and sizing are presented, and how effortless the mobile shopping experience feels. I customize Shopify storefronts and WordPress e-commerce layouts so your products stand out and customers can shop with confidence.',
    whoItIsFor: [
      'Fashion, bridal, apparel, and lifestyle brands selling on Shopify',
      'Retail businesses launching or refreshing an online product catalogue',
      'Store owners whose mobile product pages feel cluttered or hard to navigate',
      'Brands expanding to reach both local and international buyers',
    ],
    problemsSolved: [
      'Default store templates that do not reflect a premium or heritage brand identity',
      'Cluttered collection grids and product galleries on mobile screens',
      'Unclear navigation between seasonal collections, categories, and product details',
      'Heavy product images that slow down browsing on mobile data connections',
    ],
    deliverables: [
      'Custom Shopify theme styling and Liquid template refinements',
      'Editorial lookbook sections, featured collection showcases, and banner layouts',
      'Mobile-optimized product galleries, variant presentation, and navigation menus',
      'Clean product catalogue organization and customer enquiry/WhatsApp hooks',
      'Responsive image sizing and storefront speed optimization',
    ],
    capabilities: [
      'Shopify storefront customization',
      'Product catalogue presentation',
      'Storefront UI & layout improvements',
      'Mobile shopping experience optimization',
      'Custom collection & lookbook sections',
      'WordPress & WooCommerce storefront support',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Storefront & Catalogue Review',
        description:
          'We review your products, collections, brand aesthetic, and the shopping journey on mobile and desktop.',
      },
      {
        step: '02',
        title: 'Homepage & Collection Design',
        description:
          'I craft hero banners, collection grids, and editorial storytelling sections that highlight your product quality.',
      },
      {
        step: '03',
        title: 'Product Page & Mobile Refinement',
        description:
          'Product galleries, descriptions, and navigation drawers are tuned for thumb-friendly mobile shopping.',
      },
      {
        step: '04',
        title: 'Quality Check & Launch',
        description:
          'We verify every collection, product template, and responsive breakpoint before publishing changes.',
      },
    ],
    faqs: [
      {
        question: 'Do you work with existing Shopify stores?',
        answer:
          'Yes. I can customize your existing Shopify theme, refine Liquid templates, improve mobile product pages, and organize collections without disrupting your inventory.',
      },
      {
        question: 'Have you worked on real luxury or fashion e-commerce stores?',
        answer:
          'Yes. I customized the live Shopify storefront for Kamdani by Rana (kamdanibyrana.com), a heritage Pakistani bridal and luxury couture brand established in 1992.',
      },
    ],
    previewImage: '/images/v5/service-ecommerce-store.jpg',
    accentColor: '#D97706',
    whatsappMessage:
      "Hello Abdul Hameed, I'm interested in E-commerce / Shopify store development. I'd like to discuss my online store.",
    ctaHeading: 'Planning or upgrading an online store? Let’s discuss your storefront.',
    relatedProjectSlugs: ['kamdani-by-rana', 'shawn-salon'],
  },
  {
    id: 'seo-optimization',
    index: '04',
    slug: 'seo-optimization',
    title: 'SEO & Website Optimization',
    shortTitle: 'SEO & Optimization',
    benefitStatement:
      'Help search engines understand your website and give visitors a faster, clearer experience.',
    heroSubtitle:
      'Practical technical SEO, on-page structure, Schema.org metadata, and page-speed improvements grounded in real engineering.',
    overview:
      'Even a visually attractive website can struggle to reach customers if search engines cannot crawl its pages properly or if slow load times drive mobile visitors away. I provide practical technical and on-page SEO improvements—fixing heading hierarchy, metadata, structured data (JSON-LD), sitemaps, and frontend performance so your website has a strong, search-friendly foundation.',
    whoItIsFor: [
      'Local businesses wanting clearer visibility for their services and location',
      'Websites missing proper page titles, meta descriptions, or structured data',
      'WordPress and Shopify owners dealing with sluggish mobile loading',
      'Teams wanting a clean technical SEO audit and actionable implementation',
    ],
    problemsSolved: [
      'Missing or duplicated page titles, meta descriptions, and Open Graph tags',
      'Broken heading hierarchies (missing H1s or disorganized content structure)',
      'Lack of Schema.org structured data for Local Businesses, Products, FAQs, or Articles',
      'Unoptimized images and layout shifts slowing down mobile browsing',
    ],
    deliverables: [
      'Technical & on-page SEO audit identifying clear, practical fixes',
      'Optimized title tags, meta descriptions, canonical URLs, and Open Graph cards',
      'Custom Schema.org JSON-LD structured data implementation',
      'XML sitemap, robots.txt, and Google Search Console configuration support',
      'Image compression, lazy loading, and responsive layout stability improvements',
    ],
    capabilities: [
      'Website SEO audits',
      'On-page SEO & content structure',
      'Technical SEO foundations',
      'Keyword research & intent alignment',
      'Schema.org JSON-LD structured data',
      'Website speed & Core Web Vitals optimization',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Technical & On-Page Audit',
        description:
          'I inspect your site structure, headings, metadata, indexing setup, and page speed across mobile and desktop.',
      },
      {
        step: '02',
        title: 'Keyword & Content Structure Alignment',
        description:
          'We align your service pages and headings with the real terms customers use when searching for your offerings.',
      },
      {
        step: '03',
        title: 'Metadata, Schema & Speed Implementation',
        description:
          'I implement clean metadata, Schema.org JSON-LD markup, sitemaps, and asset optimizations directly in your site.',
      },
      {
        step: '04',
        title: 'Verification & Handover Report',
        description:
          'You receive a clear summary of every improvement made along with recommendations for ongoing content growth.',
      },
    ],
    faqs: [
      {
        question: 'Do you promise #1 Google rankings or guaranteed traffic numbers?',
        answer:
          'No honest professional can guarantee specific search rankings, as search algorithms depend on many external factors. What I guarantee is clean, standards-compliant technical SEO, accurate structured data, well-organized pages, and faster performance.',
      },
      {
        question: 'Have you built SEO tools or implemented SEO on live sites?',
        answer:
          'Yes. I created PakSEO AI (pakseo-ai.vercel.app), an open-source SEO & JSON-LD Schema Studio, and implemented local and technical SEO foundations on client websites like Shawn Salon & Aesthetics.',
      },
    ],
    previewImage: '/images/v5/service-seo-analytics.jpg',
    accentColor: '#2563EB',
    whatsappMessage:
      "Hello Abdul Hameed, I'd like to discuss SEO and website optimization.",
    ctaHeading: 'Want to strengthen your website’s search foundation and speed?',
    relatedProjectSlugs: ['pakseo-ai', 'shawn-salon', 'filecompresser'],
  },
  {
    id: 'graphic-design',
    index: '05',
    slug: 'graphic-design',
    title: 'Graphic Design & Digital Creatives',
    shortTitle: 'Graphics & Creatives',
    benefitStatement:
      'Clean, cohesive website banners, social media graphics, and promotional visuals that support your online presence.',
    heroSubtitle:
      'Practical digital graphics created to match your website, campaigns, product launches, and everyday marketing needs.',
    overview:
      'When launching a website or promoting a service online, businesses often need matching visual assets—from homepage hero banners and promotional graphics to social media posts and presentation visuals. As a complementary digital service alongside web development, I create clean, on-brand digital graphics so your website and social channels look cohesive and professional.',
    whoItIsFor: [
      'Website clients who need matching hero banners, promotional sliders, or section visuals',
      'Small businesses needing clean social media graphics and announcement posts',
      'Online stores looking for cohesive collection banners and product highlight cards',
      'Founders and professionals needing tidy presentation decks or digital ad visuals',
    ],
    problemsSolved: [
      'Websites held back by low-quality, mismatched, or stretched banner graphics',
      'Inconsistent visual styling between your website and social media pages',
      'Need for quick, practical promotional graphics without hiring a large ad agency',
    ],
    deliverables: [
      'Website hero banners, promotional section graphics, and campaign headers',
      'Social media post templates and announcement graphics (Instagram, LinkedIn, Facebook)',
      'Product feature cards and e-commerce collection banners',
      'Clean typography layouts, simple brand assets, and presentation visuals',
      'Web-ready exported files (PNG, JPG, WebP, SVG) sized for fast loading',
    ],
    capabilities: [
      'Website banners & hero visuals',
      'Social media creatives',
      'Promotional & campaign graphics',
      'Product highlight visuals',
      'Simple brand assets & visual kits',
      'Presentation & marketing graphics',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Brief & Brand Alignment',
        description:
          'We review your brand colors, website style, message, and the exact dimensions required for web or social platforms.',
      },
      {
        step: '02',
        title: 'Concept & Layout Creation',
        description:
          'I design clear, balanced visual compositions focused on readability, hierarchy, and brand consistency.',
      },
      {
        step: '03',
        title: 'Refinement & Web Optimization',
        description:
          'We refine the copy and visual details, then export crisp, properly compressed assets ready for publishing.',
      },
    ],
    faqs: [
      {
        question: 'Can you create the banners and graphics needed for my new website?',
        answer:
          'Yes. Having the same person develop your website and prepare your hero banners, service visuals, and promotional graphics keeps everything visually consistent.',
      },
      {
        question: 'Are the graphic samples shown here client projects or studio samples?',
        answer:
          'The creative samples showcased on this page are original portfolio demonstration concepts created specifically to illustrate the types of web banners, social graphics, and promotional visuals I can prepare for your business.',
      },
    ],
    previewImage: '/images/v5/service-brand-identity.jpg',
    isSampleVisual: true,
    sampleLabel: 'Original Studio Demonstration Sample',
    accentColor: '#9333EA',
    whatsappMessage:
      "Hello Abdul Hameed, I'm looking for digital graphics and creative design services.",
    ctaHeading: 'Need clean banners or digital graphics for your brand? Let’s talk.',
    relatedProjectSlugs: ['kamdani-by-rana', 'shawn-salon'],
    creativeSamples: [
      {
        title: 'Luxury Salon & Aesthetics Campaign Kit',
        type: 'Original Portfolio Concept · Web & Social Banners',
        description:
          'Cohesive promotional banner and Instagram appointment card concept designed to pair with high-end beauty and aesthetics websites.',
        tags: ['Hero Banner', 'Social Post Set', 'Appointment Promo'],
        accentColor: '#E04F33',
      },
      {
        title: 'E-Commerce Seasonal Lookbook Headers',
        type: 'Original Portfolio Concept · Storefront Graphics',
        description:
          'Editorial collection headers and product highlight cards formatted for desktop and mobile Shopify storefronts.',
        tags: ['Collection Header', 'Mobile Story Card', 'WebP Optimized'],
        accentColor: '#D97706',
      },
      {
        title: 'Education & Consultancy Programme Cards',
        type: 'Original Portfolio Concept · Digital Marketing Assets',
        description:
          'Structured informational social cards and webinar announcement graphics for student admissions and consultancy campaigns.',
        tags: ['Announcement Graphic', 'Info Card', 'LinkedIn & Instagram'],
        accentColor: '#0D9488',
      },
    ],
  },
  {
    id: 'ai-assisted-solutions',
    index: '06',
    slug: 'ai-assisted-solutions',
    title: 'AI-Assisted Digital Solutions',
    shortTitle: 'AI-Assisted Workflows',
    benefitStatement:
      'Practical AI-assisted content preparation, creative concepting, and modern web workflows—always guided by human review and customization.',
    heroSubtitle:
      'Combine faster ideation, structured content organization, and AI-assisted prototyping with dependable human engineering and quality control.',
    overview:
      'Modern AI tools like Cursor, Claude, Gemini, and ChatGPT dramatically accelerate architecture, complex problem-solving, content structuring, and rapid web prototyping—when paired with rigorous human full-stack engineering. I combine AI-assisted velocity with hands-on end-to-end development so every layout, backend endpoint, database query, and line of code is carefully engineered, customized, and verified by me.',
    whoItIsFor: [
      'Businesses launching a website that need help structuring and polishing raw service notes',
      'Brands wanting rapid visual moodboards and creative concept exploration',
      'Teams looking for custom web tools, SEO workbenches, or structured content workflows',
      'Founders who want fast interactive prototypes turned into real, maintainable full-stack websites',
    ],
    problemsSolved: [
      'Stalling a website launch because service descriptions and page copy are not yet organized',
      'Slow concepting cycles when exploring visual directions for campaigns or landing pages',
      'Generic, unedited AI content that lacks human polish, brand accuracy, or technical verification',
    ],
    deliverables: [
      'AI-accelerated full-stack development using Cursor, Claude, Gemini, and ChatGPT with strict human QA',
      'Structured website content outlines, service copy refinement, and FAQ organization',
      'Rapid interactive full-stack prototypes built in React/Next.js or WordPress/PHP and refined for production',
      'Custom SEO & structured-data preparation workflows (inspired by PakSEO AI)',
      'Thorough human quality control, security verification, and brand customization on every deliverable',
    ],
    capabilities: [
      'AI-assisted full-stack engineering (Cursor, Claude, Gemini, ChatGPT)',
      'AI-assisted content preparation & organization',
      'Creative concept & moodboard ideation',
      'AI-assisted prototyping & production builds',
      'SEO metadata & schema preparation workflows',
      'Practical digital productivity workflows',
    ],
    processSteps: [
      {
        step: '01',
        title: 'Gather Your Raw Inputs',
        description:
          'You share your rough notes, business goals, existing brochures, or product details—no polished draft required.',
      },
      {
        step: '02',
        title: 'AI-Accelerated Architecture & Ideation',
        description:
          'I leverage Cursor, Claude, Gemini, and ChatGPT alongside custom engineering workflows to structure architecture, solve edge-case logic, and draft clear options rapidly.',
      },
      {
        step: '03',
        title: 'Human Customization & Quality Control',
        description:
          'Every piece of text, visual asset, and interface component is edited, verified for accuracy, and tailored to your brand.',
      },
    ],
    faqs: [
      {
        question: 'Do you just hand over raw AI-generated text or images?',
        answer:
          'Never. AI is used strictly to speed up brainstorming, structuring, and prototyping. Every final deliverable goes through hands-on editing, design refinement, and technical quality control.',
      },
      {
        question: 'Can you help organize the text for my new website if I only have rough notes?',
        answer:
          'Yes. Many business owners know their services well but do not have time to write full website pages. I can turn your rough points into clear, customer-friendly website sections for your approval.',
      },
    ],
    previewImage: '/images/v5/service-ai-workflow.jpg',
    isSampleVisual: true,
    sampleLabel: 'Original Studio Workflow Visualization',
    accentColor: '#059669',
    whatsappMessage:
      "Hello Abdul Hameed, I'm interested in AI-assisted digital solutions and web workflows.",
    ctaHeading: 'Want to accelerate your website content, visuals, or prototype?',
    relatedProjectSlugs: ['pakseo-ai', 'filecompresser', 'boxpad-chat-dashboard'],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'shawn-salon',
    index: '01',
    slug: 'shawn-salon',
    title: 'Shawn Salon & Aesthetics',
    shortTitle: 'Shawn Salon',
    industry: 'Beauty, Hair & Aesthetics Studio · Lahore',
    tagline:
      'A polished WordPress website for a luxury salon in Gulberg III, Lahore—designed to showcase treatments and drive mobile appointment enquiries.',
    clientSummary:
      'Modern salon website presenting hair, colour, styling, and aesthetic services with effortless mobile booking.',
    subtitle: 'Editorial Service Discovery, Mobile Booking Flows & Local Technical SEO',
    category: 'Business Websites',
    filterTags: ['Business Websites', 'WordPress Solutions'],
    isClientWork: true,
    featured: true,
    year: '2026',
    role: 'Full-Stack Web Developer (End-to-End Architecture & Delivery)',
    clientOrContext: 'Shawn Salon & Aesthetics (MM Alam Road, Gulberg III, Lahore)',
    ownershipLabel: 'Client Production Website · End-to-End Build',
    primaryActionLabel: 'Visit Live Website (shawnsalon.com)',
    primaryActionUrl: 'https://shawnsalon.com',
    personalBuildScope: [
      'Designed and built the responsive WordPress layout and 4-category treatment menu structure',
      'Engineered 2-tap mobile appointment enquiry flows accessible from every service section',
      'Configured local and technical SEO metadata targeting Gulberg III, Lahore',
      'Optimized high-resolution salon media for 390px mobile, 768px tablet, and 1440px desktop viewports',
    ],
    liveUrl: 'https://shawnsalon.com',
    embedAllowed: true,
    desktopScreenshot: '/screenshots/shawn-desktop.png',
    mobileScreenshot: '/screenshots/shawn-mobile.png',
    previewImage: '/screenshots/shawn-desktop.png',
    accentColor: '#E04F33',
    businessOverview:
      'Shawn Salon & Aesthetics is a premier hair, colour, styling, and aesthetics studio located on MM Alam Road in Gulberg III, Lahore.',
    objective:
      'Create an inviting, high-end digital presence that helps clients explore salon treatments on their phones and request appointments without friction.',
    whatIDelivered:
      'Designed and built a custom-styled, mobile-responsive WordPress website with clear treatment categories, prominent appointment CTAs, fast media loading, and local search optimization for Lahore.',
    keyFeaturesPlain: [
      'Clear, easy-to-browse menus for hair colour, styling, nail artistry, and aesthetics',
      'Mobile-friendly appointment enquiry buttons accessible from every section',
      'Local SEO setup helping clients in Gulberg III, Lahore discover the studio',
      'Fast, responsive layout across phones, tablets, and desktop screens',
      'Measurable Impact: Streamlined treatment discovery into a 2-tap mobile appointment journey across 4 core studio categories',
    ],
    summary:
      'Designed and built a high-conversion WordPress digital flagship for a luxury hair, colour, and aesthetics studio in Gulberg III, Lahore—pairing editorial visual storytelling with mobile-first appointment enquiry flows.',
    problem:
      'Clients searching for hair colour, styling, nail artistry, and aesthetic treatments in Lahore needed an effortless mobile and desktop experience to explore services and book studio visits.',
    approach:
      'Engineered a custom-styled WordPress frontend with fluid typography, scannable service menus, fast asset delivery, and structured local SEO metadata.',
    outcome:
      'Launched shawnsalon.com with full cross-device responsiveness across 390px mobile, 768px tablet, and 1440px desktop viewports—and live interactive embedding inside this portfolio.',
    techStack: [
      'WordPress',
      'PHP',
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive UI',
      'Technical & Local SEO',
    ],
    technicalHighlights: [
      'Supports full live interactive iframe preview across Desktop (1440px), Tablet (768px), and Mobile (390px) viewports.',
      'Structured semantic heading hierarchy and local search metadata targeting Gulberg III, Lahore.',
      'Streamlined mobile service discovery and appointment request flows.',
      'Optimized media loading and layout stability for fast mobile browsing.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Presenting a comprehensive menu of hair, colour, styling, and aesthetics treatments without cluttering mobile screens.',
        solution:
          'Organized offerings into scannable editorial sections with clear visual breathing room and persistent appointment CTAs.',
      },
      {
        challenge: 'Standing out in competitive local search results for Lahore beauty studios.',
        solution:
          'Implemented clean canonical structure, location-specific metadata, and fast page rendering.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Visit Shawn Salon Live Website',
        url: 'https://shawnsalon.com',
        description: 'Explore the live production website for Shawn Salon & Aesthetics.',
      },
    ],
    architectureNotes: [
      'Live HTTP Status: 200 OK (https://shawnsalon.com)',
      'Interactive Iframe Embedding: Enabled across 1440px, 768px, and 390px viewports',
    ],
  },
  {
    id: 'tjs-studysteps',
    index: '02',
    slug: 'tjs-studysteps',
    title: 'TJS StudySteps Education Portal',
    shortTitle: 'TJS StudySteps',
    industry: 'International Higher Education Consultancy',
    tagline:
      'An interactive university admissions portal allowing students to filter Malaysian programmes, compare courses side-by-side, download PDFs, and book advisor calls.',
    clientSummary:
      'Searchable university course directory with custom side-by-side comparison and timezone-aware consultation booking.',
    subtitle:
      'Malaysian Higher Education Directory, Course Comparator Pro & Consultation Booking Pro',
    category: 'WordPress Solutions',
    filterTags: ['Business Websites', 'WordPress Solutions'],
    isClientWork: true,
    featured: true,
    year: '2026',
    role: 'Full-Stack Web Developer & Plugin Architect',
    clientOrContext: 'TJS StudySteps (International Education Consultancy)',
    ownershipLabel: 'Client Platform + 2 Custom WordPress Plugins',
    primaryActionLabel: 'Visit Main Portal (tjsstudysteps.com)',
    primaryActionUrl: 'https://tjsstudysteps.com',
    relatedCaseStudySlugs: ['course-comparator-pro', 'consultation-booking-pro'],
    personalBuildScope: [
      'Engineered the TJS StudySteps admissions portal and searchable Malaysian university directory (/courses/) across frontend UI and backend PHP/MySQL',
      'Authored Course Comparator Pro in PHP for side-by-side programme comparison and server-side PDF export',
      'Authored Consultation Booking Pro in PHP for Asia/Singapore timezone slot resolution and Google Calendar sync',
      'Connected JetEngine Custom Post Types and MySQL taxonomy queries to responsive AJAX filtering',
    ],
    liveUrl: 'https://tjsstudysteps.com',
    githubUrl: 'https://github.com/abdulhameed-developer/course-comparator-pro',
    secondaryGithubUrl: 'https://github.com/abdulhameed-developer/consultation-booking-pro',
    secondaryGithubLabel: 'Consultation Booking Pro Source',
    embedAllowed: false,
    blockingHeader: 'Origin sets X-Frame-Options: SAMEORIGIN',
    desktopScreenshot: '/screenshots/tjs-home-desktop.png',
    mobileScreenshot: '/screenshots/tjs-mobile.png',
    previewImage: '/screenshots/tjs-home-desktop.png',
    accentColor: '#0D9488',
    businessOverview:
      'TJS StudySteps is an international education consultancy helping students discover, compare, and apply to Malaysian universities.',
    objective:
      'Make it simple for prospective students and parents to search hundreds of university courses, compare tuition fees and intakes side by side, and schedule a consultation with an education advisor.',
    whatIDelivered:
      'Customized the WordPress course directory and developed two custom plugins specifically for the platform: a side-by-side Course Comparator with downloadable PDF summaries, and a Consultation Booking system synced with advisor availability.',
    keyFeaturesPlain: [
      'Searchable directory of Malaysian university courses filterable by level and university',
      'Side-by-side course comparison table for tuition fees, duration, location, and intakes',
      'One-click downloadable PDF comparison sheet for students and parents to review offline',
      'Online consultation booking form displaying available advisor time slots automatically',
      'Measurable Impact: Powered by 2 custom production WordPress plugins eliminating manual email back-and-forth for international student advising',
    ],
    summary:
      'Engineered custom WordPress plugins and dynamic JetEngine directory workflows enabling international students to filter Malaysian university programmes, compare tuition and intakes side-by-side, export server-generated PDFs, and schedule advisor consultations.',
    problem:
      'Prospective international students needed a unified platform to filter university programmes across qualification levels and tuition fees, compare options side by side, and book advisor sessions across international timezones.',
    approach:
      'Built and deployed two custom PHP WordPress plugins on the live site: Course Comparator Pro with JetEngine taxonomy mapping and server-side PDF export, and Consultation Booking Pro with Asia/Singapore timezone slot resolution and Google Calendar integration.',
    outcome:
      'Delivered a seamless discovery-to-consultation workflow on tjsstudysteps.com backed by modular, open-source documented plugin architecture.',
    techStack: [
      'WordPress',
      'PHP',
      'MySQL',
      'JetEngine Taxonomies',
      'WordPress REST API',
      'AJAX',
      'Google Calendar API',
      'Server-Side PDF Generation',
    ],
    technicalHighlights: [
      'Built an AJAX-driven administrator mapping interface in Course Comparator Pro binding custom JetEngine taxonomy fields to comparison tables.',
      'Implemented server-side PDF generation for side-by-side university, qualification, duration, intake, and tuition fee comparisons.',
      'Architected Consultation Booking Pro with dynamic appointment slot resolution in the Asia/Singapore timezone and Google Calendar sync.',
      'Connected Custom Post Types and MySQL taxonomy queries to responsive JavaScript filtering and pagination.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Mapping diverse custom metadata fields across hundreds of university programmes.',
        solution:
          'Created a configurable taxonomy-mapping layer inside Course Comparator Pro so administrators can map JetEngine meta keys dynamically.',
      },
      {
        challenge:
          'Eliminating timezone confusion for students booking advisor calls from South Asia and the Middle East.',
        solution:
          'Built dynamic date-change slot resolution in Consultation Booking Pro that displays verified availability in the consultancy’s operating timezone.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Main Consultancy Portal (tjsstudysteps.com)',
        url: 'https://tjsstudysteps.com',
        description: 'Primary TJS StudySteps admissions, university partners, and scholarship portal.',
      },
      {
        label: 'Live Course Directory & Comparator (/courses/)',
        url: 'https://tjsstudysteps.com/courses/',
        description:
          'Browse Malaysian university programmes and test side-by-side course comparison.',
      },
      {
        label: 'Live Consultation Booking (/book-consultation-form/)',
        url: 'https://tjsstudysteps.com/book-consultation-form/',
        description:
          'Interactive advisor scheduling form powered by Consultation Booking Pro.',
      },
    ],
    architectureNotes: [
      'Plugin 1: wp-content/plugins/course-comparator-pro/ (GPL)',
      'Plugin 2: wp-content/plugins/consultation-booking-pro/ (Custom PHP)',
    ],
  },
  {
    id: 'kamdani-by-rana',
    index: '03',
    slug: 'kamdani-by-rana',
    title: 'Kamdani by Rana',
    shortTitle: 'Kamdani by Rana',
    industry: 'Luxury Bridal & Heritage Fashion · Shopify Store',
    tagline:
      'An elegant Shopify online store for a heritage Pakistani bridal and hand-embroidered couture house established in 1992.',
    clientSummary:
      'Luxury Shopify storefront showcasing artisanal bridal couture and formal collections for local and international buyers.',
    subtitle:
      'Shopify Liquid Customization, Editorial Lookbooks & International Couture Merchandising',
    category: 'Online Stores',
    filterTags: ['Online Stores', 'Business Websites'],
    isClientWork: true,
    featured: true,
    year: '2026',
    role: 'Full-Stack Web & E-Commerce Developer',
    clientOrContext: 'Kamdani by Rana (Heritage Couture House, Est. 1992)',
    ownershipLabel: 'Client Shopify E-Commerce Storefront',
    primaryActionLabel: 'Visit Live Storefront (kamdanibyrana.com)',
    primaryActionUrl: 'https://kamdanibyrana.com',
    personalBuildScope: [
      'Customized Shopify Liquid templates and editorial lookbook sections for heritage bridal couture',
      'Refined mobile product galleries and variant presentation for intricate Zardozi and Kamdani embroidery',
      'Organized collection navigation across Bridal, Luxury Pret, Sarees, and Heritage lines for global buyers',
    ],
    liveUrl: 'https://kamdanibyrana.com',
    embedAllowed: false,
    blockingHeader: 'Shopify storefront sets X-Frame-Options: DENY',
    desktopScreenshot: '/screenshots/kamdani-desktop.png',
    mobileScreenshot: '/screenshots/kamdani-mobile.png',
    previewImage: '/screenshots/kamdani-desktop.png',
    accentColor: '#D97706',
    businessOverview:
      'Established in 1992, Kamdani by Rana is a heritage Pakistani luxury fashion house celebrated for hand-embroidered Kamdani, Gota, Banarasi, and Chikankari bridal and formal wear.',
    objective:
      'Present high-value artisanal bridal wear with the visual elegance of a luxury boutique while making collection browsing smooth on mobile and desktop.',
    whatIDelivered:
      'Customized the Shopify storefront templates, collection layouts, and mobile product galleries so intricate embroidery details shine without slowing down the store.',
    keyFeaturesPlain: [
      'Editorial homepage and lookbook sections highlighting bridal and formal collections',
      'High-resolution product galleries tuned for viewing fine embroidery on phones',
      'Clear navigation across Bridal, Luxury Pret, Sarees, and Heritage collections',
      'Smooth shopping experience for both domestic and international diaspora clients',
      'Measurable Impact: Digitized 30+ years of heritage bridal couture (Est. 1992) into a mobile-first Shopify storefront for global buyers',
    ],
    summary:
      'Customized the Shopify e-commerce experience for Kamdani by Rana—a heritage Pakistani luxury fashion brand established in 1992 specializing in hand-embroidered Kamdani, Gota, Banarasi, and Chikankari bridal couture.',
    problem:
      'High-value artisanal bridal lehengas, sarees, and formal ensembles require an elevated visual presentation that showcases intricate metallic threadwork while guiding international buyers smoothly through collections.',
    approach:
      'Tailored Shopify Liquid templates, collection grids, and responsive product galleries using custom CSS and JavaScript to highlight craftsmanship and streamline mobile browsing.',
    outcome:
      'Delivered a refined production storefront at kamdanibyrana.com serving domestic and international clients.',
    techStack: [
      'Shopify',
      'Liquid Templates',
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive E-Commerce UI',
      'Technical SEO',
    ],
    technicalHighlights: [
      'Customized Shopify collection and product showcase templates for high-resolution bridal photography.',
      'Refined mobile navigation and lookbook grids for diaspora and local luxury shoppers.',
      'Balanced rich visual media with responsive image sizing for smooth page transitions.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Preserving fine textile detail in product galleries without slowing down mobile load times.',
        solution:
          'Configured responsive image delivery and structured collection layouts optimized for mobile viewports.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Visit Kamdani by Rana Storefront',
        url: 'https://kamdanibyrana.com',
        description: 'Explore the live Shopify luxury bridal and couture storefront.',
      },
    ],
    architectureNotes: [
      'Live Storefront: https://kamdanibyrana.com (HTTP 200 OK)',
      'Platform: Shopify Liquid Custom Theme Architecture',
    ],
  },
  {
    id: 'mustafai-help-mission',
    index: '04',
    slug: 'mustafai-help-mission',
    title: 'Mustafai Help Mission',
    shortTitle: 'Mustafai Mission',
    industry: 'Non-Profit & Community Organization',
    tagline:
      'An accessible WordPress platform presenting education, peacebuilding, and environmental community programmes clearly to donors and volunteers.',
    clientSummary:
      'Trustworthy organization website structured around community programmes, impact updates, and mobile accessibility.',
    subtitle: 'WordPress Content Architecture, Custom Post Structures & Accessible UI',
    category: 'Business Websites',
    filterTags: ['Business Websites', 'WordPress Solutions'],
    isClientWork: true,
    featured: true,
    year: '2026',
    role: 'Full-Stack Web Developer',
    clientOrContext: 'Mustafai Help Mission (Non-Profit & Community Initiative)',
    ownershipLabel: 'Client Organization Website',
    primaryActionLabel: 'Visit Live Website (mustafaihelpmission.com)',
    primaryActionUrl: 'https://mustafaihelpmission.com/home/',
    personalBuildScope: [
      'Built and customized the responsive WordPress website around 3 core mission pillars (Education, Peacebuilding, Environment)',
      'Designed accessible editorial typography and mobile-first navigation for donors and volunteers',
      'Structured clean WordPress backend publishing workflows for community programme updates',
    ],
    liveUrl: 'https://mustafaihelpmission.com/home/',
    embedAllowed: true,
    desktopScreenshot: '/screenshots/mustafai-desktop.png',
    mobileScreenshot: '/screenshots/mustafai-mobile.png',
    previewImage: '/screenshots/mustafai-desktop.png',
    accentColor: '#059669',
    businessOverview:
      'Mustafai Help Mission is a community and humanitarian organization focused on education, peacebuilding, and environmental resilience.',
    objective:
      'Provide a clear, trustworthy website where supporters, volunteers, and community members can learn about active programmes and get involved.',
    whatIDelivered:
      'Built and customized a clean, mobile-friendly WordPress website with organized programme sections, readable typography, and straightforward navigation.',
    keyFeaturesPlain: [
      'Dedicated programme sections for Education, Peacebuilding, and Environment',
      'Clean, trustworthy reading experience across mobile phones and desktops',
      'Easy-to-update WordPress backend for publishing new community initiatives',
      'Measurable Impact: Organizes 3 core humanitarian pillars into an accessible, donor-ready WordPress platform',
    ],
    summary:
      'Built and customized the WordPress digital platform for Mustafai Help Mission, organizing community programmes across education, peacebuilding, and environmental resilience into an accessible, mobile-responsive publication.',
    problem:
      'The organization needed a clear, trustworthy web presence to communicate humanitarian campaigns and environmental initiatives to volunteers, donors, and community members.',
    approach:
      'Implemented a structured WordPress layout system with clear programme pillars, readable editorial typography, and responsive navigation across mobile and desktop devices.',
    outcome:
      'Launched the live multi-pillar WordPress platform at mustafaihelpmission.com/home/ serving supporters, volunteers, and community programmes.',
    techStack: [
      'WordPress',
      'PHP',
      'MySQL',
      'HTML',
      'CSS',
      'JavaScript',
      'Responsive UI',
    ],
    technicalHighlights: [
      'Live responsive WordPress platform across desktop (1440px), tablet (768px), and mobile (390px) viewports.',
      'Clear thematic organization for Education, Peacebuilding, and Environmental Resilience programmes.',
      'Lightweight, accessible layout optimized for mobile visitors.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Presenting diverse community initiatives under a unified, easy-to-navigate hierarchy.',
        solution:
          'Structured the homepage and navigation around core mission pillars with direct programme summaries.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Visit Mustafai Help Mission Live Website',
        url: 'https://mustafaihelpmission.com/home/',
        description:
          'Explore the live Mustafai Help Mission community and humanitarian website.',
      },
    ],
    architectureNotes: [
      'Live Website: https://mustafaihelpmission.com/home/ (HTTP 200 OK)',
      'Platform: Custom WordPress Content & Programme Architecture',
    ],
  },
  {
    id: 'pakseo-ai',
    index: '05',
    slug: 'pakseo-ai',
    title: 'PakSEO AI — SEO & Schema Toolkit',
    shortTitle: 'PakSEO AI',
    industry: 'SEO & Digital Marketing Web App',
    tagline:
      'A specialized web application for keyword research, meta tag preparation, and generating valid Schema.org structured data.',
    clientSummary:
      'Interactive SEO workbench helping marketers and website owners prepare search metadata and structured data.',
    subtitle: 'React, TypeScript, Tailwind CSS & Structured Data Engineering on Vercel',
    category: 'Web Applications',
    filterTags: ['Web Applications', 'Tools & Experiments'],
    isClientWork: false,
    featured: true,
    year: '2026',
    role: 'Creator & Full-Stack Web Developer',
    clientOrContext: 'Independent Open-Source Web App (Deployed on Vercel)',
    ownershipLabel: 'Independent Open-Source Web App',
    primaryActionLabel: 'Launch Live Web App (pakseo-ai.vercel.app)',
    primaryActionUrl: 'https://pakseo-ai.vercel.app',
    personalBuildScope: [
      'Conceived, designed, and engineered the complete React + TypeScript + Tailwind CSS application',
      'Built the interactive JSON-LD Schema Studio generating valid LocalBusiness, Product, FAQ, and Article markup',
      'Developed the keyword intent and metadata preparation workspaces and deployed live on Vercel',
    ],
    liveUrl: 'https://pakseo-ai.vercel.app',
    githubUrl: 'https://github.com/abdulhameed-developer/pakseo-ai',
    embedAllowed: true,
    desktopScreenshot: '/screenshots/pakseo-desktop.png',
    mobileScreenshot: '/screenshots/pakseo-mobile.png',
    previewImage: '/screenshots/pakseo-desktop.png',
    accentColor: '#2563EB',
    businessOverview:
      'PakSEO AI is a web-based SEO toolkit built to simplify keyword discovery, metadata preparation, and structured data generation for businesses and marketers.',
    objective:
      'Replace scattered SEO utilities with one clean, fast workspace where users can prepare page metadata and Schema.org markup without writing code by hand.',
    whatIDelivered:
      'Designed and engineered a full React + TypeScript web application featuring a visual Schema Studio, keyword research view, and content optimizer—deployed live on Vercel.',
    keyFeaturesPlain: [
      'Visual Schema Studio that generates search-engine structured data for Local Businesses, Products, and FAQs',
      'Keyword and search-intent workspace tailored for regional and international campaigns',
      'Clean light/dark interface that works smoothly on both desktop and mobile browsers',
      'Measurable Impact: Consolidates 4 separate SEO & JSON-LD schema workflows into a single zero-setup browser workspace',
    ],
    summary:
      'Built and deployed a specialized React and TypeScript SEO toolkit tailored for the Pakistani market, combining long-tail keyword research, meta tag generation, an interactive JSON-LD Schema Studio, and content optimization.',
    problem:
      'Marketers and developers frequently switch between fragmented utilities to generate valid Schema.org JSON-LD markup, craft meta tags, and structure search-intent-driven content.',
    approach:
      'Architected a unified React + TypeScript application using Vite, Tailwind CSS, and Framer Motion around a typed service layer and modular tool workspaces.',
    outcome:
      'Deployed live on Vercel (pakseo-ai.vercel.app) with full open-source code on GitHub and live in-page interactive preview support.',
    techStack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'JSON-LD Schema Studio',
      'Vercel',
    ],
    technicalHighlights: [
      'Interactive JSON-LD Schema Studio generating valid structured data for Articles, FAQs, Products, and Local Businesses.',
      'Centralized TypeScript interfaces, global theme context, and modular tool routing.',
      'Fully interactive inside this portfolio’s live multi-device preview studio.',
    ],
    challengesAndSolutions: [
      {
        challenge: 'Keeping multi-field schema generators clean and intuitive on smaller screens.',
        solution:
          'Split each workflow into focused workspace views with real-time JSON-LD output validation.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Launch PakSEO AI Live App',
        url: 'https://pakseo-ai.vercel.app',
        description: 'Open the live Vercel deployment of PakSEO AI.',
      },
      {
        label: 'View GitHub Repository',
        url: 'https://github.com/abdulhameed-developer/pakseo-ai',
        description: 'Inspect the React + TypeScript source code on GitHub.',
      },
    ],
    architectureNotes: [
      'Live Deployment: https://pakseo-ai.vercel.app (HTTP 200 OK)',
      'Source: github.com/abdulhameed-developer/pakseo-ai',
    ],
  },
  {
    id: 'boxpad-chat-dashboard',
    index: '06',
    slug: 'boxpad-chat-dashboard',
    title: 'BOXpad — Customer Inbox Workspace',
    shortTitle: 'BOXpad Dashboard',
    industry: 'SaaS & Customer Support Interface',
    tagline:
      'A four-column customer messaging and support dashboard built in Next.js that adapts cleanly for mobile teams.',
    clientSummary:
      'Modern multi-pane customer support inbox and CRM contact workspace built with Next.js and TypeScript.',
    subtitle: 'Next.js App Router, React Context State & Multi-Pane UI Architecture',
    category: 'Web Applications',
    filterTags: ['Web Applications'],
    isClientWork: false,
    featured: true,
    year: '2026',
    role: 'Full-Stack Web Developer',
    clientOrContext: 'Next.js Customer Support Workspace & CRM Inbox (Vercel)',
    ownershipLabel: 'Full-Stack Next.js Workspace Build',
    primaryActionLabel: 'Launch Live Dashboard (Vercel)',
    primaryActionUrl: 'https://my-frontend-assessment.vercel.app',
    personalBuildScope: [
      'Architected the 4-column desktop inbox workspace (Sidebar, Chat Queue, Thread View, CRM Contact Panel) in Next.js App Router',
      'Built responsive pane collapsing and bottom navigation for single-hand 390px mobile usability',
      'Implemented interactive message replies, emoji reactions, contact labels, and internal notes using React Context and TypeScript',
    ],
    liveUrl: 'https://my-frontend-assessment.vercel.app',
    githubUrl: 'https://github.com/abdulhameed-developer/frontend-assessment',
    embedAllowed: true,
    desktopScreenshot: '/screenshots/boxpad-desktop.png',
    mobileScreenshot: '/screenshots/boxpad-mobile.png',
    previewImage: '/screenshots/boxpad-desktop.png',
    accentColor: '#4F46E5',
    businessOverview:
      'BOXpad is a modern customer messaging and team inbox application designed for support teams managing multiple conversations and customer records.',
    objective:
      'Give support agents a single screen on desktop to view channels, conversation lists, active messages, and customer details—while keeping the app usable on phones.',
    whatIDelivered:
      'Built a responsive Next.js & TypeScript web application with a 4-column desktop layout, interactive message replies and reactions, contact notes, and a mobile bottom-navigation layout.',
    keyFeaturesPlain: [
      'Four-panel desktop workspace showing inbox channels, chat queue, active conversation, and customer profile',
      'Interactive message replies, emoji reactions, contact labels, and internal team notes',
      'Dedicated mobile layout so team members can respond to customers on the go',
      'Measurable Impact: Adapts a 4-column enterprise desktop inbox (1440px) seamlessly down to a single-hand 390px mobile workflow',
    ],
    summary:
      'Engineered a production-style four-column messaging and customer support dashboard using Next.js App Router, React, TypeScript, and Tailwind CSS that adapts into a touch-friendly mobile workspace.',
    problem:
      'Enterprise messaging tools must display inbox channels, conversation queues, active chat threads, and CRM contact details simultaneously on desktop without breaking usability on mobile phones.',
    approach:
      'Designed a four-column desktop architecture (260px Inbox Sidebar, 320px Chat List, flexible Chat Window, 280px Contact Details Panel) backed by React Context state and typed REST API services.',
    outcome:
      'Deployed on Vercel (my-frontend-assessment.vercel.app) with message reactions, inline replies, contact tagging, and full source code on GitHub.',
    techStack: [
      'Next.js (App Router)',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'React Context API',
      'Framer Motion',
      'REST APIs',
      'Vercel',
    ],
    technicalHighlights: [
      'Four-column desktop layout transitioning cleanly into a full-screen mobile chat interface with bottom navigation.',
      'Interactive message reactions, reply/edit/delete workflows, contact blocking, labels, and internal CRM notes.',
      'Centralized TypeScript service layer integrating REST endpoints.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Preventing layout cramping when switching between 4 panes on tablet and mobile widths.',
        solution:
          'Implemented responsive pane collapsing and dedicated mobile navigation bars.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Launch BOXpad Live Dashboard',
        url: 'https://my-frontend-assessment.vercel.app',
        description: 'Interact with the live Next.js dashboard on Vercel.',
      },
      {
        label: 'View GitHub Repository',
        url: 'https://github.com/abdulhameed-developer/frontend-assessment',
        description: 'Browse the Next.js App Router source code.',
      },
    ],
    architectureNotes: [
      'Live Deployment: https://my-frontend-assessment.vercel.app (HTTP 200 OK)',
      'Source: github.com/abdulhameed-developer/frontend-assessment',
    ],
  },
  {
    id: 'filecompresser',
    index: '07',
    slug: 'filecompresser',
    title: 'FileCompresser — Privacy-First Media Suite',
    shortTitle: 'FileCompresser',
    industry: 'Web Application & Media Optimization Tool',
    tagline:
      'A privacy-first web application that compresses images, videos, audio, PDFs, and archives directly inside the browser without uploading files to a server.',
    clientSummary:
      '13-tool browser media compression suite built in Next.js for shrinking images, videos, and PDFs privately.',
    subtitle:
      'Next.js App Router, Web Workers, Magic-Byte Security & 6-Stage Playwright QA',
    category: 'Tools & Experiments',
    filterTags: ['Web Applications', 'Tools & Experiments'],
    isClientWork: false,
    featured: true,
    year: '2026',
    role: 'Creator & Full-Stack Web Developer',
    clientOrContext: 'Live Browser Media Suite (filecompresser.com & Open Source)',
    ownershipLabel: 'Live WebAssembly Suite (filecompresser.com)',
    primaryActionLabel: 'Launch Live Web App (filecompresser.com)',
    primaryActionUrl: 'https://filecompresser.com',
    personalBuildScope: [
      'Architected and launched filecompresser.com with 13 client-side media compression routes in Next.js App Router using FFmpeg WebAssembly and Web Workers',
      'Built deterministic batch queue concurrency (useFileQueue.ts) and magic-byte + zip-bomb validation (lib/validation.ts)',
      'Authored the 6-stage automated Playwright QA suite verifying 10 viewports × 12 routes and real codec output',
    ],
    liveUrl: 'https://filecompresser.com',
    githubUrl: 'https://github.com/abdulhameed-developer/filecompresser',
    embedAllowed: true,
    desktopScreenshot: '/screenshots/filecompresser-desktop.png',
    mobileScreenshot: '/screenshots/filecompresser-mobile.png',
    previewImage: '/screenshots/filecompresser-desktop.png',
    accentColor: '#0284C7',
    businessOverview:
      'FileCompresser (filecompresser.com) is a live suite of 13 specialized media optimization tools allowing users to shrink large images, videos, GIFs, audio files, PDFs, and ZIP archives for faster websites and easier sharing.',
    objective:
      'Allow businesses and creators to compress sensitive files rapidly in their browser with 100% privacy—never uploading documents or media to an external cloud server.',
    whatIDelivered:
      'Architected and deployed the complete Next.js application at filecompresser.com powered by in-browser WebAssembly and background workers, verified by an automated 6-stage browser testing suite.',
    keyFeaturesPlain: [
      '100% private in-browser compression at filecompresser.com—files never leave the user’s computer or phone',
      '13 dedicated tools covering PNG, JPG, WebP, MP4 video, GIF, MP3 audio, PDF, and ZIP files',
      'Batch queue processing up to 500 files / 300 MB per queue with clear before-and-after size savings',
      'Measurable Impact: 0 bytes uploaded to external servers, live at filecompresser.com and backed by 6 automated Playwright QA suites',
    ],
    summary:
      'Architected and launched filecompresser.com—a 100% client-side file compression suite in Next.js and TypeScript using lazy-loaded FFmpeg WebAssembly, Web Worker image encoders, magic-byte validation, and a 6-script Playwright verification pipeline.',
    problem:
      'Conventional online compressors upload sensitive user files to remote servers. Running heavy video, GIF, audio, PDF, and image compression entirely inside the browser requires strict memory and concurrency control.',
    approach:
      'Built 13 dedicated tool routes driven by a single-source-of-truth registry (`lib/tools.ts`), a deterministic batch queue (`useFileQueue.ts`), magic-byte + zip-bomb protection (`lib/validation.ts`), and automated browser QA audits (`scripts/verify.sh`).',
    outcome:
      'Launched live in production at filecompresser.com with full Next.js source code, Vitest unit suite, and Playwright verification tooling on GitHub.',
    techStack: [
      'Next.js (App Router)',
      'TypeScript',
      'FFmpeg WebAssembly',
      'Web Workers',
      'Magic-Byte Validation',
      'Vitest',
      'Playwright QA',
    ],
    technicalHighlights: [
      'Live at filecompresser.com with full interactive multi-device preview across Desktop (1440px), Tablet (768px), and Mobile (390px) viewports.',
      'Zero server upload endpoints: all media encoding executes inside the user’s browser via WASM and Web Workers.',
      '13 specialized compression routes (/image-compressor, /video-compressor, /gif-compressor, /mp3-compressor, /pdf-compressor, /zip-compressor).',
      'Bounded queue concurrency (2 parallel workers for images; 1 serialized worker for FFmpeg, PDF, and ZIP).',
      '6 automated Playwright audit scripts verifying 10 viewport widths × 12 routes, keyboard accessibility, and real codec output.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Preventing browser tab crashes during multi-file video and GIF transcoding.',
        solution:
          'Implemented a lazy, memoized FFmpeg WASM core loader and serialized heavy codec jobs through a deterministic queue.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'Launch FileCompresser Live App (filecompresser.com)',
        url: 'https://filecompresser.com',
        description:
          'Compress images, videos, audio, GIFs, PDFs, and ZIP archives privately in your browser.',
      },
      {
        label: 'Explore FileCompresser on GitHub',
        url: 'https://github.com/abdulhameed-developer/filecompresser',
        description:
          'Inspect the Next.js App Router source, WASM engines, and verify.sh QA scripts.',
      },
    ],
    architectureNotes: [
      'Live Deployment: https://filecompresser.com (HTTP 200 OK)',
      'Repository: github.com/abdulhameed-developer/filecompresser',
      'QA Pipeline: route-crawl, navigation-audit, responsive-audit, role-audit, a11y-manual-audit, functionality-audit',
    ],
  },
  {
    id: 'course-comparator-pro',
    index: '08',
    slug: 'course-comparator-pro',
    title: 'Course Comparator Pro (WordPress Plugin)',
    shortTitle: 'Course Comparator Pro',
    industry: 'Custom WordPress Plugin · Education Directories',
    tagline:
      'A custom WordPress plugin that lets visitors compare university courses side-by-side and download a clean PDF summary.',
    clientSummary:
      'Custom WordPress plugin turning course listings into interactive side-by-side comparison tables with PDF export.',
    subtitle: 'Modular PHP Plugin Architecture, AJAX Taxonomy Mapping & PDF Generation',
    category: 'WordPress Solutions',
    filterTags: ['WordPress Solutions', 'Tools & Experiments'],
    isClientWork: false,
    featured: false,
    year: '2026',
    role: 'Plugin Author & Full-Stack Web Developer',
    clientOrContext: 'Custom WordPress Plugin (Production on TJS StudySteps & Open Source)',
    ownershipLabel: 'Custom WordPress Plugin (Production & Open Source)',
    primaryActionLabel: 'Test Live on TJS Course Directory (/courses/)',
    primaryActionUrl: 'https://tjsstudysteps.com/courses/',
    relatedCaseStudySlugs: ['tjs-studysteps', 'consultation-booking-pro'],
    personalBuildScope: [
      'Authored the standalone GPL WordPress plugin in PHP for education directories',
      'Built the AJAX admin taxonomy-mapping interface binding JetEngine custom fields to comparison rows',
      'Implemented the interactive frontend comparison drawer and server-side PDF summary generator',
    ],
    liveUrl: 'https://tjsstudysteps.com/courses/',
    githubUrl: 'https://github.com/abdulhameed-developer/course-comparator-pro',
    embedAllowed: false,
    blockingHeader: 'Deployed on tjsstudysteps.com/courses/ (X-Frame-Options: SAMEORIGIN)',
    desktopScreenshot: '/screenshots/tjs-courses-desktop.png',
    mobileScreenshot: '/screenshots/tjs-mobile.png',
    previewImage: '/screenshots/tjs-courses-desktop.png',
    accentColor: '#E04F33',
    businessOverview:
      'Course Comparator Pro is a custom WordPress plugin built for education portals and directory websites where visitors need to compare multiple options before inquiring.',
    objective:
      'Give prospective students an intuitive way to select multiple courses, compare key facts side by side, and save a branded PDF copy.',
    whatIDelivered:
      'Developed and published a standalone WordPress plugin with an easy admin mapping screen, an interactive frontend comparison drawer, and server-side PDF export.',
    keyFeaturesPlain: [
      'Interactive "Compare" buttons that work smoothly with WordPress directory listings',
      'Side-by-side comparison of universities, qualification levels, durations, intakes, and tuition fees',
      'Instant downloadable PDF comparison sheet for offline decision-making',
      'Admin settings screen allowing site owners to choose which fields appear in the table',
      'Measurable Impact: Enables side-by-side comparison across academic attributes with instant server-generated PDF export',
    ],
    summary:
      'Authored a standalone GPL WordPress plugin that maps custom JetEngine taxonomy metadata into interactive side-by-side course comparisons and generates downloadable comparison PDFs on the server.',
    problem:
      'Standard WordPress directory plugins lack dynamic taxonomy-to-comparison-table mapping and clean server-side PDF export for multi-attribute educational programmes.',
    approach:
      'Built an AJAX-powered administrator settings screen for mapping JetEngine taxonomies and a frontend comparison drawer paired with server-side PDF rendering.',
    outcome:
      'Deployed and verified in production on tjsstudysteps.com/courses/ and published openly on GitHub.',
    techStack: [
      'WordPress Plugin API',
      'PHP',
      'JetEngine Taxonomies',
      'AJAX',
      'Server-Side PDF Generation',
      'JavaScript',
    ],
    technicalHighlights: [
      'AJAX-driven admin configuration for binding custom taxonomy fields to comparison rows.',
      'Side-by-side comparison of universities, qualifications, locations, durations, intakes, and tuition fees.',
      'Server-side PDF generation for offline student review.',
    ],
    challengesAndSolutions: [
      {
        challenge:
          'Keeping comparison tables aligned across courses with varying custom field sets.',
        solution:
          'Normalized taxonomy field resolution on the server before rendering both HTML and PDF views.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'View Live Plugin on TJS StudySteps',
        url: 'https://tjsstudysteps.com/courses/',
        description: 'Select courses on the live directory to test side-by-side comparison.',
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/abdulhameed-developer/course-comparator-pro',
        description: 'Inspect the PHP plugin source code and installation guide.',
      },
    ],
    architectureNotes: [
      'Plugin Path: wp-content/plugins/course-comparator-pro/',
      'License: Open-Source GPL · Production Verified',
    ],
  },
  {
    id: 'consultation-booking-pro',
    index: '09',
    slug: 'consultation-booking-pro',
    title: 'Consultation Booking Pro (WordPress Plugin)',
    shortTitle: 'Consultation Booking Pro',
    industry: 'Custom WordPress Plugin · Appointment Scheduling',
    tagline:
      'A custom WordPress appointment-booking plugin with timezone-aware time slots and Google Calendar integration.',
    clientSummary:
      'Custom WordPress booking plugin making it easy for clients to schedule consultations synced with Google Calendar.',
    subtitle: 'WordPress & PHP Appointment Scheduling Plugin',
    category: 'WordPress Solutions',
    filterTags: ['WordPress Solutions', 'Tools & Experiments'],
    isClientWork: false,
    featured: false,
    year: '2026',
    role: 'Plugin Author & Full-Stack Web Developer',
    clientOrContext: 'Custom WordPress Plugin (Production on TJS StudySteps & Open Source)',
    ownershipLabel: 'Custom WordPress Plugin (Production & Open Source)',
    primaryActionLabel: 'View Live Booking Form (/book-consultation-form/)',
    primaryActionUrl: 'https://tjsstudysteps.com/book-consultation-form/',
    relatedCaseStudySlugs: ['tjs-studysteps', 'course-comparator-pro'],
    personalBuildScope: [
      'Authored the modular WordPress / PHP appointment-booking plugin',
      'Engineered dynamic date-based time-slot resolution in the Asia/Singapore timezone',
      'Integrated Google Calendar appointment syncing and structured PHP class/template separation',
    ],
    liveUrl: 'https://tjsstudysteps.com/book-consultation-form/',
    githubUrl: 'https://github.com/abdulhameed-developer/consultation-booking-pro',
    embedAllowed: false,
    blockingHeader:
      'Deployed on tjsstudysteps.com/book-consultation-form/ (X-Frame-Options: SAMEORIGIN)',
    desktopScreenshot: '/screenshots/tjs-booking-desktop.png',
    mobileScreenshot: '/screenshots/tjs-mobile.png',
    previewImage: '/screenshots/tjs-booking-desktop.png',
    accentColor: '#059669',
    businessOverview:
      'Consultation Booking Pro is a custom WordPress plugin built for consultancies, agencies, and service providers who schedule client appointments online.',
    objective:
      'Let prospective clients pick a date, see real available consultation times in the business’s timezone, and book a session without back-and-forth emails.',
    whatIDelivered:
      'Engineered a clean PHP WordPress plugin that dynamically loads available time slots when a visitor selects a date and syncs appointments with Google Calendar.',
    keyFeaturesPlain: [
      'Clean, step-by-step consultation booking form embedded directly into WordPress pages',
      'Automatic time-slot loading when a visitor picks a preferred date',
      'Clear timezone handling (Asia/Singapore) to prevent missed international calls',
      'Google Calendar integration so staff schedules stay synchronized',
      'Measurable Impact: Automates cross-timezone appointment slot resolution and Google Calendar syncing in WordPress & PHP',
    ],
    summary:
      'Engineered a modular WordPress appointment-booking plugin in PHP that resolves available advisor time slots in the Asia/Singapore timezone and integrates with Google Calendar.',
    problem:
      'International education consultancies need a reliable native WordPress booking workflow that dynamically loads available appointment times by date and synchronizes bookings with Google Calendar.',
    approach:
      'Structured the plugin with clean separation between `consultation-booking-pro.php`, `src/` PHP classes, `templates/`, `form-files/`, and frontend `assets/`.',
    outcome:
      'Deployed live on tjsstudysteps.com/book-consultation-form/ and published on GitHub.',
    techStack: [
      'WordPress',
      'PHP',
      'Google Calendar API',
      'AJAX Slot Resolution',
      'JavaScript',
      'HTML / CSS',
    ],
    technicalHighlights: [
      'Dynamic date-change listener loading available appointment times in the Asia/Singapore timezone.',
      'Clean separation of PHP business logic (`src/`), form templates (`form-files/`), and frontend assets.',
      'Required contact validation and explicit user consent handling.',
    ],
    challengesAndSolutions: [
      {
        challenge: 'Preventing double-booked consultation slots across timezones.',
        solution:
          'Implemented dynamic date-based slot lookups synchronized against calendar availability.',
      },
    ],
    verifiedRoutes: [
      {
        label: 'View Live Booking Form',
        url: 'https://tjsstudysteps.com/book-consultation-form/',
        description: 'Inspect the live consultation form deployed on TJS StudySteps.',
      },
      {
        label: 'GitHub Repository',
        url: 'https://github.com/abdulhameed-developer/consultation-booking-pro',
        description: 'Browse the modular PHP plugin source on GitHub.',
      },
    ],
    architectureNotes: [
      'Plugin Path: wp-content/plugins/consultation-booking-pro/',
      'Architecture: Modular WordPress & PHP · Production Verified',
    ],
  },
];

export const PLAYGROUND_EXPERIMENTS: ExperimentItem[] = [
  {
    id: 'weather-app',
    index: 'LAB.01',
    title: 'Atmosphere — Live Weather Forecast App',
    category: 'Live Web Apps',
    type: 'Interactive GitHub Pages Web App',
    language: 'JavaScript · REST API · CSS',
    description:
      'Live meteorological forecast utility fetching real-time city temperature, humidity, and wind conditions with instant in-page preview.',
    technicalDetail:
      'Asynchronous fetch pipeline with error states and responsive card presentation.',
    previewImage: '/screenshots/weather-desktop.png',
    liveUrl: 'https://abdulhameed-developer.github.io/weather-app/',
    githubUrl: 'https://github.com/abdulhameed-developer/weather-app',
    embedAllowed: true,
    verifiedDate: 'Oct 2025',
  },
  {
    id: 'todo-app',
    index: 'LAB.02',
    title: 'TaskFlow — Interactive Workflow Manager',
    category: 'Live Web Apps',
    type: 'Interactive GitHub Pages Web App',
    language: 'JavaScript · HTML · CSS',
    description:
      'Fast client-side task manager supporting instant task creation, completion toggling, filtering, and persistent state—playable directly in the browser.',
    technicalDetail:
      'Zero-dependency DOM state synchronization with keyboard-accessible task entry.',
    previewImage: '/screenshots/todo-desktop.png',
    liveUrl: 'https://abdulhameed-developer.github.io/Todo-App/',
    githubUrl: 'https://github.com/abdulhameed-developer/Todo-App',
    embedAllowed: true,
    verifiedDate: 'Oct 2025',
  },
  {
    id: 'scientific-calculator',
    index: 'LAB.03',
    title: 'Scientific Calculator — JOINUS JS-82MS-5 Replica',
    category: 'Live Web Apps',
    type: 'Interactive GitHub Pages Web App',
    language: 'JavaScript · HTML · CSS',
    description:
      'Interactive browser replica of the JOINUS JS-82MS-5 scientific calculator with dual-line LCD expression display, trigonometric functions, logarithms, factorials, and SHIFT/ALPHA modes.',
    technicalDetail:
      'Engineered with a zero-dependency JavaScript expression evaluator, tactile hardware key layout, and live GitHub Pages deployment.',
    previewImage: '/screenshots/scientific-calculator-desktop.png',
    liveUrl:
      'https://abdulhameed-developer.github.io/Scientific-Calculator/scientific_calculator.html',
    githubUrl: 'https://github.com/abdulhameed-developer/Scientific-Calculator',
    embedAllowed: true,
    verifiedDate: 'Oct 2025',
  },
  {
    id: 'wp-core-trac-66548',
    index: 'LAB.04',
    title: 'WordPress Core Trac #66548 — Guarded Plugin Deactivation (Open Proposal)',
    category: 'WordPress & PHP',
    type: 'Submitted WordPress Core Enhancement Proposal',
    language: 'PHP · WordPress Core',
    description:
      'Open enhancement proposal submitted under @codian on WordPress Core Trac: proposes checking site health after plugin deactivation and rolling back activation state if a fatal error is confirmed.',
    technicalDetail:
      'Open ticket proposing a loopback safeguard against white-screen fatal errors when deactivating a plugin that other active plugins depend upon.',
    previewImage: '/screenshots/wp-trac-66548-desktop.png',
    liveUrl: 'https://core.trac.wordpress.org/ticket/66548',
    githubUrl: 'https://profiles.wordpress.org/codian/',
    embedAllowed: false,
    verifiedDate: 'Open Proposal',
  },
  {
    id: 'my-secure-plugin',
    index: 'LAB.05',
    title: 'My Secure Plugin — WordPress Security Skeleton',
    category: 'WordPress & PHP',
    type: 'WordPress Plugin Blueprint',
    language: 'PHP · WordPress Settings API',
    description:
      'Security-first WordPress plugin starter implementing Settings API options, capability checks, CSRF nonces, input sanitization, and escaped [msp_message] shortcode output.',
    technicalDetail:
      'Demonstrates ABSPATH guards, manage_options checks, settings_fields(), sanitize_text_field(), and esc_html().',
    previewImage: '/screenshots/my-secure-plugin-desktop.png',
    githubUrl: 'https://github.com/abdulhameed-developer/my-secure-plugin',
    embedAllowed: false,
    verifiedDate: 'Oct 2025',
  },
  {
    id: 'currency-converter',
    index: 'LAB.06',
    title: 'React Multi-Currency Exchange Calculator',
    category: 'React Utilities',
    type: 'React + Vite Application',
    language: 'React · JavaScript · Vite',
    description:
      'Component-driven exchange rate calculator built with React and Vite for instant multi-currency conversions and base-currency swapping.',
    technicalDetail:
      'Uses custom React hooks for rate fetching and controlled inputs for zero-latency recalculation.',
    previewImage: '/screenshots/currency-converter-desktop.png',
    githubUrl: 'https://github.com/abdulhameed-developer/currency-converter',
    embedAllowed: false,
    verifiedDate: 'Oct 2025',
  },
  {
    id: 'word-counter-app',
    index: 'LAB.07',
    title: 'Editorial Word & Character Analytics',
    category: 'React Utilities',
    type: 'React + Vite Application',
    language: 'React · JavaScript · Vite',
    description:
      'Real-time text analysis workspace built in React, Vite, and Tailwind CSS providing instant word count, character metrics, sentence count, and reading-time estimation.',
    technicalDetail:
      'Includes uppercase/lowercase transforms, extra-space cleanup, clipboard copy, and dark/light theme support.',
    previewImage: '/screenshots/word-counter-desktop.png',
    githubUrl: 'https://github.com/abdulhameed-developer/word-counter-app',
    embedAllowed: false,
    verifiedDate: 'Oct 2025',
  },
  {
    id: 'filecompresser-live',
    index: 'LAB.08',
    title: 'FileCompresser — Browser Media Compression Suite',
    category: 'Live Web Apps',
    type: 'Live Next.js + WebAssembly App',
    language: 'Next.js · TypeScript · WebAssembly',
    description:
      '13-tool browser media compression suite at filecompresser.com for shrinking images, video, audio, GIFs, PDFs, and ZIP archives privately on your device.',
    technicalDetail:
      '100% client-side FFmpeg WASM and Web Worker encoders with deterministic queue concurrency and magic-byte validation.',
    previewImage: '/screenshots/filecompresser-desktop.png',
    liveUrl: 'https://filecompresser.com',
    embedUrl: '/api/embed/filecompresser',
    githubUrl: 'https://github.com/abdulhameed-developer/filecompresser',
    embedAllowed: true,
    verifiedDate: 'Live Production',
  },
];

export const EXPERTISE_DOMAINS: ExpertiseDomain[] = [
  {
    id: 'wordpress-plugin-engineering',
    index: '01',
    title: 'Custom WordPress Websites, Plugins & Directories',
    subtitle: 'PHP, MySQL, Custom Post Types, JetEngine & REST API',
    businessValue:
      'Turns standard WordPress websites into tailored business platforms with searchable directories, comparison tools, and automated booking workflows.',
    summary:
      'I build modular WordPress plugins and custom content structures that connect MySQL queries and third-party APIs to clean, responsive frontends.',
    deliverables: [
      'Custom WordPress plugins with separated PHP classes, templates, and AJAX endpoints',
      'Searchable, filterable JetEngine & Custom Post Type directories with instant pagination',
      'External API integrations (Google Calendar scheduling, REST APIs, server-side PDF export)',
      'Security-hardened Settings API screens with nonces, capability checks, and escaping',
    ],
    technologies: ['WordPress', 'PHP', 'MySQL', 'WordPress REST API', 'JetEngine', 'AJAX'],
    relatedProjects: [
      {
        title: 'TJS StudySteps Portal',
        slug: 'tjs-studysteps',
        image: '/screenshots/tjs-home-desktop.png',
      },
      {
        title: 'Course Comparator Pro',
        slug: 'course-comparator-pro',
        image: '/screenshots/tjs-courses-desktop.png',
      },
      {
        title: 'Consultation Booking Pro',
        slug: 'consultation-booking-pro',
        image: '/screenshots/tjs-booking-desktop.png',
      },
    ],
    architecturalProof:
      'Shipped Course Comparator Pro and Consultation Booking Pro to production on tjsstudysteps.com, and authored WordPress Core Trac proposal #66548.',
  },
  {
    id: 'react-nextjs-frontend',
    index: '02',
    title: 'React, Next.js & TypeScript Web Applications',
    subtitle: 'App Router Architecture, Interactive Dashboards & In-Browser Processing',
    businessValue:
      'Delivers fast, modern web applications and multi-column workspaces that feel smooth on both desktop monitors and mobile phones.',
    summary:
      'I engineer modern React and Next.js applications with clean component hierarchies, predictable state management, and purposeful GSAP animations.',
    deliverables: [
      'Next.js App Router multipage applications with dynamic routes and server/client composition',
      'Multi-column SaaS workspaces and messaging dashboards with mobile bottom-nav adaptation',
      'In-browser WebAssembly (FFmpeg WASM) and Web Worker processing pipelines',
      'GSAP ScrollTrigger, horizontal carousels, and reduced-motion-compliant interactions',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'WebAssembly'],
    relatedProjects: [
      {
        title: 'PakSEO AI Toolkit',
        slug: 'pakseo-ai',
        image: '/screenshots/pakseo-desktop.png',
      },
      {
        title: 'BOXpad Inbox Dashboard',
        slug: 'boxpad-chat-dashboard',
        image: '/screenshots/boxpad-desktop.png',
      },
      {
        title: 'FileCompresser WASM Suite',
        slug: 'filecompresser',
        image: '/screenshots/filecompresser-desktop.png',
      },
    ],
    architecturalProof:
      'Built PakSEO AI, BOXpad, and FileCompresser (live at filecompresser.com with a 13-route WebAssembly architecture and 6-stage Playwright verification suite).',
  },
  {
    id: 'shopify-ecommerce-ui',
    index: '03',
    title: 'Shopify Customization & Responsive Frontend UI',
    subtitle: 'Liquid Templates, E-Commerce Merchandising & Cross-Device Craft',
    businessValue:
      'Elevates brand trust and mobile shopping ease for online stores and service businesses through thoughtful visual presentation.',
    summary:
      'I customize Shopify themes and responsive web interfaces that pair editorial lookbooks with dependable usability from 320px phones to 1920px monitors.',
    deliverables: [
      'Custom Shopify Liquid templates, collection grids, and bridal/luxury lookbook layouts',
      'Pixel-accurate HTML, CSS, Tailwind CSS, and Bootstrap frontend builds',
      'Mobile-first navigation drawers, touch-friendly controls, and fluid typography',
      'Cross-viewport testing across 320px, 390px, 768px, 1024px, and 1440px+ screens',
    ],
    technologies: ['Shopify', 'Liquid', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Bootstrap'],
    relatedProjects: [
      {
        title: 'Kamdani by Rana',
        slug: 'kamdani-by-rana',
        image: '/screenshots/kamdani-desktop.png',
      },
      {
        title: 'Shawn Salon & Aesthetics',
        slug: 'shawn-salon',
        image: '/screenshots/shawn-desktop.png',
      },
    ],
    architecturalProof:
      'Customized the live Shopify storefront for Kamdani by Rana (Est. 1992) and the digital flagship for Shawn Salon & Aesthetics in Gulberg III, Lahore.',
  },
  {
    id: 'technical-seo-performance',
    index: '04',
    title: 'Technical SEO, Structured Data & Web Performance',
    subtitle: 'Schema.org JSON-LD, Page Speed & Search Readiness',
    businessValue:
      'Helps search engines understand your pages clearly while giving human visitors a faster, smoother browsing experience.',
    summary:
      'I integrate technical SEO, semantic HTML landmarks, Schema.org JSON-LD markup, and asset optimization directly into the build process.',
    deliverables: [
      'Schema.org JSON-LD generators and page-level structured data (Article, FAQ, Product, LocalBusiness)',
      'Canonical URLs, XML sitemaps, robots.txt, and Open Graph social cards',
      'Image optimization, lazy-loaded media/iframes, and layout stability (low CLS)',
      'Git/GitHub version control and pre-deployment browser QA audits',
    ],
    technologies: ['Technical SEO', 'Schema.org JSON-LD', 'Core Web Vitals', 'Git & GitHub', 'Vercel'],
    relatedProjects: [
      {
        title: 'PakSEO AI Toolkit',
        slug: 'pakseo-ai',
        image: '/screenshots/pakseo-desktop.png',
      },
      {
        title: 'Mustafai Help Mission',
        slug: 'mustafai-help-mission',
        image: '/screenshots/mustafai-desktop.png',
      },
    ],
    architecturalProof:
      'Created the PakSEO AI Schema Studio and automated route/canonical/a11y audit scripts in FileCompresser.',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Understand',
    subtitle: 'Goals, Audience & Scope',
    description:
      'We clarify what your business offers, who your customers are, and what features or pages will make the biggest difference.',
    artifacts: ['Project Scope', 'Page & Feature Plan', 'SEO Baseline'],
  },
  {
    step: '02',
    title: 'Structure',
    subtitle: 'Page Hierarchy & User Flow',
    description:
      'I organize your navigation, content flow, and enquiry touchpoints so visitors can find what they need in seconds.',
    artifacts: ['Sitemap & Layout Plan', 'Content Hierarchy', 'Component Structure'],
  },
  {
    step: '03',
    title: 'Design',
    subtitle: 'Visual Polish & Brand Presentation',
    description:
      'I craft a clean, modern layout with strong typography, authentic visuals, and smooth interactive transitions.',
    artifacts: ['Responsive Visual System', 'Interactive Motion', 'Accessible Contrast'],
  },
  {
    step: '04',
    title: 'Develop',
    subtitle: 'WordPress, Shopify or Next.js Build',
    description:
      'Your project is built with clean, maintainable code—whether customizing WordPress/Shopify or engineering a React/Next.js application.',
    artifacts: ['Modular Source Code', 'Custom Features', 'Mobile-First UI'],
  },
  {
    step: '05',
    title: 'Verify',
    subtitle: 'Multi-Device & Speed Testing',
    description:
      'Every page and enquiry button is tested across phone, tablet, and desktop screens to ensure zero layout glitches.',
    artifacts: ['Mobile & Desktop QA', 'Speed & SEO Check', 'Form Verification'],
  },
  {
    step: '06',
    title: 'Launch',
    subtitle: 'Smooth Handover & Support',
    description:
      'We launch your website cleanly and make sure you know how to manage your content, products, or enquiries.',
    artifacts: ['Live Deployment', 'Search Readiness', 'Owner Handover'],
  },
];

export function filterProjectsByCategory(
  projects: ProjectItem[],
  category: ProjectCategory | string,
  searchQuery = ''
): ProjectItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'All Projects' || category === 'All'
        ? true
        : category === 'Client Work'
          ? project.isClientWork
          : project.category === category ||
            project.filterTags.includes(category as Exclude<ProjectCategory, 'All Projects'>);

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      project.title,
      project.industry,
      project.tagline,
      project.clientSummary,
      project.subtitle,
      project.category,
      project.clientOrContext,
      ...project.techStack,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getFeaturedProjects(): ProjectItem[] {
  return FEATURED_PROJECTS.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return FEATURED_PROJECTS.find((p) => p.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export interface EndorsementItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
  projectSlug?: string;
}

export const CLIENT_ENDORSEMENTS: EndorsementItem[] = [
  {
    id: 'education-portal-delivery',
    quote:
      'Shipped two custom PHP WordPress plugins (Course Comparator Pro & Consultation Booking Pro) to production—enabling side-by-side programme comparison across key academic attributes, server-side PDF export, and Asia/Singapore timezone booking.',
    author: 'Verified Production Delivery Summary',
    role: 'TJS StudySteps Higher Education Portal (tjsstudysteps.com)',
    context: 'Client Platform + 2 Open-Source WordPress Plugins',
    projectSlug: 'tjs-studysteps',
  },
  {
    id: 'luxury-salon-digital-flagship',
    quote:
      'Designed and launched the responsive WordPress flagship for Gulberg III, Lahore—structuring hair, colour, nail artistry, and aesthetics menus into a 2-tap mobile appointment journey backed by local technical SEO.',
    author: 'Verified Production Delivery Summary',
    role: 'Shawn Salon & Aesthetics (shawnsalon.com)',
    context: 'Client Flagship Website · WordPress & Local SEO',
    projectSlug: 'shawn-salon',
  },
  {
    id: 'ecommerce-couture-storefront',
    quote:
      'Tailored Shopify Liquid templates, editorial lookbook sections, and mobile-first product galleries to showcase 30+ years of hand-embroidered Kamdani and bridal couture (Est. 1992) for domestic and international buyers.',
    author: 'Verified Production Delivery Summary',
    role: 'Kamdani by Rana (kamdanibyrana.com)',
    context: 'Client Shopify E-Commerce Storefront',
    projectSlug: 'kamdani-by-rana',
  },
];

export interface GeneralFaqItem {
  question: string;
  answer: string;
}

export const GENERAL_SERVICES_FAQS: GeneralFaqItem[] = [
  {
    question: 'Do you work with international clients outside Pakistan?',
    answer:
      'Yes. While I am based in Lahore, Pakistan (PKT / UTC+5), I work remotely with business owners, agencies, and teams internationally—communicating clearly via email, WhatsApp, and scheduled video calls.',
  },
  {
    question:
      'Can you improve, fix, or customize my existing WordPress or Shopify website, or do you only build from scratch?',
    answer:
      'Both. I frequently step into existing WordPress websites and Shopify stores to build custom plugins, redesign key pages, fix mobile layout or speed bottlenecks, and add new booking or directory features without disrupting live traffic.',
  },
  {
    question: 'Which platform should I choose: WordPress, Shopify, or React / Next.js?',
    answer:
      'WordPress is ideal for service businesses, content-rich portals, and custom directories; Shopify is best for dedicated product e-commerce; and React / Next.js is ideal for custom web applications, interactive dashboards, and high-speed bespoke experiences.',
  },
  {
    question: 'Will I be able to update text, images, and products myself after launch?',
    answer:
      'Absolutely. Every website and custom plugin I build is structured with clean admin settings and straightforward editing controls so you or your team can update content without touching code.',
  },
  {
    question: 'How do project timelines, revisions, and post-launch support work?',
    answer:
      'Before starting, we agree on a clear scope and milestone schedule. You review progress on a live preview link with structured revision rounds, and I remain available after launch for ongoing updates, maintenance, or new features.',
  },
];

