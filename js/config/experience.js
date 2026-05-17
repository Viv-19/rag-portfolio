/**
 * Professional experience — update image paths when photos are ready.
 */
export const EXPERIENCES = [
    {
        id: 'tcs',
        role: 'Research Intern',
        company: 'Tata Consultancy Services (TCS)',
        subtitle: 'Intel Collaboration · Research',
        period: 'Dec 2025 — Present',
        location: 'India',
        image: 'assets/experience-tcs.png',
        imageAlt: 'TCS research internship',
        lead: 'Working on Intel-supported research into how stable large language models are during real inference — not just training benchmarks.',
        highlights: [
            'Designed controlled experiments to test numerical robustness in transformer-based models.',
            'Built benchmarking pipelines to measure speed vs. accuracy when execution settings change.',
            'Documented results in structured technical reports for internal and partner review.',
        ],
        tags: ['LLM Research', 'Benchmarking', 'Transformers'],
    },
    {
        id: 'inai',
        role: 'AI Engineer Intern',
        company: 'INAI Worlds',
        subtitle: 'Cloud & Production Systems',
        period: 'Jul 2025 — Nov 2025',
        location: 'Remote',
        image: 'assets/experience-inai.png',
        imageAlt: 'INAI Worlds internship',
        lead: 'Helped design and run production-style cloud infrastructure for AI products — focused on reliability, monitoring, and safe deployments.',
        highlights: [
            'Deployed AWS architecture using EC2, S3, load balancers, security groups, DNS, and database services.',
            'Built a CloudWatch dashboard with alarms (CPU, latency) to keep services highly available.',
            'Worked across networking, storage, and observability so the stack was ready for real users.',
        ],
        tags: ['AWS', 'CloudWatch', 'DevOps'],
    },
];
