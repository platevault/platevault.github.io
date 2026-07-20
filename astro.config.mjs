// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// site/base target the org root site: this repo is named <org>.github.io, so
// Pages serves it at the org root and base is '/'. If it later moves to a
// custom domain, update site and keep base at '/'.
export default defineConfig({
	site: 'https://platevault.github.io',
	base: '/',
	integrations: [
		starlight({
			title: 'PlateVault',
			description:
				'Local-first astrophotography library manager: organize acquisitions, calibration, projects, and cleanup without touching your files without review.',
			// Handoff 07: pv-mark, full constellation, any size >=32 (matches the
			// app icon). The 16px favicon-reduction variant is added separately
			// below since Starlight's `favicon` option only accepts one file.
			favicon: '/favicon.svg',
			customCss: [
				'@fontsource-variable/inter/index.css',
				'@fontsource-variable/space-grotesk/index.css',
				'./src/styles/foundation.css',
				'./src/styles/theme.css',
				'./src/styles/landing.css',
			],
			head: [
				// Toggle a scroll flag site-wide so the glass header's bottom border
				// can intensify once the page leaves the top. Inline + no framework.
				{
					tag: 'script',
					content:
						"const s=()=>document.documentElement.toggleAttribute('data-scrolled',window.scrollY>4);addEventListener('scroll',s,{passive:true});addEventListener('DOMContentLoaded',s);s();",
				},
				// 16px favicon reduction (handoff/assets/README.md: pv-mark-favicon
				// is for 16px ONLY, everything else keeps the full mark above).
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/svg+xml', sizes: '16x16', href: '/favicon-16.svg' },
				},
				// og-image (handoff 07 §05): narrowband hero treatment, 1200x630.
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://platevault.github.io/og-image.png' },
				},
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://platevault.github.io/og-image.png' },
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
