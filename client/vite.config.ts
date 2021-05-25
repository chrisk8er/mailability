import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {},
	build: {
		target: 'es2015',
	},
	optimizeDeps: {
		include: [],
	},
	css: {
		modules: {
			localsConvention: 'dashes',
		},
		preprocessorOptions: {
			scss: {},
			less: {
				javascriptEnabled: true,
			},
		},
	},
	plugins: [reactRefresh()],
});
