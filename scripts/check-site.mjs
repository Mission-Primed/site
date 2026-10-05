import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name.startsWith('.')||e.name==='scripts'?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const pages=walk('.').filter(f=>f.endsWith('.html'));
for(const file of pages){const html=fs.readFileSync(file,'utf8');assert.ok(html.includes('/theme.js'),file);assert.ok(html.includes('/styles.css'),file);for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)/g)){const target=match[1];assert.ok(fs.existsSync('.'+target)||fs.existsSync('.'+target+'/index.html'),file+': missing '+target);}}
assert.ok(fs.statSync('assets/mission-primed-logo.jpg').size>0);
assert.ok(fs.readFileSync('styles.css','utf8').includes('data-theme="dark"'));
console.log('All '+pages.length+' pages, local links, assets and theme integration passed.');
