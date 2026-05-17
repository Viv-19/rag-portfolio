/**
 * Skill categories — zone panels + skills kept inside each zone.
 * Zone height is computed from skill count; labels sit at the top of each box.
 */

const IMAGE_SAFE = { xMin: 41, xMax: 59, yMin: 31, yMax: 69 };
const CENTER = { x: 50, y: 50 };

const ZONE_HEADER = 12;
const ZONE_PAD_BOTTOM = 6;

export const SKILL_CATEGORIES = [
    {
        id: 'prog-genai',
        label: 'Programming & Generative AI',
        color: '#5B8DEF',
        glow: 'rgba(91, 141, 239, 0.55)',
        zone: { x: 2, y: 3, w: 38 },
        cols: 2,
        spacingX: 14,
        spacingY: 7.5,
        skillLabels: [
            'Python',
            'JavaScript',
            'SQL',
            'C++',
            'PyTorch',
            'LangChain',
            'LangGraph',
            'RAG',
            'AI Agents',
            'MCP',
        ],
    },
    {
        id: 'ml',
        label: 'ML & Deep Learning',
        color: '#34D399',
        glow: 'rgba(52, 211, 153, 0.55)',
        zone: { x: 64, y: 3, w: 34 },
        cols: 2,
        spacingX: 15,
        spacingY: 7.5,
        skillLabels: [
            'TensorFlow',
            'scikit-learn',
            'CNN',
            'LSTM',
            'Transformers',
            'ANN',
            'RNN',
        ],
    },
    {
        id: 'fullstack',
        label: 'Backend · Frontend · DB',
        color: '#818CF8',
        glow: 'rgba(129, 140, 248, 0.55)',
        zone: { x: 2, y: 62, w: 36 },
        cols: 3,
        spacingX: 10,
        spacingY: 6.5,
        skillLabels: [
            'FastAPI',
            'Node.js',
            'Express',
            'React',
            'REST API',
            'HTML',
            'CSS',
            'SQL',
            'PostgreSQL',
            'MongoDB',
            'Prisma',
            'MySQL',
        ],
    },
    {
        id: 'cloud',
        label: 'Cloud, DevOps & MLOps',
        color: '#F97316',
        glow: 'rgba(249, 115, 22, 0.55)',
        zone: { x: 62, y: 62, w: 36 },
        cols: 3,
        spacingX: 10,
        spacingY: 6.5,
        skillLabels: [
            'AWS',
            'Docker',
            'Kubernetes',
            'Load Balancers',
            'MLOps Lifecycle',
            'MLflow',
            'GitHub',
            'GGUF · Ollama',
            'CI/CD',
            'GitHub Actions',
        ],
    },
];

/**
 * Adds zone height and positions label + cluster inside the panel.
 */
function resolveCategoryLayout(category) {
    const { zone, cols, skillLabels, spacingX, spacingY } = category;
    const rows = Math.ceil(skillLabels.length / cols);
    const zoneH = ZONE_HEADER + Math.max(0, rows - 1) * spacingY + ZONE_PAD_BOTTOM + 4;

    const clusterX = zone.x + zone.w / 2;
    const clusterY = zone.y + ZONE_HEADER + 2;
    const labelX = zone.x + zone.w / 2;
    const labelY = zone.y + 5;

    return {
        ...category,
        zone: { ...zone, h: zoneH },
        clusterX,
        clusterY,
        labelX,
        labelY,
    };
}

function layoutCluster(category) {
    const { zone, clusterX, clusterY, cols, skillLabels, spacingX, spacingY } = category;

    return skillLabels.map((label, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const colsInRow = Math.min(cols, skillLabels.length - row * cols);
        const offsetX = cols === 1 ? 0 : (col - (colsInRow - 1) / 2) * spacingX;
        const offsetY = row * spacingY;

        let x = clusterX + offsetX;
        let y = clusterY + offsetY;
        ({ x, y } = keepOffCharacter(x, y));
        ({ x, y } = clampToZone(x, y, zone));

        return {
            label,
            x: clamp(x, 3, 97),
            y: clamp(y, 3, 97),
        };
    });
}

function clampToZone(x, y, zone) {
    return {
        x: clamp(x, zone.x + 5, zone.x + zone.w - 5),
        y: clamp(y, zone.y + ZONE_HEADER, zone.y + zone.h - 4),
    };
}

function keepOffCharacter(x, y) {
    const insideX = x > IMAGE_SAFE.xMin && x < IMAGE_SAFE.xMax;
    const insideY = y > IMAGE_SAFE.yMin && y < IMAGE_SAFE.yMax;
    if (!insideX || !insideY) return { x, y };

    const dx = x - CENTER.x;
    const dy = y - CENTER.y;
    const len = Math.hypot(dx, dy) || 1;
    const radius = 26;

    return {
        x: CENTER.x + (dx / len) * radius,
        y: CENTER.y + (dy / len) * radius,
    };
}

export function buildSkillBubbleLayout() {
    const bubbles = [];

    getResolvedCategories().forEach((category) => {
        layoutCluster(category).forEach((skill) => {
            bubbles.push({
                ...skill,
                categoryId: category.id,
                color: category.color,
                glow: category.glow,
            });
        });
    });

    return bubbles;
}

/** Categories with computed zone dimensions for panel rendering */
export function getResolvedCategories() {
    return SKILL_CATEGORIES.map(resolveCategoryLayout);
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
