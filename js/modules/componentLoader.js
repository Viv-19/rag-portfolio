/**
 * Loads HTML partials into mount points defined in index.html.
 * Requires a local HTTP server (Live Server, npx serve, etc.) — fetch is blocked on file://.
 */

import { COMPONENT_MANIFEST } from '../config/components.js';

/**
 * Fetches and injects all components from the manifest.
 * @returns {Promise<void>}
 */
export async function loadAllComponents() {
    const failures = [];

    for (const { mountId, path } of COMPONENT_MANIFEST) {
        const mount = document.getElementById(mountId);
        if (!mount) {
            console.warn(`[componentLoader] Mount #${mountId} not found — skipped ${path}`);
            continue;
        }

        try {
            const response = await fetch(path + '?v=3');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const html = await response.text();
            mount.insertAdjacentHTML('beforeend', html);
        } catch (error) {
            failures.push({ path, error });
            console.error(`[componentLoader] Failed to load ${path}`, error);
        }
    }

    if (failures.length > 0) {
        throw new Error(
            `${failures.length} component(s) failed to load. Run the site through a local server (see README).`
        );
    }
}
