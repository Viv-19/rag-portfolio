/**
 * Application entry point.
 * 1. Load HTML partials
 * 2. Initialize hero glitch effects
 * 3. Initialize portfolio agent interactions
 */

import { loadAllComponents } from './modules/componentLoader.js';
import { initGlitchEffects } from './modules/glitchEffects.js';
import { initPortfolioAgent } from './modules/portfolioAgent.js';
import { initSkillsBubbles } from './modules/skillsBubbles.js';
import { initProjectsHub } from './modules/projectsHub.js';
import { initExperienceCards } from './modules/experienceCards.js';
import { initChatbotWidget } from './modules/chatbotWidget.js';

function showLoadError(message) {
    const mount = document.getElementById('mount-sections');
    if (!mount) return;

    mount.innerHTML = `
        <section style="padding: 4rem 2rem; max-width: 640px; margin: 0 auto; font-family: monospace; color: #48CAE4;">
            <h2 style="margin-bottom: 1rem; font-family: 'Outfit', sans-serif; color: #fff;">Could not load portfolio</h2>
            <p style="margin-bottom: 1rem; color: #8A94A6; line-height: 1.6;">${message}</p>
            <p style="color: #8A94A6;">Use <strong style="color: #E0E1DD;">Live Server</strong> in VS Code or run <code style="color: #48CAE4;">npx serve .</code> from this folder.</p>
        </section>
    `;
}

async function bootstrap() {
    try {
        await loadAllComponents();
        initGlitchEffects();
        initPortfolioAgent();
        initSkillsBubbles();
        initProjectsHub();
        initExperienceCards();
        initChatbotWidget();
    } catch (error) {
        console.error('[main]', error);
        showLoadError(error.message || 'Component loading failed.');
    }
}

bootstrap();
