import { t } from '../i18n.js';
import { icon, toast } from '../ui.js';
import { KEYS, read, write } from '../storage.js';
import { showFormError } from './login.js';
export default function renderContact(root=document.querySelector('#app')) {
  root.innerHTML=`<section class="container-shell section-space"><p class="eyebrow mb-4">${t('contact.eyebrow')}</p><h1 class="page-title mb-5">${t('contact.title')}</h1><p class="muted max-w-xl leading-relaxed">${t('contact.intro')}</p><div class="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-24"><form id="contact-form" class="space-y-5" novalidate><div><label class="label" for="contact-name">${t('contact.name')}</label><input class="input" id="contact-name" name="name" autocomplete="name" required minlength="2" maxlength="80"></div><div><label class="label" for="contact-email">${t('contact.email')}</label><input class="input" id="contact-email" name="email" type="email" autocomplete="email" required maxlength="254"></div><div><label class="label" for="contact-message">${t('contact.message')}</label><textarea class="input min-h-40 resize-y" id="contact-message" name="message" rows="6" required minlength="10" maxlength="3000"></textarea></div><p class="form-error" data-form-error role="alert" tabindex="-1" hidden></p><p class="text-sm" data-form-success role="status" hidden></p><button class="btn-primary" type="submit">${t('contact.send')}${icon('arrow-up-right',18)}</button><p class="text-xs leading-relaxed muted">${t('contact.note')}</p></form><aside class="surface h-fit rounded-xl p-7 sm:p-10"><h2 class="section-title mb-8">${t('contact.storeTitle')}</h2><div class="space-y-8"><div class="flex items-start gap-4">${icon('map-pin',22)}<div><p class="mb-1 font-medium">STORE 22</p><p class="muted leading-relaxed">${t('contact.address')}</p></div></div><div class="flex items-start gap-4">${icon('phone',22)}<div><p class="mb-1 font-medium">${t('contact.phone')}</p><a class="muted hover:text-accent" href="tel:+212522220022" dir="ltr">+212 522 22 00 22</a></div></div><div class="flex items-start gap-4">${icon('mail',22)}<div><p class="mb-1 font-medium">${t('contact.emailLabel')}</p><a class="muted hover:text-accent" href="mailto:hello@store22.com">hello@store22.com</a></div></div><div class="flex items-start gap-4">${icon('clock',22)}<div><p class="mb-1 font-medium">${t('contact.hoursLabel')}</p><p class="muted leading-relaxed">${t('contact.hours')}</p></div></div></div></aside></div></section>`;
  root.onsubmit=event=>{
    if(event.target.id!=='contact-form')return;event.preventDefault();const form=event.target;
    form.querySelector('[data-form-success]').hidden=true;
    const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),message=form.elements.message.value.trim();
    if(!name||!email||!message){showFormError(form,'validation.required');return;}
    if(name.length<2||name.length>80){showFormError(form,'validation.name');return;}
    if(!form.elements.email.validity.valid){showFormError(form,'validation.email');return;}
    if(message.length<10||message.length>3000){showFormError(form,'validation.message');return;}
    try{write(KEYS.messages,[...read(KEYS.messages,[]),{name,email,message,createdAt:new Date().toISOString()}]);}
    catch(error){showFormError(form,error);return;}
    form.reset();form.querySelector('[data-form-error]').hidden=true;
    const success=form.querySelector('[data-form-success]');success.textContent=t('contact.success');success.hidden=false;toast(t('contact.success'));
  };
}
