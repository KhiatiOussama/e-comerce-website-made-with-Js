import { t, getLanguage, setLanguage, localizedShoe, formatPrice } from './i18n.js';
import { getCurrentUser, logout } from './auth.js';
import { getCartCount } from './cart.js';
import { toggleTheme } from './theme.js';
import { KEYS, read, write } from './storage.js';

export function escapeHTML(value='') {
  return String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
}
const paths = {
  'arrow-right':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  'arrow-left':'<path d="M19 12H5m6-6-6 6 6 6"/>',
  'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>',
  'chevron-right':'<path d="m9 6 6 6-6 6"/>',
  'shopping-bag':'<path d="M6 7h12l2 14H4L6 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  'user':'<circle cx="12" cy="8" r="4"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  'moon':'<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
  'menu':'<path d="M4 6h16M4 12h16M4 18h16"/>',
  'x':'<path d="m6 6 12 12M6 18 18 6"/>',
  'plus':'<path d="M12 5v14M5 12h14"/>',
  'minus':'<path d="M5 12h14"/>',
  'check':'<path d="m5 12 4 4L19 6"/>',
  'check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  'alert-circle':'<circle cx="12" cy="12" r="9"/><path d="M12 8v5m0 3h.01"/>',
  'trash-2':'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  'pencil':'<path d="m16 3 5 5L8 21H3v-5L16 3Zm-3 3 5 5"/>',
  'search':'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  'sliders-horizontal':'<path d="M3 6h5m4 0h9M3 12h9m4 0h5M3 18h2m4 0h12M8 3v6m4 0v6M5 15v6"/>',
  'truck':'<path d="M1 4h13v13H1V4Zm13 5h4l4 4v4h-8"/><circle cx="5.5" cy="18" r="2.5"/><circle cx="18.5" cy="18" r="2.5"/>',
  'rotate-ccw':'<path d="M3 10a9 9 0 1 1 1 7M3 4v6h6"/>',
  'footprints':'<path d="M8 12c-3 0-4-2-4-5S6 2 8 3s4 4 3 7c-.3 1-1.5 2-3 2ZM6 15c-2 0-2 5 0 6s4-1 4-3-2-3-4-3Zm11 1c-3 0-4-2-4-5s2-5 4-4 4 4 3 7c-.3 1-1.5 2-3 2Zm-2 3c-2 0-2 3 0 3s4-1 4-2-2-1-4-1Z"/>',
  'map-pin':'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'phone':'<path d="m6 3 4 4-2 3a16 16 0 0 0 6 6l3-2 4 4-2 3C11 22 2 13 3 5l3-2Z"/>',
  'mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'instagram':'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  'facebook':'<path d="M14 21v-8h3l1-4h-4V7c0-1 1-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>',
  'heart':'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
};
export function icon(name,size=20) {
  return `<svg width="${Number(size)}" height="${Number(size)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${name.startsWith('arrow-')||name==='chevron-right'?'directional':''}">${paths[name]||paths['arrow-right']}</svg>`;
}
export function toast(message,type='success') {
  const region=document.querySelector('#toast-region');if(!region)return;
  if(region.children.length>=3)region.firstElementChild.remove();
  const node=document.createElement('div');node.className=`toast ${type==='error'?'toast-error':''}`;
  node.innerHTML=`<span class="${type==='error'?'text-accent':''}">${icon(type==='error'?'alert-circle':'check-circle',20)}</span><p class="flex-1 leading-relaxed"></p><button type="button" class="shrink-0 hover:text-accent" aria-label="${escapeHTML(t('common.close'))}">${icon('x',16)}</button>`;
  node.querySelector('p').textContent=message;node.querySelector('button').onclick=()=>node.remove();region.append(node);
  setTimeout(()=>node.remove(),5000);
}
export function emptyState(title,description,href,label) {
  return `<div class="mx-auto max-w-lg py-16 text-center"><div class="empty-icon">${icon('shopping-bag',32)}</div><h2 class="mb-4 text-2xl font-semibold tracking-tight">${escapeHTML(title)}</h2><p class="muted mb-7 text-sm leading-relaxed">${escapeHTML(description)}</p>${href?`<a class="btn-primary" href="${escapeHTML(href)}">${escapeHTML(label)} ${icon('arrow-right',18)}</a>`:''}</div>`;
}
export function productCard(shoe) {
  const product=localizedShoe(shoe),sale=shoe.originalPrice>shoe.price;
  const href=`product.html?id=${encodeURIComponent(shoe.id)}`;
  return `<article class="product-card group"><div class="product-image"><a href="${href}" aria-label="${escapeHTML(product.name)}"><img src="${escapeHTML(shoe.image)}" alt="${escapeHTML(product.name)}" loading="lazy" width="600" height="800"></a>${sale?`<span class="sale-badge">-${Math.round((1-shoe.price/shoe.originalPrice)*100)}%</span>`:`<span class="absolute start-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-primary">${t('common.new')}</span>`}<a class="product-quick" href="${href}" aria-label="${escapeHTML(t('common.viewProduct'))}: ${escapeHTML(product.name)}">${icon('plus',20)}</a></div><div class="mb-1.5 flex items-start justify-between gap-3"><a href="${href}" class="text-[13px] font-semibold hover:text-accent sm:text-sm">${escapeHTML(product.name)}</a><span class="whitespace-nowrap text-[13px] font-medium sm:text-sm">${formatPrice(shoe.price)}</span></div><div class="flex items-center justify-between gap-2"><span class="muted text-xs">${t(`categories.${shoe.category}`)}${sale?` <s class="ms-2">${formatPrice(shoe.originalPrice)}</s>`:''}</span><span class="flex items-center gap-1.5">${shoe.colors.map(color=>`<span class="color-dot" data-color="${escapeHTML(color)}" title="${escapeHTML(t(`colors.${color}`))}"></span>`).join('')}</span></div>${shoe.stock===0?`<p class="mt-2 text-xs text-accent">${t('product.outOfStock')}</p>`:''}</article>`;
}
export function renderNavbar() {
  const host=document.querySelector('#navbar'),user=getCurrentUser(),count=getCartCount();
  const current=location.pathname.split('/').pop()||'index.html';
  const links=['men','women','kids','sale','contact'];
  const navLinks=links.map(page=>`<a class="nav-link ${current===page+'.html'?'active':''} ${page==='sale'?'!text-accent':''}" ${current===page+'.html'?'aria-current="page"':''} href="${page}.html">${t('nav.'+page)}</a>`).join('');
  host.innerHTML=`<header class="border-b border-borderLight bg-white/80 backdrop-blur-md dark:border-borderDark dark:bg-black/80"><div class="container-shell flex h-16 items-center justify-between gap-3"><a class="shrink-0 text-[25px] font-bold tracking-[-.06em]" href="index.html" aria-label="${t('common.logo')}">Store 22<span class="text-accent">.</span></a><nav class="hidden h-full items-center gap-7 md:flex lg:gap-9" aria-label="${t('footer.shop')}">${navLinks}</nav><div class="flex items-center gap-0.5 sm:gap-2"><label class="sr-only" for="language">${t('nav.language')}</label><select class="w-[49px] cursor-pointer appearance-none border-0 bg-transparent p-2 text-[11px] font-medium outline-none" id="language" aria-label="${t('nav.language')}">${[['en','EN'],['fr','FR'],['ar','عربي']].map(([value,label])=>`<option class="bg-white text-primary dark:bg-surfaceDark dark:text-white" value="${value}" ${getLanguage()===value?'selected':''}>${label}</option>`).join('')}</select><button class="icon-button" data-theme aria-label="${t('nav.theme')}" title="${t('nav.theme')}">${icon(document.documentElement.classList.contains('dark')?'sun':'moon',18)}</button>${user?`<details class="relative"><summary class="icon-button" aria-label="${t('nav.account')}"><span class="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white dark:bg-white dark:text-primary">${escapeHTML(user.name.charAt(0).toUpperCase())}</span></summary><div class="absolute end-0 top-12 w-56 rounded-xl border border-borderLight bg-white p-4 shadow-sm dark:border-borderDark dark:bg-surfaceDark"><p class="truncate text-sm font-semibold">${escapeHTML(user.name)}</p><p class="muted mb-4 mt-1 truncate text-xs">${escapeHTML(user.email)}</p><button data-logout class="text-sm hover:text-accent">${t('nav.logout')}</button></div></details>`:`<a class="icon-button" href="login.html" aria-label="${t('nav.login')}" title="${t('nav.login')}">${icon('user',18)}</a>`}<a class="icon-button relative" href="cart.html" aria-label="${escapeHTML(t('nav.cart'))}: ${count}">${icon('shopping-bag',19)}${count?`<span data-cart-count class="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-white">${count}</span>`:''}</a><button class="icon-button md:hidden" data-mobile-menu aria-controls="mobile-navigation" aria-expanded="false" aria-label="${t('nav.menu')}">${icon('menu',20)}</button></div></div><nav id="mobile-navigation" class="container-shell border-t border-borderLight pb-4 dark:border-borderDark md:hidden" hidden aria-label="${t('nav.menu')}"><div class="flex flex-col">${navLinks}</div></nav></header>`;
  host.onclick=event=>{
    if(event.target.closest('[data-theme]'))toggleTheme();
    if(event.target.closest('[data-logout]')){logout();toast(t('auth.logoutSuccess'));if(document.body.dataset.page==='cart')document.dispatchEvent(new CustomEvent('page:refresh'));}
    const menu=event.target.closest('[data-mobile-menu]');
    if(menu){const nav=host.querySelector('#mobile-navigation');nav.hidden=!nav.hidden;menu.setAttribute('aria-expanded',String(!nav.hidden));menu.setAttribute('aria-label',t(nav.hidden?'nav.menu':'nav.closeMenu'));menu.innerHTML=icon(nav.hidden?'menu':'x',20);}
  };
  host.onchange=event=>{if(event.target.id==='language')setLanguage(event.target.value);};
}
export function renderFooter() {
  const host=document.querySelector('#footer');
  host.innerHTML=`<footer class="border-t border-borderLight dark:border-borderDark"><div class="container-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.8fr_1.4fr] lg:gap-16 lg:py-16"><div><a href="index.html" class="text-[27px] font-bold tracking-[-.06em]">Store 22<span class="text-accent">.</span></a><p class="muted mt-4 max-w-[230px] text-xs leading-6">${t('footer.description')}</p><div class="mt-5 flex gap-1"><a class="icon-button" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${icon('instagram',17)}</a><a class="icon-button" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${icon('facebook',17)}</a></div></div><div><h2 class="mb-4 text-xs font-semibold">${t('footer.shop')}</h2>${['men','women','kids','sale'].map(page=>`<a class="footer-link" href="${page}.html">${t('nav.'+page)}</a>`).join('')}</div><div><h2 class="mb-4 text-xs font-semibold">${t('footer.help')}</h2><a class="footer-link" href="contact.html">${t('nav.contact')}</a><button class="footer-link text-start" data-policy="shipping">${t('footer.shipping')}</button><a class="footer-link" href="login.html">${t('nav.account')}</a><a class="footer-link" href="admin-login.html">${t('footer.admin')}</a></div><div><h2 class="text-xl font-semibold tracking-tight">${t('footer.newsletter')}</h2><p class="muted mb-5 mt-2 text-xs leading-6">${t('footer.newsletterDescription')}</p><form id="newsletter-form" class="flex items-center border-b border-primary pb-2 dark:border-white" novalidate><label class="sr-only" for="newsletter-email">${t('auth.email')}</label><input class="min-w-0 flex-1 bg-transparent py-2 text-xs outline-none" id="newsletter-email" type="email" autocomplete="email" placeholder="${escapeHTML(t('footer.emailPlaceholder'))}" required><button class="icon-button" aria-label="${t('footer.subscribe')}" type="submit">${icon('arrow-right',19)}</button></form><p class="mt-2 text-xs text-accent" id="newsletter-error" role="alert" hidden></p></div></div><div class="border-t border-borderLight dark:border-borderDark"><div class="container-shell flex flex-col justify-between gap-3 py-5 text-[10px] muted sm:flex-row"><p>${t('footer.rights',{year:new Date().getFullYear()})}</p><div class="flex gap-5"><button class="hover:text-accent" data-policy="privacy">${t('footer.privacy')}</button><button class="hover:text-accent" data-policy="terms">${t('footer.terms')}</button><a class="hover:text-accent" href="#app">↑ Store 22</a></div></div></div></footer><dialog id="policy-dialog" class="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-borderLight bg-white p-7 text-primary shadow-md dark:border-borderDark dark:bg-surfaceDark dark:text-white" aria-labelledby="policy-title"></dialog>`;
  host.onsubmit=event=>{
    if(event.target.id!=='newsletter-form')return;event.preventDefault();const input=event.target.querySelector('input'),error=host.querySelector('#newsletter-error');
    if(!input.value.trim()||!input.validity.valid){error.textContent=t('auth.invalidEmail');error.hidden=false;input.focus();return;}
    try{const emails=read(KEYS.newsletter,[]);write(KEYS.newsletter,[...new Set([...emails,input.value.trim().toLowerCase()])]);input.value='';error.hidden=true;toast(t('footer.subscribed'));}catch(error){toast(t(error.message),'error');}
  };
  host.onclick=event=>{
    const policy=event.target.closest('[data-policy]'),dialog=host.querySelector('#policy-dialog');
    if(policy){dialog.innerHTML=`<div class="mb-5 flex justify-between gap-4"><h2 class="text-2xl font-semibold" id="policy-title">${t('footer.'+policy.dataset.policy)}</h2><button data-close-policy aria-label="${t('common.close')}">${icon('x',20)}</button></div><p class="muted text-sm leading-7">${t('footer.'+policy.dataset.policy+'Text')}</p>`;dialog.showModal();}
    if(event.target.closest('[data-close-policy]')||event.target===dialog)dialog.close();
  };
}
/** A network-independent SVG fallback avoids broken-image icons. */
export function initImageFallbacks() {
  document.addEventListener('error',event=>{
    if(!(event.target instanceof HTMLImageElement)||event.target.dataset.fallback)return;
    const image=event.target;image.dataset.fallback='true';
    const svg='<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="600" height="800" fill="#F5F5F5"/><g transform="translate(95 310) rotate(-10 200 75)" fill="#E5E7EB" stroke="#111111" stroke-width="3"><path d="M30 80 65 20l65 15 45 50 105 30 90 10q35 5 35 35H20q-15-35 10-80Z"/><path d="M20 145h385v25H20z" fill="white"/><path d="m140 75 40-15m-25 35 40-15m-25 35 40-15"/></g><text x="300" y="575" font-size="24" font-family="Arial,sans-serif" fill="#111111" text-anchor="middle">Store 22</text></svg>';
    image.src='data:image/svg+xml,'+encodeURIComponent(svg);
  },true);
}
