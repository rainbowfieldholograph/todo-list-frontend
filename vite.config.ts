import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		target: ['es2015', 'chrome58', 'firefox78', 'safari14'],
	},
	plugins: [react(), tsConfigPaths()],
	css: {
		postcss: { plugins: [autoprefixer()] },
	},
	resolve: {
		alias: { '~': path.resolve(__dirname, './src') },
	},
});
