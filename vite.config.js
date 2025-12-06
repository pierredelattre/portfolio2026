import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [
    vue(),
    imagetools({
      defaultDirectives: (url) => {
        if (!url.searchParams.has('optimized')) {
          return new URLSearchParams()
        }

        url.searchParams.delete('optimized')

        const params = new URLSearchParams()
        if (!url.searchParams.has('w')) {
          params.set('w', '480;768;1024;1440;1920;2560;3200')
        }

        if (!url.searchParams.has('format')) {
          params.set('format', 'jpg')
        }

        if (!url.searchParams.has('quality')) {
          params.set('quality', '82')
        }

        if (!url.searchParams.has('lossless')) {
          params.set('lossless', 'true')
        }

        if (!url.searchParams.has('as')) {
          params.set('as', 'picture')
        }

        return params
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 5173
  }
})
