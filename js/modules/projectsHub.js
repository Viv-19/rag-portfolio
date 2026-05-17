import { FEATURED_PROJECTS, GITHUB_PROFILE } from '../config/projects.js';

function buildSpoke(project) {
    const stackHtml = project.stack.map((t) => `<span>${t}</span>`).join('');
    const rel = project.link.external ? 'noopener noreferrer' : '';
    const target = project.link.external ? '_blank' : '_self';

    return `
        <article
            class="project-spoke project-spoke--${project.position}"
            data-project-id="${project.id}"
            tabindex="0"
        >
            <div class="project-spoke-inner">
                <header class="project-spoke-head">
                    <h3 class="project-spoke-title">${project.title}</h3>
                    <a
                        class="project-spoke-link"
                        href="${project.link.href}"
                        target="${target}"
                        rel="${rel}"
                    >${project.link.label}</a>
                </header>
                <div class="project-spoke-stack" aria-label="Tech stack">${stackHtml}</div>
                <p class="project-spoke-summary">${project.summary}</p>
                <div class="project-spoke-detail-wrap">
                    <p class="project-spoke-detail">${project.detail}</p>
                </div>
            </div>
        </article>
    `;
}

export function initProjectsHub() {
    const hub = document.getElementById('projects-hub');
    const spokesMount = document.getElementById('projects-spokes');
    const coreBtn = document.getElementById('projects-core-btn');
    const hint = document.getElementById('projects-hint');
    const footerLink = document.getElementById('projects-github-link');

    if (!hub || !spokesMount || !coreBtn) return;

    spokesMount.innerHTML = FEATURED_PROJECTS.map(buildSpoke).join('');

    if (footerLink) {
        footerLink.href = GITHUB_PROFILE;
    }

    function setExpanded(expanded) {
        hub.classList.toggle('is-expanded', expanded);
        coreBtn.setAttribute('aria-expanded', String(expanded));
        if (hint) {
            hint.textContent = expanded
                ? 'Click the image again to collapse'
                : 'Click on the pic to see the projects';
        }
    }

    coreBtn.addEventListener('click', () => {
        setExpanded(!hub.classList.contains('is-expanded'));
    });

    spokesMount.querySelectorAll('.project-spoke-link').forEach((anchor) => {
        anchor.addEventListener('click', (e) => e.stopPropagation());
    });

    /* Keep card expanded while reading detail (hover + touch) */
    spokesMount.querySelectorAll('.project-spoke').forEach((card) => {
        card.addEventListener('mouseenter', () => card.classList.add('is-active'));
        card.addEventListener('mouseleave', () => card.classList.remove('is-active'));
        card.addEventListener('focusin', () => card.classList.add('is-active'));
        card.addEventListener('focusout', (e) => {
            if (!card.contains(e.relatedTarget)) {
                card.classList.remove('is-active');
            }
        });
    });
}
