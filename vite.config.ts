import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'
// import mkcert from 'vite-plugin-mkcert';
// import type{ DeprecationOrId } from 'sass'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode !== 'development' ? '/' : '/dm_admin/',
  build: {
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },
  },
  plugins: [
    react(),
    // @ts-ignore
    // process.env.HTTPS && mkcert()
  ],
  resolve: {
    alias: [
      {
        find: 'src/',
        replacement: `${path.resolve(__dirname, 'src')}/`,
      },
    ],
    extensions: ['.mjs', '.mts', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
  },
}))
