/**
 * Hero glitch animations: cycling name aliases and tech phrases.
 */

import {
    NAME_ALIASES,
    TECH_PHRASES,
    GLITCH_START_DELAY_MS,
    NAME_CYCLE_MS,
    TECH_CYCLE_MS,
    TECH_FADE_MS,
} from '../config/content.js';

/**
 * Starts name and tech text cycles after the hero entrance animation.
 */
export function initGlitchEffects() {
    const nameElement = document.getElementById('glitch-name');
    const techElement = document.getElementById('dynamic-tech');

    if (!nameElement || !techElement) {
        console.warn('[glitchEffects] Hero elements not found — glitch effects disabled.');
        return;
    }

    let nameIndex = 0;
    let techIndex = 0;

    setTimeout(() => {
        setInterval(() => {
            nameIndex = (nameIndex + 1) % NAME_ALIASES.length;
            nameElement.classList.remove('glitch-animating');
            void nameElement.offsetWidth; // reflow to restart CSS animation
            nameElement.classList.add('glitch-animating');
            nameElement.textContent = NAME_ALIASES[nameIndex];
        }, NAME_CYCLE_MS);

        setInterval(() => {
            techIndex = (techIndex + 1) % TECH_PHRASES.length;
            techElement.classList.add('changing');

            setTimeout(() => {
                techElement.textContent = TECH_PHRASES[techIndex];
                techElement.classList.remove('changing');
            }, TECH_FADE_MS);
        }, TECH_CYCLE_MS);
    }, GLITCH_START_DELAY_MS);
}
