import { EXPERIENCES } from '../config/experience.js';

function buildExperienceCard(exp, index) {
    const tags = exp.tags.map((t) => `<span>${t}</span>`).join('');
    const highlights = exp.highlights.map((h) => `<li>${h}</li>`).join('');
    const logos = (exp.logos || []).map(url => `<img src="${url}" alt="${exp.company} logo" class="experience-company-logo" />`).join('');

    return `
        <article class="experience-card" style="--card-delay: ${0.45 + index * 0.2}s">
            <div class="experience-card-media" data-exp-id="${exp.id}">
                <img
                    class="experience-card-image"
                    src="${exp.image}"
                    alt="${exp.imageAlt}"
                    loading="lazy"
                />
            </div>
            <div class="experience-card-body">
                <div class="experience-card-head">
                    <div class="experience-card-title-group">
                        <div class="experience-logos-wrapper">
                            ${logos}
                        </div>
                        <div>
                            <h3 class="experience-card-role">${exp.role}</h3>
                            <p class="experience-card-company">${exp.company}</p>
                        </div>
                    </div>
                    <div class="experience-card-meta">
                        <span class="experience-card-period">${exp.period}</span>
                        <span class="experience-card-location">${exp.location}</span>
                    </div>
                </div>
                
                <p class="experience-card-lead">${exp.lead}</p>
                <div class="experience-card-tags">${tags}</div>

                <div class="experience-card-details-container">
                    <button class="experience-details-toggle" aria-expanded="false" aria-controls="details-${exp.id}">
                        <span>More Details</span>
                        <svg viewBox="0 0 24 24" class="arrow-icon"><path fill="currentColor" d="M7 10l5 5 5-5H7z"/></svg>
                    </button>
                    
                    <div id="details-${exp.id}" class="experience-card-details-content" hidden>
                        <p class="experience-card-subtitle">${exp.subtitle}</p>
                        <ul class="experience-card-list">${highlights}</ul>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function bindExperienceImages(root) {
    root.querySelectorAll('.experience-card-media').forEach((media) => {
        const img = media.querySelector('.experience-card-image');
        if (!img) return;

        const markLoaded = () => {
            if (img.naturalWidth > 0) {
                media.classList.add('has-image');
            }
        };

        img.addEventListener('load', markLoaded);
        img.addEventListener('error', () => media.classList.remove('has-image'));

        if (img.complete) {
            markLoaded();
        }
    });
}

export function initExperienceCards() {
    const mount = document.getElementById('experience-cards');
    if (!mount) return;

    mount.innerHTML = EXPERIENCES.map(buildExperienceCard).join('');
    bindExperienceImages(mount);

    // Bind toggle buttons
    mount.querySelectorAll('.experience-details-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            const content = mount.querySelector(`#${btn.getAttribute('aria-controls')}`);
            if (isExpanded) {
                content.hidden = true;
                btn.querySelector('span').textContent = 'More Details';
            } else {
                content.hidden = false;
                btn.querySelector('span').textContent = 'Less Details';
            }
        });
    });
}
