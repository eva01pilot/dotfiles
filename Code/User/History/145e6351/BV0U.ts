import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build:{
    target: 'esnext'
  },
  plugins: [vue(), {
    name: 'redir',
    configureServer(server){
      return () => {
        server.middlewares.use((req, res, next) => {
          res.end(`<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <link rel="icon" type="image/svg+xml" href="/vite.svg" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Vite + Vue + TS</title>
            </head>
            <body>
              <div id="app"></div>
              <script type="module" src="/src/main.ts"></script>
            </body>
          </html>
          `)
        })
      }
    }
      
    
  }],
})
