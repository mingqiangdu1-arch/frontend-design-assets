import {createServer} from "node:http";
import {readFile,stat,realpath} from "node:fs/promises";
import path from "node:path";

const root=await realpath(process.cwd());
const port=Number(process.env.PORT??8009);
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",
 ".mjs":"text/javascript; charset=utf-8",".js":"text/javascript; charset=utf-8",
 ".json":"application/json; charset=utf-8",".svg":"image/svg+xml",
 ".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",
 ".txt":"text/plain; charset=utf-8",".md":"text/markdown; charset=utf-8"};
const withinRoot=p=>p===root||p.startsWith(root+path.sep);
export async function resolveStatic(requestUrl){
 let pathname;
 try{pathname=decodeURIComponent(new URL(requestUrl,"http://localhost").pathname);}
 catch{return null;}
 if(pathname.includes("\0")||pathname.includes("\\"))return null;
 let target=path.resolve(root,"."+pathname);
 if(!withinRoot(target))return null;
 try{
  const s=await stat(target);
  if(s.isDirectory())target=path.join(target,"index.html");
  if(!(await stat(target)).isFile())return null;
  const resolved=await realpath(target);
  if(!withinRoot(resolved))return null;
  return resolved;
 }catch{return null;}
}
export function createStaticServer(){
 return createServer(async(req,res)=>{
  if(req.method!=="GET"&&req.method!=="HEAD"){res.writeHead(405);res.end("Method not allowed");return;}
  const target=await resolveStatic(req.url||"/");
  if(!target){res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8","X-Content-Type-Options":"nosniff"});res.end("Not found");return;}
  try{
   const data=await readFile(target);
   res.writeHead(200,{"Content-Type":mime[path.extname(target)]||"application/octet-stream",
     "Content-Length":data.length,"X-Content-Type-Options":"nosniff","Cache-Control":"no-store"});
   res.end(req.method==="HEAD"?undefined:data);
  }catch{res.writeHead(500);res.end("Internal error");}
 });
}
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(new URL(import.meta.url).pathname)){
 const server=createStaticServer();
 server.listen(port,"127.0.0.1",()=>console.log("Asset static preview: http://127.0.0.1:"+port+"/playground/asset-explorer/"));
 server.on("error",err=>{console.error(err.message);process.exitCode=1;});
}
