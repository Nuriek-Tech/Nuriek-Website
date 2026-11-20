export const SITE = {
  email: 'hello@nuriek.com',
  parent: 'https://www.nuriek.com',
};

export const services = [
  { id: 'strategy', n: '01', title: 'AI Strategy & Digital Transformation', featured: true,
    summary: 'A clear view of where AI pays off in your business, and a plan to get there.',
    items: ['AI readiness assessments', 'Opportunity discovery', 'Maturity evaluations', 'Transformation roadmaps', 'Business case and ROI modeling', 'AI operating models', 'Executive advisory'] },
  { id: 'agents', n: '02', title: 'Agentic AI & Intelligent Automation', featured: true,
    summary: 'Agents that do real work inside your systems, with people approving what matters.',
    items: ['Task agents', 'Multi-agent orchestration', 'Workflow agents', 'Human approval systems', 'CRM and ERP integrations', 'Intelligent document processing', 'Business process automation'] },
  { id: 'genai', n: '03', title: 'Generative AI & LLM Engineering', featured: true,
    summary: 'Assistants and search that answer from your own knowledge, and can prove it.',
    items: ['Enterprise AI assistants', 'RAG systems', 'Semantic search', 'Model evaluation', 'Fine-tuning where justified', 'Knowledge assistants', 'Voice and multimodal AI', 'Custom GenAI applications'] },
  { id: 'data', n: '04', title: 'Data Engineering & AI-Ready Architecture',
    summary: 'The data foundations that AI depends on.',
    items: ['Data platform modernization', 'ETL / ELT pipelines', 'Data lakes and warehouses', 'Vector databases', 'Data quality', 'Analytics engineering', 'Enterprise data integration'] },
  { id: 'cloud', n: '05', title: 'Cloud & Application Modernization', featured: true,
    summary: 'Move legacy systems onto platforms that AI can actually plug into.',
    items: ['Azure, GCP and AWS architecture', 'Legacy application modernization', 'Cloud migration', 'API modernization', 'Microservices', 'DevOps and platform engineering', 'AI-enabled modernization'] },
  { id: 'ml', n: '06', title: 'Machine Learning & Predictive Analytics',
    summary: 'Models that support decisions, built on your data.',
    items: ['Demand forecasting', 'Anomaly detection', 'Classification', 'Recommendation engines', 'Churn prediction', 'Customer segmentation', 'Predictive maintenance'] },
  { id: 'automation', n: '07', title: 'Enterprise Business Automation',
    summary: 'Fewer manual handoffs across the back office.',
    items: ['Finance, HR and sales workflows', 'Procurement and support', 'Operations and administration', 'API-based orchestration', 'AI-assisted steps', 'RPA where it is the right tool'] },
  { id: 'governance', n: '08', title: 'Responsible AI, Security & Governance',
    summary: 'Controls that let you ship AI without losing sleep.',
    items: ['AI policies', 'Privacy by design', 'Model risk assessment', 'Prompt-injection testing', 'Access control', 'Data protection', 'Audit trails and human oversight', 'Governance frameworks'] },
  { id: 'product', n: '09', title: 'Custom Software & AI Product Engineering',
    summary: 'Software built end to end, with AI as part of the design.',
    items: ['AI-native SaaS products', 'Web and mobile applications', 'API development', 'Product architecture', 'UX engineering', 'Enterprise applications'] },
  { id: 'ops', n: '10', title: 'MLOps, LLMOps & Managed AI Services',
    summary: 'Keeping AI reliable after launch.',
    items: ['Deployment pipelines', 'Evaluations', 'Observability', 'Model monitoring and drift detection', 'Cost optimization', 'Incident response', 'Managed operations'] },
  { id: 'enablement', n: '11', title: 'AI Workforce Enablement & Change Management',
    summary: 'Helping teams actually use what gets built.',
    items: ['Executive workshops', 'AI training', 'Developer enablement', 'Adoption programs', 'Workflow redesign', 'AI champions programs', 'Productivity measurement'] },
  { id: 'teams', n: '12', title: 'Dedicated AI Engineering Teams',
    summary: 'Senior engineers embedded with your team, with delivery governance.',
    items: ['Fractional AI architects', 'Dedicated engineering pods', 'AI product squads', 'Platform engineers', 'Project delivery teams', 'Staff augmentation'] },
];

export const packages = [
  { name: 'AI Opportunity Assessment', duration: '1–2 weeks', price: '$2,500–$5,000', blurb: 'Where AI fits, what it would take, and what to do first.' },
  { name: 'AI Strategy & Roadmap', duration: '3–4 weeks', price: '$7,500–$15,000', blurb: 'Prioritized use cases, target architecture and a sequenced plan.' },
  { name: 'AI Agent / Automation Pilot', duration: '4–6 weeks', price: '$10,000–$25,000', blurb: 'One working workflow, measured against agreed criteria.' },
  { name: 'Enterprise AI Implementation', duration: '8–16 weeks', price: '$30,000–$100,000+', blurb: 'Production build, integration, security review and rollout.' },
  { name: 'AI Transformation Program', duration: '3–12 months', price: 'Custom', blurb: 'A multi-workstream program across several teams.' },
  { name: 'Managed AI Operations', duration: 'Monthly', price: '$2,000–$10,000+', blurb: 'Monitoring, support and continuous improvement after launch.' },
];
export const pricingNote = 'Indicative ranges. Final pricing depends on scope, complexity, security requirements and staffing.';

