import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    // server: {
    //     port: 8085,
    //     host: '0.0.0.0',
    //     proxy: {
    //         '/': {
    //             target: 'http://localhost:7000',
    //             changeOrigin: true
    //         }
    //     }
    // },
    build: {
        outDir: 'dist',
        sourcemap: false
    }
})
