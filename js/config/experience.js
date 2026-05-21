/**
 * Professional experience — update image paths when photos are ready.
 */
export const EXPERIENCES = [
    {
        id: 'tcs',
        role: 'Research Intern',
        company: 'Tata Consultancy Services (TCS) – Intel Collaboration',
        logos: [
            'assets/tcs logo.webp',
            'assets/intel logo.webp'
        ],
        subtitle: 'Intel Collaboration · Research',
        period: 'Dec 2025 — Present',
        location: 'India',
        image: 'assets/reading_paper.webp',
        imageAlt: 'TCS research internship',
        lead: 'Worked on an Intel-supported research initiative investigating numerical robustness in LLM inference.',
        highlights: [
            'Designed controlled experimentation pipelines to evaluate stability in transformer-based architectures.',
            'Built benchmarking frameworks to measure performance–accuracy trade-offs under modified numerical execution.',
            'Authored structured technical reports for internal review and industry stakeholders.',
        ],
        tags: ['LLM Research', 'Benchmarking', 'Transformers'],
    },
    {
        id: 'inai',
        role: 'AI Engineer Intern',
        company: 'INAI Worlds',
        logos: [
            'assets/inai logo.webp'
        ],
        subtitle: 'Cloud & Production Systems',
        period: 'Jul 2025 — Nov 2025',
        location: 'Remote',
        image: 'assets/devops.webp',
        imageAlt: 'INAI Worlds internship',
        lead: 'Designed and deployed AWS cloud architecture using EC2, S3, load balancer, security groups, DNS, and database services.',
        highlights: [
            'Built a CloudWatch monitoring dashboard with alarms (CPU > 60%, latency) to ensure high availability.',
        ],
        tags: ['AWS', 'CloudWatch', 'DevOps'],
    },
];
