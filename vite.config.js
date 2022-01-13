import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import styleImport from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  css:{
    preprocessorOptions:{
      scss:{
        additionalData:`@import "./assets/custom_theme.scss";@import "@nutui/nutui-react/dist/styles/variables.scss";`
      }
    }
  },
  plugins: [
    react(),
    styleImport({
      libs:[
        {
          libraryName:"@nutui/nutui-react",
          libraryNameChangeCase:"pascalCase",
          resolveStyle:(name)=>{
            return `@nutui/nutui-react/dist/packages/${name.toLowerCase()}/${name.toLowerCase()}.scss`
          }
        }
      ]
    })
  ]
})
