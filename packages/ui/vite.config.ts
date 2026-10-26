import {defineConfig} from "vite";
export default defineConfig({
 build:{
  outDir:"packages/ui/dist",emptyOutDir:true,
  lib:{entry:"packages/ui/src/index.tsx",formats:["es"],fileName:"index",cssFileName:"ui"},
  rollupOptions:{external:["react","react-dom","react/jsx-runtime","react/jsx-dev-runtime"]},
  cssCodeSplit:false,cssMinify:true
 }
});
