import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
//   build: {
//     rollupOptions: {
//         output: {
//             globals: {
//               'react-is': 'ReactIs'
//             }
//           },
//       external: [
//         /^node:.*/,
//         'react-is'
//       ]
//     }
//   }
})
