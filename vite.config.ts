import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "~pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "~common",
        replacement: path.resolve(__dirname, "src/common"),
      },
      {
        find: "~utils/helpers",
        replacement: path.resolve(__dirname, "src/utils/helpers"),
      },
      {
        find: "~router",
        replacement: path.resolve(__dirname, "src/router"),
      },
    ],
  },
})
