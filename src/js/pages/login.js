import { login, signup, isLoggedIn, adminLogin, isAdminLoggedIn } from '../auth.js';
import { addToCart } from '../cart.js';
import { KEYS, read, write, remove } from '../storage.js';
import { t } from '../i18n.js';
import { icon } from '../ui.js';

/** Allow return links only to storefront pages in this installation. */
export function safeDestination(value,fallback='index.html') {
  try {
    const destination=new URL(value||fallback,location.href),base=new URL('.',location.href);
    if(destination.origin!==base.origin||!destination.pathname.startsWith(base.pathname))return fallback;
    const page=destination.pathname.slice(base.pathname.length);
    if(!/^(index|men|women|kids|sale|product|contact|cart)\.html$/.test(page))return fallback;
    return `${page}${destination.search}${destination.hash}`;
  }catch{return fallback;}
}
export function showFormError(form,error) {
  const node=form.querySelector('[data-form-error]');node.textContent=t(error?.message||error||'common.error');node.hidden=false;node.focus();
}
function completeAuthentication(message) {
  const flash={message},pending=read(KEYS.pendingCart,null);remove(KEYS.pendingCart);
  if(pending){try{addToCart(pending.shoeId,pending.size,pending.color,pending.quantity||1);flash.extraMessage='cart.added';}catch(error){flash.extraError=error.message||'cart.itemNotFound';}}
  write(KEYS.flash,flash);location.assign(safeDestination(new URLSearchParams(location.search).get('redirect')));
}
export function renderAccount(root,kind) {
  const admin=kind==='adminLogin',register=kind==='signup';
  const redirect=safeDestination(new URLSearchParams(location.search).get('redirect'));
  if(admin&&isAdminLoggedIn()){location.replace('admin.html');return;}
  if(!admin&&isLoggedIn()){completeAuthentication('auth.accountReady');return;}
  const field=(name,type,autocomplete,extra='')=>`<div><label class="label" for="${kind}-${name}">${t('auth.'+name)}</label><input class="input" id="${kind}-${name}" name="${name}" type="${type}" autocomplete="${autocomplete}" required ${extra}></div>`;
  root.innerHTML=`<section class="container-shell section-space"><div class="mx-auto max-w-md"><a href="index.html" class="mb-10 inline-flex items-center gap-2 text-sm muted hover:text-accent">${icon('arrow-left',17)}${t('common.backHome')}</a><p class="eyebrow mb-3">STORE 22 · ${admin?t('admin.eyebrow'):t('auth.'+kind)}</p><h1 class="page-title mb-4">${t('auth.'+kind+'Title')}</h1><p class="muted mb-9">${t('auth.'+kind+'Subtitle')}</p><form id="account-form" class="space-y-5" novalidate>${register?field('name','text','name','minlength="2" maxlength="80"'):''}${field('email','email',admin?'username':'email','maxlength="254"')}${field('password','password',register?'new-password':'current-password','minlength="6"')}${register?`<p class="text-xs muted">${t('auth.passwordHint')}</p>${field('confirmPassword','password','new-password','minlength="6"')}`:''}<p class="form-error" data-form-error role="alert" tabindex="-1" hidden></p><button class="btn-primary w-full" type="submit">${t('auth.'+kind)}${icon('arrow-right',18)}</button></form>${admin?`<div class="surface mt-8 rounded-xl p-5 text-sm"><p class="mb-2 font-semibold">${t('auth.adminCredentials')}</p><p class="muted break-all" dir="ltr">admin@store22.com / admin123</p><p class="muted mt-3 text-xs leading-relaxed">${t('auth.adminDemoNote')}</p></div>`:`<p class="mt-7 text-center text-sm muted">${t(register?'auth.haveAccount':'auth.noAccount')} <a class="font-medium text-primary hover:text-accent dark:text-white" href="${register?'login':'signup'}.html?redirect=${encodeURIComponent(redirect)}">${t(register?'auth.login':'auth.signup')}</a></p><p class="mt-10 rounded-xl surface p-4 text-xs leading-relaxed muted">${t('auth.forgotNote')}</p>`}</div></section>`;
  root.onsubmit=async event=>{
    if(event.target.id!=='account-form')return;event.preventDefault();const form=event.target,data=new FormData(form);
    const name=String(data.get('name')||'').trim(),email=String(data.get('email')||'').trim(),password=String(data.get('password')||'');
    if(!email||!password||(register&&(!name||!data.get('confirmPassword')))){showFormError(form,'validation.required');return;}
    if(!form.elements.email.validity.valid){showFormError(form,'validation.email');return;}
    if(register&&name.length<2){showFormError(form,'validation.name');return;}
    if(register&&password.length<6){showFormError(form,'validation.password');return;}
    if(register&&password!==data.get('confirmPassword')){showFormError(form,'auth.passwordMismatch');return;}
    const button=form.querySelector('[type="submit"]');button.disabled=true;button.textContent=t('common.loading');
    try{
      if(admin){await adminLogin({email,password});write(KEYS.flash,{message:'auth.loginSuccess'});location.assign('admin.html');}
      else{if(register)await signup({name,email,password});else await login({email,password});completeAuthentication(register?'auth.signupSuccess':'auth.loginSuccess');}
    }catch(error){showFormError(form,error);button.disabled=false;button.textContent=t('auth.'+kind);}
  };
}
export default function renderLogin(root=document.querySelector('#app')){renderAccount(root,'login');}
