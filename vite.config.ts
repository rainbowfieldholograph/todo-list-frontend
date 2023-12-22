import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsConfigPaths()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
		},
	},
});
