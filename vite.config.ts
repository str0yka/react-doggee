import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '~pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: '~common',
        replacement: path.resolve(__dirname, 'src/common'),
      },
      {
        find: '~router',
        replacement: path.resolve(__dirname, 'src/router'),
      },
      {
        find: '~utils/api',
        replacement: path.resolve(__dirname, 'src/utils/api'),
      },
      {
        find: '~utils/helpers',
        replacement: path.resolve(__dirname, 'src/utils/helpers'),
      },
      {
        find: '~utils/hooks',
        replacement: path.resolve(__dirname, 'src/utils/hooks'),
      },
    ],
  },
});
