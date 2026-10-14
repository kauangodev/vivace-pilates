import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {promisify} from 'node:util';
import {brotliCompress,gzip,constants} from 'node:zlib';
await import('./build.mjs');
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const compressible=new Set(['.html','.css','.js','.svg','.txt','.xml']);
const brotli=promisify(brotliCompress),compressGzip=promisify(gzip),cache=new Map();
function negotiate(header=''){
  const accepted=new Map(header.split(',').map(part=>{
    const [name,...params]=part.trim().split(';');
    const q=params.find(parameter=>parameter.trim().startsWith('q='));
    return [name, q?Number(q.trim().slice(2)):1];
  }));
  return ['br','gzip'].filter(name=>(accepted.get(name)||0)>0).sort((a,b)=>accepted.get(b)-accepted.get(a))[0]||null;
}
async function payload(target,info,encoding){
  const key=target+'|'+info.mtimeMs+'|'+info.size+'|'+encoding;
  if(cache.has(key))return cache.get(key);
  const body=await readFile(target);
  const result=encoding==='br'?await brotli(body,{params:{[constants.BROTLI_PARAM_QUALITY]:4}}):encoding==='gzip'?await compressGzip(body):body;
  if(cache.size>=64)cache.delete(cache.keys().next().value);
  cache.set(key,result);
  return result;
}
const server=http.createServer(async(req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(resolve(root)+sep)){res.writeHead(403);res.end('Forbidden');return;}
  let target=file,status=200,info;
  try{info=await stat(target);if(!info.isFile())throw new Error('not a file');}
  catch{target=resolve(root,'404.html');status=404;info=await stat(target);}
  const extension=extname(target);
  const encoding=compressible.has(extension)?negotiate(req.headers['accept-encoding']):null;
  const body=await payload(target,info,encoding);
  res.writeHead(status,{
    'Content-Type':types[extension]||'application/octet-stream',
    'Content-Length':body.length,
    'X-Robots-Tag':'noindex, nofollow','Cache-Control':'no-store',
    ...(compressible.has(extension)?{'Vary':'Accept-Encoding'}:{}),
    ...(encoding?{'Content-Encoding':encoding}:{})
  });
  res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(400);res.end('Bad request');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Vivace preview: http://127.0.0.1:4173'));
