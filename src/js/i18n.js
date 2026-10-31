import en from '../locales/en.js';
import fr from '../locales/fr.js';
import ar from '../locales/ar.js';
import { KEYS, read, write } from './storage.js';
const dictionaries = { en, fr, ar };
const saved = read(KEYS.language, 'en');
let language = Object.hasOwn(dictionaries,saved) ? saved : 'en';
export function getLanguage() { return language; }
export function t(key,params={}) {
  const value = dictionaries[language][key] ?? en[key] ?? key;
  return String(value).replace(/\{(\w+)\}/g,(_,name)=>String(params[name]??''));
}
export function setLanguage(next) {
  if (!Object.hasOwn(dictionaries,next)) return;
  language=next;
  write(KEYS.language,next);
  document.documentElement.lang=next;
  document.documentElement.dir=next==='ar'?'rtl':'ltr';
  applyTranslations();
  document.dispatchEvent(new CustomEvent('language:changed',{detail:{language:next}}));
}
export function applyTranslations(root=document) {
  const selectors = {'data-i18n':null,'data-i18n-placeholder':'placeholder','data-i18n-aria':'aria-label','data-i18n-title':'title'};
  for(const [attribute,target] of Object.entries(selectors)) {
    const nodes=[...(root.matches?.('['+attribute+']')?[root]:[]),...root.querySelectorAll('['+attribute+']')];
    for(const node of nodes) {
      let params={};try{params=JSON.parse(node.dataset.i18nParams||'{}');}catch{}
      if(!params||typeof params!=='object')params={};
      const text=t(node.getAttribute(attribute),params);
      if(target)node.setAttribute(target,text);else node.textContent=text;
    }
  }
}
export function localizedShoe(shoe) {
  const translated=shoe.translations?.[language];
  return {...shoe,name:translated?.name||shoe.name,description:translated?.description||shoe.description};
}
export function formatPrice(amount) {
  return new Intl.NumberFormat({en:'en-US',fr:'fr-FR',ar:'ar-MA'}[language],{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number(amount)||0);
}

