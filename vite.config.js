import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    base: env.VITE_GITHUB_REPOSITORY,
    server: {
      proxy: {
        '/project': {
          target: env.VITE_API_TARGET,
          changeOrigin: true,
          secure: true,
          rewrite: path => path.replace(/^\/project/, ''),
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      maxThreads: 1,
      coverage: {
        reporter: ['text', 'lcov'],
      },
    },
  }
})

