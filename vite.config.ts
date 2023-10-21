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
        find: '~utils/consts',
        replacement: path.resolve(__dirname, 'src/utils/consts'),
      },
      {
        find: '~utils/helpers',
        replacement: path.resolve(__dirname, 'src/utils/helpers'),
      },
      {
        find: '~utils/hooks',
        replacement: path.resolve(__dirname, 'src/utils/hooks'),
      },
      {
        find: '~utils/contexts',
        replacement: path.resolve(__dirname, 'src/utils/contexts'),
      },
      {
        find: '~features/intl',
        replacement: path.resolve(__dirname, 'src/features/intl'),
      },
      {
        find: '~features/theming',
        replacement: path.resolve(__dirname, 'src/features/theming'),
      },
      {
        find: '~static/*',
        replacement: path.resolve(__dirname, 'src/static/*'),
      },
    ],
  },
});
