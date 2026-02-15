import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    compilerOptions: {
		experimental: {
			async: true
		}
	},
    kit: {
        adapter: adapter(),
        paths: { relative: false }
    } 
};

export default config;
