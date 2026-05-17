/**
 * HTML partial manifest — order matters for page flow.
 * Each entry maps a mount point in index.html to a component file.
 */
export const COMPONENT_MANIFEST = [
    { mountId: 'mount-nav', path: 'components/navbar.html' },
    { mountId: 'mount-agent-status', path: 'components/agent-status.html' },
    { mountId: 'mount-sections', path: 'components/hero.html' },
    { mountId: 'mount-sections', path: 'components/skills.html' },
    { mountId: 'mount-sections', path: 'components/projects.html' },
    { mountId: 'mount-sections', path: 'components/experience.html' },
    { mountId: 'mount-sections', path: 'components/contact.html' },
];