export const journey = [
  { n: '01', name: 'Discover', text: 'Business challenges, current technology and objectives.' },
  { n: '02', name: 'Assess', text: 'AI readiness, process analysis, feasibility and ROI.' },
  { n: '03', name: 'Strategize', text: 'Prioritized use cases, roadmap and architecture.' },
  { n: '04', name: 'Prototype', text: 'A working proof of concept with evaluation criteria.' },
  { n: '05', name: 'Engineer', text: 'Build the solution and integrate enterprise systems.' },
  { n: '06', name: 'Deploy', text: 'Security validation, testing, rollout and adoption.' },
  { n: '07', name: 'Operate', text: 'Monitoring, support, governance and optimization.' },
];

export const industries = [
  { id: 'financial-services', video: 48976, name: 'Financial Services', img: '/photos/industry-financial-services.jpg',
    text: 'Document intelligence, reporting automation, fraud analytics and customer service support.',
    intro: 'Banks, lenders, insurers and fintechs run on documents, checks and reports. AI can take on the reading and reconciling, while people keep the decisions.',
    challenges: ['High volumes of loan, KYC and claims documents', 'Manual month-end reporting and reconciliation', 'Rising fraud patterns that rules miss', 'Contact centres answering the same questions'],
    useCases: ['Document extraction for loans, KYC and claims', 'Automated regulatory and management reporting', 'Fraud and anomaly detection on transactions', 'Customer service assistants grounded in policy'],
    services: ['agents', 'genai', 'ml', 'governance'],
    note: 'Work is scoped around your compliance and model-risk requirements.' },
  { id: 'healthcare', video: 4766, name: 'Healthcare', img: '/photos/industry-healthcare.jpg',
    text: 'Administrative workflow automation, document processing and staff knowledge systems, subject to compliance readiness.',
    intro: 'Clinical staff lose hours to paperwork. We focus on the administrative side first, where AI can return time to care without touching clinical judgement.',
    challenges: ['Prior authorisations and referrals handled by hand', 'Scheduling and intake bottlenecks', 'Policies and procedures that are hard to find', 'Billing and coding back-and-forth'],
    useCases: ['Intake, referral and prior-authorisation document processing', 'Scheduling and front-desk workflow automation', 'Staff knowledge assistant over policies and SOPs', 'Billing exception triage with human review'],
    services: ['automation', 'genai', 'data', 'governance'],
    note: 'Subject to compliance readiness. Nothing touches patient data before a privacy and security review.' },
  { id: 'retail', video: 15914, name: 'Retail & E-commerce', img: '/photos/industry-retail.jpg',
    text: 'Customer support, recommendation systems, inventory analytics and demand forecasting.',
    intro: 'Margins depend on having the right stock and answering customers quickly. AI helps on both, from the warehouse to the chat window.',
    challenges: ['Support queues spike around promotions', 'Stock-outs and overstock at the same time', 'Generic product discovery', 'Catalogue data that is inconsistent'],
    useCases: ['Support assistants for orders, returns and sizing', 'Personalised recommendations', 'Demand forecasting and inventory analytics', 'Product catalogue enrichment and clean-up'],
    services: ['genai', 'ml', 'data', 'agents'],
    note: 'Pilots are usually run on one category or channel first.' },
  { id: 'manufacturing', video: 47258, name: 'Manufacturing', img: '/photos/industry-manufacturing.jpg',
    text: 'Predictive maintenance, quality analytics, inventory optimization and knowledge agents.',
    intro: 'Plants already collect sensor and quality data. AI turns it into earlier warnings and puts decades of engineering know-how at the operator\'s side.',
    challenges: ['Unplanned downtime', 'Defects found late in the line', 'Spare-part and raw-material inventory tied up', 'Expert knowledge held by a few people'],
    useCases: ['Predictive maintenance from sensor data', 'Quality and defect analytics', 'Inventory and spare-parts optimisation', 'Knowledge agent over manuals and maintenance logs'],
    services: ['ml', 'data', 'genai', 'cloud'],
    note: 'We start from the data you already capture before suggesting new sensors.' },
  { id: 'logistics', video: 45848, name: 'Logistics', img: '/photos/industry-logistics.jpg',
    text: 'Shipment exception handling, document extraction, forecasting and operations automation.',
    intro: 'Most of a logistics team\'s day goes to exceptions. Agents can detect, explain and route them, so coordinators deal with the decisions only.',
    challenges: ['Delays and exceptions tracked in email', 'Bills of lading, invoices and customs forms keyed by hand', 'Volume swings that are hard to plan for', 'Customers asking "where is my shipment?"'],
    useCases: ['Shipment exception detection and routing', 'Document extraction for freight and customs paperwork', 'Volume and capacity forecasting', 'Customer status updates automated end to end'],
    services: ['agents', 'automation', 'ml', 'data'],
    note: 'Integrations are built around your TMS, WMS and ERP.' },
  { id: 'technology', video: 242, name: 'Technology & SaaS', img: '/photos/industry-technology.jpg',
    text: 'AI product features, engineering copilots, support agents and platform modernization.',
    intro: 'Software companies need AI in the product and in the way they build it. We work as an extension of your engineering team on both.',
    challenges: ['Customers expecting AI features in the product', 'Support load growing faster than headcount', 'Slow delivery on legacy code', 'Unclear cost and quality of LLM features'],
    useCases: ['AI features designed into your product', 'Support agents connected to docs and tickets', 'Engineering copilot rollout and enablement', 'LLM evaluation, observability and cost control'],
    services: ['product', 'genai', 'ops', 'teams'],
    note: 'Dedicated pods can work inside your sprints and tooling.' },
];

