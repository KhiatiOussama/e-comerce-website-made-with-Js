import { isAdminLoggedIn, adminLogout } from '../auth.js';
import { getShoes, getShoeById, addShoe, updateShoe, deleteShoe } from '../shoes.js';
import { t, localizedShoe, formatPrice } from '../i18n.js';
import { icon, escapeHTML, toast } from '../ui.js';
import { showFormError } from './login.js';
const filters={query:'',category:''};
const categories=['men','women','kids'];
function shoeRows() {
  const query=filters.query.toLocaleLowerCase();
  const rows=getShoes().filter(shoe=>{
    const details=localizedShoe(shoe);
    return (!filters.category||(filters.category==='sale'?shoe.originalPrice>shoe.price:shoe.category===filters.category))&&`${details.name} ${shoe.name} ${shoe.category}`.toLocaleLowerCase().includes(query);
  });
  if(!rows.length)return `<tr><td colspan="5" class="py-12 text-center muted">${t('admin.noResults')}</td></tr>`;
  return rows.map(shoe=>{
    const details=localizedShoe(shoe);
    return `<tr class="border-t border-borderLight dark:border-borderDark"><td class="py-4 pe-6"><div class="flex min-w-48 items-center gap-4"><img src="${escapeHTML(shoe.image)}" alt="${escapeHTML(details.name)}" class="h-16 w-12 rounded-xl object-cover grayscale" loading="lazy"><div><p class="font-medium">${escapeHTML(details.name)}</p><p class="muted mt-1 max-w-44 truncate text-xs">#${escapeHTML(shoe.id)}</p></div></div></td><td class="px-4 py-4 text-sm muted">${t('categories.'+shoe.category)}</td><td class="whitespace-nowrap px-4 py-4 text-sm font-medium">${formatPrice(shoe.price)}${shoe.originalPrice>shoe.price?`<s class="muted ms-2 text-xs">${formatPrice(shoe.originalPrice)}</s>`:''}</td><td class="px-4 py-4 text-sm ${shoe.stock===0?'text-accent':''}">${shoe.stock}</td><td class="py-4 ps-4"><div class="flex justify-end gap-2"><button class="icon-button" type="button" data-edit="${escapeHTML(shoe.id)}" aria-label="${escapeHTML(t('common.edit')+' '+details.name)}">${icon('pencil',17)}</button><button class="icon-button" type="button" data-delete="${escapeHTML(shoe.id)}" aria-label="${escapeHTML(t('common.delete')+' '+details.name)}">${icon('trash-2',17)}</button></div></td></tr>`;
  }).join('');
}
function openEditor(root,shoe=null) {
  const dialog=root.querySelector('#shoe-dialog');
  const input=(name,type='text',extra='',hint='')=>`<div><label class="label" for="shoe-${name}">${t('common.'+name)}</label><input class="input" id="shoe-${name}" name="${name}" type="${type}" value="${escapeHTML(shoe?.[name]??'')}" ${extra}>${hint?`<p class="muted mt-2 text-xs">${t(hint)}</p>`:''}</div>`;
  dialog.innerHTML=`<div class="p-6 sm:p-8"><div class="mb-7 flex items-start justify-between gap-4"><div><h2 id="shoe-dialog-title" class="text-2xl font-semibold">${t(shoe?'admin.editShoe':'admin.addShoe')}</h2><p class="muted mt-2 text-sm">${t('admin.formHint')}</p></div><button type="button" class="icon-button shrink-0" data-close-dialog aria-label="${t('common.close')}">${icon('x',20)}</button></div><form id="shoe-form" data-id="${escapeHTML(shoe?.id||'')}" class="space-y-5" novalidate>${input('name','text','required maxlength="120"')}<div><label class="label" for="shoe-description">${t('common.description')}</label><textarea class="input min-h-24 resize-y" id="shoe-description" name="description" rows="3" required maxlength="3000">${escapeHTML(shoe?.description||'')}</textarea></div><div class="grid gap-5 sm:grid-cols-2"><div><label class="label" for="shoe-category">${t('common.category')}</label><select class="input" id="shoe-category" name="category">${categories.map(category=>`<option value="${category}" ${shoe?.category===category?'selected':''}>${t('categories.'+category)}</option>`).join('')}</select></div>${input('stock','number','required min="0" step="1"','admin.stockHint')}</div><div class="grid gap-5 sm:grid-cols-2">${input('price','number','required min="0.01" step="0.01"','admin.priceHint')}${input('originalPrice','number','min="0.01" step="0.01"','common.optional')}</div><div class="grid gap-5 sm:grid-cols-2"><div><label class="label" for="shoe-sizes">${t('common.sizes')}</label><input class="input" id="shoe-sizes" name="sizes" value="${escapeHTML(shoe?.sizes?.join(', ')||'')}" required><p class="muted mt-2 text-xs">${t('admin.sizesHint')}</p></div><div><label class="label" for="shoe-colors">${t('common.colors')}</label><input class="input" id="shoe-colors" name="colors" value="${escapeHTML(shoe?.colors?.join(', ')||'')}" required><p class="muted mt-2 text-xs">${t('admin.colorsHint')}</p></div></div><div><label class="label" for="shoe-image">${t('common.imageUrl')}</label><input class="input" id="shoe-image" name="image" type="url" value="${escapeHTML(shoe?.image||'')}" required maxlength="2000"><p class="muted mt-2 text-xs">${t('admin.imageHint')}</p></div><p class="form-error" data-form-error role="alert" tabindex="-1" hidden></p><div class="flex flex-wrap justify-end gap-3 border-t border-borderLight pt-5 dark:border-borderDark"><button class="btn-secondary" type="button" data-close-dialog>${t('common.cancel')}</button><button class="btn-primary" type="submit">${t('common.save')}${icon('check',17)}</button></div></form></div>`;
  dialog.showModal();
}
function formShoe(form) {
  const data=new FormData(form),name=String(data.get('name')).trim(),description=String(data.get('description')).trim(),image=String(data.get('image')).trim();
  const stockRaw=String(data.get('stock')).trim(),priceRaw=String(data.get('price')).trim();
  if(!name||!description||!image||!stockRaw||!priceRaw)throw new Error('validation.required');
  const originalRaw=String(data.get('originalPrice')).trim();
  return {name,description,image,category:String(data.get('category')),price:Number(priceRaw),stock:Number(stockRaw),originalPrice:originalRaw?Number(originalRaw):null,
    sizes:String(data.get('sizes')).split(',').map(size=>size.trim()).filter(Boolean),colors:String(data.get('colors')).split(',').map(color=>color.trim().toLowerCase()).filter(Boolean)};
}
export default function renderAdmin(root=document.querySelector('#app')) {
  if(!isAdminLoggedIn()){location.replace('admin-login.html');return;}
  const shoes=getShoes();
  root.innerHTML=`<section class="container-shell section-space"><div class="flex flex-wrap items-start justify-between gap-6"><div><p class="eyebrow mb-3">${t('admin.eyebrow')}</p><h1 class="page-title mb-4">${t('admin.title')}</h1><p class="muted">${t('admin.subtitle')}</p></div><div class="flex flex-wrap gap-3"><button class="btn-secondary" type="button" data-admin-logout>${t('admin.logout')}</button><button class="btn-primary" type="button" data-add-shoe>${icon('plus',18)}${t('admin.addShoe')}</button></div></div><div class="my-10 grid gap-4 sm:grid-cols-3">${[[t('admin.products'),shoes.length],[t('admin.totalStock'),shoes.reduce((total,shoe)=>total+shoe.stock,0)],[t('admin.saleProducts'),shoes.filter(shoe=>shoe.originalPrice>shoe.price).length]].map(([label,value])=>`<div class="surface rounded-xl p-6"><p class="muted mb-3 text-sm">${label}</p><p class="text-3xl font-semibold">${value}</p></div>`).join('')}</div><div class="mb-6 flex flex-wrap items-center justify-between gap-5"><h2 class="text-xl font-semibold">${t('admin.catalog')}</h2><div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><label class="sr-only" for="admin-search">${t('common.search')}</label><input class="input sm:w-64" id="admin-search" type="search" value="${escapeHTML(filters.query)}" placeholder="${escapeHTML(t('admin.searchPlaceholder'))}"><label class="sr-only" for="admin-category">${t('common.category')}</label><select class="input sm:w-44" id="admin-category"><option value="">${t('admin.allCategories')}</option>${[...categories,'sale'].map(category=>`<option value="${category}" ${filters.category===category?'selected':''}>${t('categories.'+category)}</option>`).join('')}</select></div></div><div class="overflow-x-auto rounded-xl border border-borderLight px-5 dark:border-borderDark"><table class="w-full text-start"><thead><tr class="text-sm muted">${['name','category','price','stock','actions'].map((key,index)=>`<th scope="col" class="py-5 ${index===0?'pe-6 text-start':index===4?'ps-4 text-end':'px-4 text-start'} font-medium">${t('common.'+key)}</th>`).join('')}</tr></thead><tbody id="admin-rows">${shoeRows()}</tbody></table></div><dialog id="shoe-dialog" aria-labelledby="shoe-dialog-title" class="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-xl border border-borderLight bg-white text-primary shadow-md dark:border-borderDark dark:bg-surfaceDark dark:text-white"></dialog></section>`;
  root.oninput=event=>{if(event.target.id==='admin-search'){filters.query=event.target.value;root.querySelector('#admin-rows').innerHTML=shoeRows();}};
  root.onchange=event=>{if(event.target.id==='admin-category'){filters.category=event.target.value;root.querySelector('#admin-rows').innerHTML=shoeRows();}};
  root.onclick=event=>{
    const edit=event.target.closest('[data-edit]'),remove=event.target.closest('[data-delete]');
    try{
      if(event.target.closest('[data-admin-logout]')){adminLogout();location.assign('admin-login.html');return;}
      if(event.target.closest('[data-add-shoe]'))openEditor(root);
      if(edit){const shoe=getShoeById(edit.dataset.edit);if(shoe)openEditor(root,shoe);}
      if(event.target.closest('[data-close-dialog]')||event.target.id==='shoe-dialog')root.querySelector('#shoe-dialog').close();
      if(remove){const shoe=getShoeById(remove.dataset.delete);if(shoe&&confirm(t('admin.deleteConfirm',{name:localizedShoe(shoe).name}))){deleteShoe(shoe.id);renderAdmin(root);toast(t('admin.deleted'));}}
    }catch(error){toast(t(error.message||'common.error'),'error');}
  };
  root.onsubmit=event=>{
    if(event.target.id!=='shoe-form')return;event.preventDefault();
    if(!isAdminLoggedIn()){location.replace('admin-login.html');return;}
    const form=event.target;
    try{const data=formShoe(form),editing=Boolean(form.dataset.id);if(editing)updateShoe(form.dataset.id,data);else addShoe(data);renderAdmin(root);toast(t(editing?'admin.updated':'admin.added'));}
    catch(error){showFormError(form,error);}
  };
}
