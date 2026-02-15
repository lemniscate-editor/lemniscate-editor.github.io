import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit()
	],
	worker: {
        plugins: () => [ svelte() ],
        format: 'es'
    },
	optimizeDeps: {
	    exclude: [
			'svelte-codemirror-editor',
			'codemirror',
			'@codemirror/lang-markdown',
			'cm6-theme-basic-dark',
			'cm6-theme-basic-light',
			'texlyre-busytex'
		]
	},
	assetsInclude: [
		'**/*.wasm'
	]
});
