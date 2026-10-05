(()=>{
const media=matchMedia('(prefers-color-scheme: dark)');
let choice=document.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('mp_theme='))?.split('=')[1]||'system';
if(!['light','dark','system'].includes(choice))choice='system';
const apply=()=>document.documentElement.dataset.theme=choice==='system'?(media.matches?'dark':'light'):choice;
apply();media.addEventListener('change',()=>{if(choice==='system')apply();});
document.addEventListener('DOMContentLoaded',()=>{
document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('.nav__dropdown').forEach(dd=>{
const btn=dd.querySelector('.nav__trigger'),menu=dd.querySelector('.nav__menu');if(!btn||!menu)return;
const close=()=>{dd.classList.remove('open');btn.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');};
btn.addEventListener('click',e=>{e.stopImmediatePropagation();const open=dd.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-hidden',String(!open));},true);
dd.addEventListener('keydown',e=>{if(e.key==='Escape'){close();btn.focus();}});
document.addEventListener('click',e=>{if(!dd.contains(e.target))close();});
});
const label=document.createElement('label');label.className='theme-control';label.textContent='Theme ';
const select=document.createElement('select');select.setAttribute('aria-label','Color theme');
for(const name of ['Light','Dark','System']){const option=document.createElement('option');option.value=name.toLowerCase();option.textContent=name;select.append(option);}select.value=choice;label.append(select);
document.querySelector('.topbar__inner')?.append(label);
select.addEventListener('change',()=>{choice=select.value;document.cookie='mp_theme='+choice+'; Max-Age=31536000; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');apply();});
});
})();

