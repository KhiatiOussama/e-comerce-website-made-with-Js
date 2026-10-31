import '../css/style.css';
import { initTheme } from './theme.js';
import { seedShoes } from './shoes.js';
import { getLanguage,setLanguage,t,applyTranslations } from './i18n.js';
import { renderNavbar,renderFooter,initImageFallbacks,toast } from './ui.js';
import { KEYS,read,remove } from './storage.js';

initTheme();
initImageFallbacks();
const root=document.querySelector('#app');
const page=document.body.dataset.page;
const loaders={
  home:()=>import('./pages/home.js'),category:()=>import('./pages/category.js'),product:()=>import('./pages/product.js'),
  contact:()=>import('./pages/contact.js'),cart:()=>import('./pages/cart.js'),login:()=>import('./pages/login.js'),
  signup:()=>import('./pages/signup.js'),adminLogin:()=>import('./pages/adminLogin.js'),admin:()=>import('./pages/admin.js'),
};
async function bootstrap() {
try {
  seedShoes();setLanguage(getLanguage());
  const {default:renderPage}=await (loaders[page]||loaders.home)();
  function refreshPage(){
    for(const event of ['onclick','onchange','oninput','onsubmit'])root[event]=null;
    renderPage(root);applyTranslations();
    const title=root.querySelector('h1')?.textContent;
    document.title=page==='home'?t('meta.title'):(title?`${title} — Store 22`:t('meta.title'));
  }
  function refresh(){renderNavbar();renderFooter();refreshPage();}
  refresh();
  document.addEventListener('language:changed',refresh);
  document.addEventListener('theme:changed',renderNavbar);
  document.addEventListener('page:refresh',refreshPage);
  window.addEventListener('cart:updated',renderNavbar);
  window.addEventListener('auth:updated',renderNavbar);
  window.addEventListener('shoes:updated',()=>{renderNavbar();if(page!=='admin')refreshPage();});
  // Updates in a second tab are reflected without reloading the storefront.
  window.addEventListener('storage',event=>{
    if(event.key===KEYS.language){setLanguage(read(KEYS.language,'en'));return;}
    if(event.key===KEYS.theme){initTheme();renderNavbar();return;}
    if([KEYS.shoes,KEYS.cart,KEYS.customerSession,KEYS.users,KEYS.adminSession].includes(event.key)||event.key===null){renderNavbar();refreshPage();}
  });
  const flash=read(KEYS.flash,null);
  if(flash){remove(KEYS.flash);setTimeout(()=>{if(flash.message)toast(t(flash.message));if(flash.extraMessage)toast(t(flash.extraMessage));if(flash.extraError)toast(t(flash.extraError),'error');},100);}
}catch(error){
  root.innerHTML='';const section=document.createElement('section');section.className='container-shell section-space';
  const title=document.createElement('h1');title.className='page-title';title.textContent='Store 22';
  const message=document.createElement('p');message.className='muted mt-6';message.textContent=t(error.message)||t('common.error');
  section.append(title,message);root.append(section);console.error(error);
}
}
bootstrap();
