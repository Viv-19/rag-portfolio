/**
 * Featured projects — plain-language copy; update liveUrl when deployed.
 */
export const GITHUB_PROFILE = 'https://github.com/Viv-19';

export const FEATURED_PROJECTS = [
    {
        id: 'sunaura',
        position: 'top-left',
        title: 'SunAura Group',
        summary:
            'I built and launched a real business website for a client — pages, styling, and live hosting on AWS.',
        detail:
            'SunAura Group needed a professional online presence, not just a template. I designed and built a React website with Tailwind CSS so it looks clean on mobile and desktop. I set up AWS Amplify so the site deploys automatically when code is updated — the client can share sunauragroup.com with customers today. I handled layout, responsive design, and production deployment end to end as a freelance full-stack project.',
        stack: ['React', 'Tailwind CSS', 'AWS Amplify'],
        link: {
            href: 'https://sunauragroup.com',
            label: 'Visit website',
            external: true,
        },
    },
    {
        id: 'academic-sloth',
        position: 'top-right',
        title: 'Academic Sloth',
        summary:
            'A web app that helps students and researchers find papers, upload PDFs, and chat with an AI about what they read.',
        detail:
            'I built the full backend in Node.js with secure login (JWT) so each user has their own workspace. The app searches ArXiv and Semantic Scholar, ranks results by citations, and lets users save papers. For uploaded PDFs, I built a RAG pipeline with LangGraph — the system reads the document, finds the right sections, and answers questions in plain English. Users can chat with one paper or compare ideas across their library. PostgreSQL and Prisma store users, papers, and chat history in a structured way.',
        stack: ['Node.js', 'LangGraph', 'RAG', 'PostgreSQL', 'Prisma'],
        link: {
            href: 'https://github.com/Viv-19/Academic-Sloth',
            label: 'Visit website',
            external: true,
        },
    },
    {
        id: 'vivesh-coder',
        position: 'bottom-left',
        title: 'Vivesh Coder',
        summary:
            'My own AI coding helper — trained on Python examples and run locally with Ollama, so it works offline on a normal laptop.',
        detail:
            'I fine-tuned Meta’s LLaMA 3.2 (3B) model on 19,400+ Python code samples using 4-bit QLoRA so training fits on limited GPU memory. The model reached about 78% token accuracy on held-out code. I merged the adapter weights, compressed the model with GGUF (about 6GB down to ~1.9GB), and packaged it for Ollama. You can run it on a machine with roughly 4GB+ VRAM without sending code to the cloud — useful for learning, interviews, and private projects. This was a full path from training to quantization to local deployment.',
        stack: ['PyTorch', 'PEFT', 'QLoRA', 'Ollama', 'GGUF'],
        link: {
            href: 'https://github.com/Viv-19/personal-ollama-coder',
            label: 'GitHub',
            external: true,
        },
    },
    {
        id: 'job-hunt',
        position: 'bottom-right',
        title: 'AI Job Hunt Assistant',
        summary:
            'An AI assistant that helps with job hunting — finding roles, drafting emails, and tracking applications, with you approving every send.',
        detail:
            'I used n8n to wire together an autonomous agent powered by Groq (Llama 3.3). It can search for jobs, draft outreach emails, suggest calendar slots, and log status in Google Sheets. Gmail, Google Calendar, and OAuth connect the real tools people already use. I built a React dashboard where every AI draft appears for review first — nothing is sent until you click approve, which avoids embarrassing auto-emails. Docker makes the stack easy to run locally or on a small server. The goal was practical automation with a human still in control.',
        stack: ['n8n', 'Groq', 'React', 'Docker', 'OAuth2'],
        link: {
            href: 'https://github.com/Viv-19/n8n-autonomous-ai-job-hunt-assistant-',
            label: 'GitHub',
            external: true,
        },
    },
];
