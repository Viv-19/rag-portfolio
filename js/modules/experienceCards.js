import { EXPERIENCES } from '../config/experience.js';

function buildExperienceCard(exp, index) {
    const tags = exp.tags.map((t) => `<span>${t}</span>`).join('');
    const highlights = exp.highlights.map((h) => `<li>${h}</li>`).join('');

    return `
        <article class="experience-card" style="--card-delay: ${0.45 + index * 0.2}s">
            <div class="experience-card-media" data-exp-id="${exp.id}">
                <div class="experience-card-placeholder" aria-hidden="true">
                    <span class="experience-card-placeholder-label">Photo</span>
                    <span class="experience-card-placeholder-hint">Add ${exp.image}</span>
                </div>
                <img
                    class="experience-card-image"
                    src="${exp.image}"
                    alt="${exp.imageAlt}"
                    loading="lazy"
                />
            </div>
            <div class="experience-card-body">
                <div class="experience-card-head">
                    <div>
                        <h3 class="experience-card-role">${exp.role}</h3>
                        <p class="experience-card-company">${exp.company}</p>
                        <p class="experience-card-subtitle">${exp.subtitle}</p>
                    </div>
                    <div class="experience-card-meta">
                        <span class="experience-card-period">${exp.period}</span>
                        <span class="experience-card-location">${exp.location}</span>
                    </div>
                </div>
                <p class="experience-card-lead">${exp.lead}</p>
                <ul class="experience-card-list">${highlights}</ul>
                <div class="experience-card-tags">${tags}</div>
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
}
