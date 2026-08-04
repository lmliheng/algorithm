import {defineConfig} from 'vite';
import canvasCommons from '@canvas-commons/vite-plugin';
import ffmpeg from '@canvas-commons/ffmpeg';

export default defineConfig({
  plugins: [
    canvasCommons({project: './src/project.js'}),
    ffmpeg(),
  ],
});
