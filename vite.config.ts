import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "../../html", // Ruta relativa de la carpeta frontend
    emptyOutDir: true, // limpiar la carpeta de la salida antes de construir
  },
  resolve: {
    alias: [{
      find: '@', replacement: path.resolve(__dirname, 'src')
    }]
  },
  plugins: [react(), svgr()]
})
