// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// site/base target the default GitHub Pages project-site URL for this repo.
// This is a TEMPORARY home (see README) — if it moves to a custom domain,
// its own org, or an org root site, update both (base becomes '/').
export default defineConfig({
	site: 'https://nightwatch-astro.github.io',
	base: '/platevault-docs',
	integrations: [
		starlight({
			title: 'PlateVault',
			description:
				'Local-first astrophotography library manager: organize acquisitions, calibration, projects, and cleanup without touching your files without review.',
			customCss: [
				'@fontsource-variable/inter/index.css',
				'@fontsource-variable/space-grotesk/index.css',
				'./src/styles/theme.css',
				'./src/styles/landing.css',
			],
			// Toggle a scroll flag site-wide so the glass header's bottom border
			// can intensify once the page leaves the top. Inline + no framework.
			head: [
				{
					tag: 'script',
					content:
						"const s=()=>document.documentElement.toggleAttribute('data-scrolled',window.scrollY>4);addEventListener('scroll',s,{passive:true});addEventListener('DOMContentLoaded',s);s();",
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/nightwatch-astro/alm' },
			],
			// reference/screenshots-todo is an internal capture spec: routable, but
			// deliberately left out of the public sidebar.
			sidebar: [
				{
					label: 'Get started',
					items: [
						{ label: 'Install PlateVault', slug: 'how-to/install' },
						{ label: 'Your first session', slug: 'how-to/ingest-first-session' },
					],
				},
				{
					label: 'Manual',
					items: [
						{ label: 'Setup wizard & library roots', slug: 'manual/setup-wizard' },
						{ label: 'Inbox', slug: 'manual/inbox' },
						{ label: 'Sessions', slug: 'manual/sessions' },
						{ label: 'Calibration & masters', slug: 'manual/calibration-masters' },
						{ label: 'Targets & planning', slug: 'manual/targets-planning' },
						{ label: 'Projects & lifecycle', slug: 'manual/projects-lifecycle' },
						{ label: 'Cleanup & archive plans', slug: 'manual/cleanup-archive' },
						{ label: 'Settings', slug: 'manual/settings' },
						{ label: 'Updater', slug: 'manual/updater' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Organize an existing library', slug: 'how-to/organize-existing-library' },
						{ label: 'Prepare for PixInsight/WBPP', slug: 'how-to/prepare-for-pixinsight' },
						{ label: 'Plan a cleanup safely', slug: 'how-to/plan-a-cleanup' },
						{ label: 'Recover after moving a drive', slug: 'how-to/recover-after-moving-a-drive' },
					],
				},
				{
					label: 'Reference',
					items: [{ label: 'Roadmap', slug: 'reference/roadmap' }],
				},
			],
		}),
	],
});
