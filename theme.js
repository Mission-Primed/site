(()=>{
const media=matchMedia('(prefers-color-scheme: dark)');
let choice=document.cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('mp_theme='))?.split('=')[1]||'system';
if(!['light','dark','system'].includes(choice))choice='system';
const apply=()=>document.documentElement.dataset.theme=choice==='system'?(media.matches?'dark':'light'):choice;
apply();media.addEventListener('change',()=>{if(choice==='system')apply();});
document.addEventListener('DOMContentLoaded',()=>{
const label=document.createElement('label');label.className='theme-control';label.textContent='Theme ';
const select=document.createElement('select');select.setAttribute('aria-label','Color theme');
for(const name of ['Light','Dark','System']){const option=document.createElement('option');option.value=name.toLowerCase();option.textContent=name;select.append(option);}select.value=choice;label.append(select);
document.querySelector('.topbar__inner')?.append(label);
select.addEventListener('change',()=>{choice=select.value;document.cookie='mp_theme='+choice+'; Max-Age=31536000; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');apply();});
});
})();
