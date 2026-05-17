/**
 * Editable copy and timing — update here when you change hero text or agent messages.
 */

/** Name variants cycled in the hero glitch effect */
export const NAME_ALIASES = [
    'Vivesh Kumar Singh',
    'वीवेश कुमार सिंह',
];

/** Tech phrases cycled in the hero mission line */
export const TECH_PHRASES = [
    'production-grade AI systems',
    'advanced RAG pipelines',
    'scalable AWS cloud infrastructure',
    'high-performance backend architectures',
];

/** Agent status text per section (keys match section id attributes) */
export const AGENT_STATUS_MESSAGES = {
    skills: 'Scanning capabilities...',
    projects: 'Compiling key builds...',
    experience: 'Verifying experience...',
    contact: 'Agent complete. Ready to connect.',
};

/** Milliseconds to wait after hero load before starting cycles */
export const GLITCH_START_DELAY_MS = 2500;

/** Name glitch interval */
export const NAME_CYCLE_MS = 2000;

/** Tech phrase cycle interval */
export const TECH_CYCLE_MS = 2000;

/** Tech fade transition (must match .tech-highlight CSS) */
export const TECH_FADE_MS = 200;
