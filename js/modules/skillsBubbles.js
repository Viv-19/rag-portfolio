/**
 * Renders skill clusters, colored energy lines, and center convergence.
 */

import {
    buildSkillBubbleLayout,
    getResolvedCategories,
} from '../config/skills.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const CENTER = { x: 50, y: 50 };

function buildSvgDefs(svg) {
    const defs = document.createElementNS(SVG_NS, 'defs');
    const filter = document.createElementNS(SVG_NS, 'filter');
    filter.setAttribute('id', 'skillEnergyGlow');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');

    const blur = document.createElementNS(SVG_NS, 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '0.45');
    blur.setAttribute('result', 'blur');

    const merge = document.createElementNS(SVG_NS, 'feMerge');
    const n1 = document.createElementNS(SVG_NS, 'feMergeNode');
    n1.setAttribute('in', 'blur');
    const n2 = document.createElementNS(SVG_NS, 'feMergeNode');
    n2.setAttribute('in', 'SourceGraphic');
    merge.appendChild(n1);
    merge.appendChild(n2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);
}

/**
 * @param {SVGSVGElement} svg
 * @param {ReturnType<typeof buildSkillBubbleLayout>} bubbles
 */
function buildEnergyLines(svg, bubbles) {
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('class', 'skills-energy-group');

    bubbles.forEach((skill, index) => {
        const base = document.createElementNS(SVG_NS, 'line');
        base.setAttribute('x1', String(skill.x));
        base.setAttribute('y1', String(skill.y));
        base.setAttribute('x2', String(CENTER.x));
        base.setAttribute('y2', String(CENTER.y));
        base.setAttribute('class', 'skill-energy-line skill-energy-line--base');
        base.setAttribute('stroke', skill.color);
        base.setAttribute('stroke-opacity', '0.38');

        const flow = document.createElementNS(SVG_NS, 'line');
        flow.setAttribute('x1', String(skill.x));
        flow.setAttribute('y1', String(skill.y));
        flow.setAttribute('x2', String(CENTER.x));
        flow.setAttribute('y2', String(CENTER.y));
        flow.setAttribute('class', 'skill-energy-line skill-energy-line--flow');
        flow.setAttribute('stroke', skill.color);
        flow.style.setProperty('--line-delay', `${(index % 12) * 0.18}s`);
        flow.style.setProperty('--line-duration', `${1.6 + (index % 5) * 0.3}s`);
        flow.style.setProperty('--energy-color', skill.color);
        flow.style.setProperty('--energy-glow', skill.glow);

        group.appendChild(base);
        group.appendChild(flow);
    });

    svg.appendChild(group);
}

function buildCorePulse(svg) {
    const core = document.createElementNS(SVG_NS, 'g');
    core.setAttribute('class', 'skills-core-energy');

    const ring = document.createElementNS(SVG_NS, 'circle');
    ring.setAttribute('cx', String(CENTER.x));
    ring.setAttribute('cy', String(CENTER.y));
    ring.setAttribute('r', '6');
    ring.setAttribute('class', 'skills-core-ring');

    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('cx', String(CENTER.x));
    dot.setAttribute('cy', String(CENTER.y));
    dot.setAttribute('r', '2.2');
    dot.setAttribute('class', 'skills-core-dot');

    core.appendChild(ring);
    core.appendChild(dot);
    svg.appendChild(core);
}

/**
 * Colored zone panels so each skill section is visually distinct.
 * @param {HTMLElement} orbit
 */
function buildCategoryZones(orbit) {
    const existing = orbit.querySelector('.skills-zones');
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.className = 'skills-zones';
    wrap.setAttribute('aria-hidden', 'true');

    getResolvedCategories().forEach((cat) => {
        const panel = document.createElement('div');
        panel.className = `skills-zone skills-zone--${cat.id}`;
        const { x, y, w, h } = cat.zone;
        panel.style.setProperty('--zx', `${x}%`);
        panel.style.setProperty('--zy', `${y}%`);
        panel.style.setProperty('--zw', `${w}%`);
        panel.style.setProperty('--zh', `${h}%`);
        panel.style.setProperty('--cat-color', cat.color);
        panel.style.setProperty('--cat-glow', cat.glow);
        wrap.appendChild(panel);
    });

    orbit.prepend(wrap);
}

/**
 * Category zone labels on the orbit field.
 * @param {HTMLElement} orbit
 */
function buildCategoryLabels(orbit) {
    const existing = orbit.querySelector('.skills-cluster-labels');
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.className = 'skills-cluster-labels';
    wrap.setAttribute('aria-hidden', 'true');

    getResolvedCategories().forEach((cat) => {
        const tag = document.createElement('span');
        tag.className = `skills-cluster-label skills-cluster-label--${cat.id}`;
        tag.textContent = cat.label;
        tag.style.setProperty('--x', `${cat.labelX}%`);
        tag.style.setProperty('--y', `${cat.labelY}%`);
        tag.style.setProperty('--cat-color', cat.color);
        tag.style.setProperty('--cat-glow', cat.glow);
        wrap.appendChild(tag);
    });

    orbit.insertBefore(wrap, orbit.querySelector('.skills-bubbles'));
}

export function initSkillsBubbles() {
    const orbit = document.querySelector('.skills-orbit');
    const bubbleContainer = document.querySelector('.skills-bubbles');
    const svg = document.querySelector('.skills-connections');
    if (!bubbleContainer || !orbit) return;

    const bubbles = buildSkillBubbleLayout();

    bubbleContainer.replaceChildren();

    if (svg) {
        svg.replaceChildren();
        buildSvgDefs(svg);
        buildEnergyLines(svg, bubbles);
        buildCorePulse(svg);
    }

    buildCategoryZones(orbit);
    buildCategoryLabels(orbit);

    bubbles.forEach((skill, index) => {
        const bubble = document.createElement('li');
        bubble.className = 'skill-bubble';
        bubble.dataset.category = skill.categoryId;
        bubble.textContent = skill.label;
        bubble.style.setProperty('--x', `${skill.x}%`);
        bubble.style.setProperty('--y', `${skill.y}%`);
        bubble.style.setProperty('--energy-delay', `${(index % 12) * 0.18}s`);
        bubble.style.setProperty('--cat-color', skill.color);
        bubble.style.setProperty('--cat-glow', skill.glow);
        bubbleContainer.appendChild(bubble);
    });
}
