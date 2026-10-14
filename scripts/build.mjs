import {mkdir,copyFile,cp,writeFile,readFile,rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {renderHome,render404} from '../src/render.mjs';
import {site,productionIssues} from '../content/site.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
const production=process.env.VIVACE_ENV==='production';
if(production){
 const issues=productionIssues();
 const vercel=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
 if(vercel.headers?.some(r=>r.headers?.some(h=>h.key.toLowerCase()==='x-robots-tag'&&h.value.includes('noindex'))))issues.push('Headers da Vercel ainda bloqueiam a indexação');
 if(issues.length)throw new Error('Publicação de produção bloqueada:\n'+issues.join('\n'));
}
await mkdir(root+'dist',{recursive:true});
for(const file of ['styles.css','app.js'])await copyFile(root+file,root+'dist/'+file);
await cp(root+'assets',root+'dist/assets',{recursive:true});
const home=renderHome({production}),notFound=render404({production});
await writeFile(root+'index.html',home);await writeFile(root+'404.html',notFound);
await writeFile(root+'dist/index.html',home);await writeFile(root+'dist/404.html',notFound);
await writeFile(root+'dist/robots.txt',production?'User-agent: *\nAllow: /\n':'User-agent: *\nDisallow: /\n');
if(production)await writeFile(root+'dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>'+site.domain+'/</loc></url></urlset>');
else await rm(root+'dist/sitemap.xml',{force:true});
console.log('Static '+(production?'production':'preview')+' build ready: dist/');