export const solutions = [
  { id: 'document-processing', name: 'Document processing', text: 'Pull structured data out of invoices, contracts, claims and forms, then route exceptions to a person.', tags: ['Finance', 'Operations', 'Legal'] },
  { id: 'customer-support', name: 'Customer support', text: 'Assistants that resolve routine requests from your knowledge base and hand over the rest with context.', tags: ['Support', 'Retail', 'SaaS'] },
  { id: 'sales-and-crm-workflows', name: 'Sales and CRM workflows', text: 'Lead enrichment, call summaries, follow-up drafting and pipeline hygiene inside the CRM you already use.', tags: ['Sales', 'RevOps'] },
  { id: 'finance-operations', name: 'Finance operations', text: 'Reconciliation, close-process checks, reporting automation and variance explanations.', tags: ['Finance'] },
  { id: 'internal-knowledge-assistants', name: 'Internal knowledge assistants', text: 'Search and Q&A across policies, wikis, tickets and shared drives, with sources shown.', tags: ['HR', 'IT', 'Engineering'] },
  { id: 'procurement-and-vendor-workflows', name: 'Procurement and vendor workflows', text: 'Intake, comparison, approvals and contract checks, with an audit trail.', tags: ['Procurement'] },
  { id: 'forecasting-and-anomaly-detection', name: 'Forecasting and anomaly detection', text: 'Demand, inventory and maintenance models that feed the decisions people already make.', tags: ['Supply chain', 'Manufacturing'] },
  { id: 'engineering-productivity', name: 'Engineering productivity', text: 'Code-assistant rollout, test generation, documentation and legacy code understanding.', tags: ['Engineering'] },
];

export const launchFirst = ['agents', 'genai', 'cloud', 'strategy'];

export const faqs = [
  { q: 'Where should we start?', a: 'Most teams begin with a one to two week AI Opportunity Assessment or a scoped pilot. Both give you something concrete to decide on before committing to a larger program.' },
  { q: 'How long does a pilot take?', a: 'An agent or automation pilot typically runs four to six weeks, measured against evaluation criteria we agree on at the start.' },
  { q: 'Do you only build AI agents?', a: 'No. We cover twelve capabilities, from strategy and data engineering to cloud modernization, governance and managed operations. Agents are one of the places engagements often begin.' },
  { q: 'Can you work in regulated industries?', a: 'Yes, subject to compliance readiness. Sectors such as healthcare and financial services need a compliance review before anything touches production data, and we scope the work around that.' },
  { q: 'What happens after launch?', a: 'We can stay on through Managed AI Operations: monitoring, evaluations, drift detection, cost optimization and support, billed monthly.' },
  { q: 'How is pricing decided?', a: 'Scope, complexity, security requirements and staffing set the final price. The ranges on our Services page are a starting guide, not a quote.' },
];

export const serviceGroups = [
  { id: 'advise', name: 'Advise', ids: ['strategy', 'governance', 'enablement'] },
  { id: 'build', name: 'Build', ids: ['agents', 'genai', 'automation', 'product'] },
  { id: 'data-cloud', name: 'Data & Cloud', ids: ['data', 'cloud', 'ml'] },
  { id: 'operate', name: 'Operate', ids: ['ops', 'teams'] },
];
export const groupOf = (id) => serviceGroups.findIndex((g) => g.ids.includes(id));

export const goals = [
  { q: 'Decide where AI fits in our business', id: 'strategy' },
  { q: 'Automate a manual workflow', id: 'agents' },
  { q: 'Answer questions from our own documents', id: 'genai' },
  { q: 'Move off legacy systems', id: 'cloud' },
  { q: 'Make our AI safe and auditable', id: 'governance' },
  { q: 'Keep AI reliable after launch', id: 'ops' },
];
