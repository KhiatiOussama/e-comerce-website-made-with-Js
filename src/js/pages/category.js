import { getShoes } from '../shoes.js';
import { t, localizedShoe } from '../i18n.js';
import { productCard, icon, emptyState, escapeHTML } from '../ui.js';
const state={size:'',color:'',sort:'newest',search:''};
export default function renderCategory(root=document.querySelector('#app')) {
  const category=document.body.dataset.category||'men';
  const collection=getShoes().filter(shoe=>category==='sale'?shoe.originalPrice>shoe.price:shoe.category===category);
  const sizes=[...new Set(collection.flatMap(shoe=>shoe.sizes))].sort((a,b)=>Number(a)-Number(b));
  const colors=[...new Set(collection.flatMap(shoe=>shoe.colors))];
  root.innerHTML=`<section class="container-shell section-space"><nav class="muted mb-10 flex items-center gap-2 text-xs" aria-label="${t('common.home')}"><a class="hover:text-accent" href="index.html">${t('common.home')}</a>${icon('chevron-right',12)}<span aria-current="page">${t('categories.'+category)}</span></nav><p class="eyebrow mb-4 ${category==='sale'?'text-accent':'muted'}">STORE 22 / ${t('categories.'+category)}</p><h1 class="page-title mb-5">${t('category.'+category+'Title')}</h1><p class="muted mb-12 max-w-xl text-sm leading-7">${t('category.'+category+'Description')}</p>
    <div class="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-borderLight py-5 dark:border-borderDark"><div class="flex flex-wrap items-center gap-3"><span class="me-1 inline-flex items-center gap-2 text-xs font-medium">${icon('sliders-horizontal',16)}${t('category.filters')}</span><label class="sr-only" for="filter-size">${t('common.size')}</label><select class="input !w-auto !rounded-full !py-2.5 text-xs" id="filter-size"><option value="">${t('category.allSizes')}</option>${sizes.map(size=>`<option ${state.size===size?'selected':''} value="${escapeHTML(size)}">EU ${escapeHTML(size)}</option>`).join('')}</select><label class="sr-only" for="filter-color">${t('common.color')}</label><select class="input !w-auto !rounded-full !py-2.5 text-xs" id="filter-color"><option value="">${t('category.allColors')}</option>${colors.map(color=>`<option ${state.color===color?'selected':''} value="${escapeHTML(color)}">${t('colors.'+color)}</option>`).join('')}</select><button class="muted text-xs underline underline-offset-4 hover:text-accent" data-clear-filters>${t('category.clear')}</button></div><div class="flex items-center gap-2"><label for="sort" class="muted text-xs">${t('category.sort')}</label><select class="cursor-pointer bg-transparent py-2 pe-4 text-xs font-medium outline-none" id="sort">${[['newest','newest'],['price-low','priceLow'],['price-high','priceHigh']].map(([value,key])=>`<option class="bg-white text-primary dark:bg-surfaceDark dark:text-white" value="${value}" ${state.sort===value?'selected':''}>${t('category.'+key)}</option>`).join('')}</select></div></div>
    <div class="mb-7 flex flex-wrap items-center justify-between gap-4"><p class="muted text-xs" data-result-count></p><div class="flex items-center gap-2"><label class="sr-only" for="shoe-search">${t('common.search')}</label>${icon('search',16)}<input id="shoe-search" type="search" class="w-44 border-0 bg-transparent py-2 text-xs outline-none sm:w-52" value="${escapeHTML(state.search)}" placeholder="${escapeHTML(t('category.searchPlaceholder'))}"></div></div><div data-product-grid></div></section>`;
  const results=()=>{
    let shoes=collection.filter(shoe=>(!state.size||shoe.sizes.includes(state.size))&&(!state.color||shoe.colors.includes(state.color))&&localizedShoe(shoe).name.toLocaleLowerCase().includes(state.search.toLocaleLowerCase()));
    shoes.sort(state.sort==='price-low'?(a,b)=>a.price-b.price:state.sort==='price-high'?(a,b)=>b.price-a.price:(a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    root.querySelector('[data-result-count]').textContent=t('category.results',{count:shoes.length});
    const grid=root.querySelector('[data-product-grid]');grid.className=shoes.length?'grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4':'';
    grid.innerHTML=shoes.length?shoes.map(productCard).join(''):emptyState(t('category.noResults'),t('category.noResultsDescription'));
  };
  results();
  root.onchange=event=>{if(event.target.id==='filter-size')state.size=event.target.value;if(event.target.id==='filter-color')state.color=event.target.value;if(event.target.id==='sort')state.sort=event.target.value;results();};
  root.oninput=event=>{if(event.target.id==='shoe-search'){state.search=event.target.value;results();}};
  root.onclick=event=>{if(event.target.closest('[data-clear-filters]')){Object.assign(state,{size:'',color:'',search:''});renderCategory(root);}};
}
