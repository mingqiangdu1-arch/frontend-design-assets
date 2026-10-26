import {defineConfig} from "vite";
export default defineConfig({
 root:"playground/component-gallery",
 server:{host:"127.0.0.1",port:5174,strictPort:true,fs:{allow:["../.."]}},
 build:{outDir:"../../dist/component-gallery",emptyOutDir:true}
});
