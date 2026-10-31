import { sampleShoes } from '../data/shoes.js';
import { KEYS, read, write, emit, createId } from './storage.js';
export const CATEGORIES = Object.freeze(['men', 'women', 'kids']);
export const COLORS = Object.freeze(['black', 'white', 'gray', 'red']);
function isImageUrl(value) {
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}
function normalizeShoe(input, existing = null) {
  const name = String(input.name ?? '').trim();
  const description = String(input.description ?? '').trim();
  const price = Math.round(Number(input.price) * 100) / 100;
  const originalPrice = input.originalPrice === '' || input.originalPrice == null ? null : Math.round(Number(input.originalPrice) * 100) / 100;
  const stock = Number(input.stock);
  const list = (value) => [...new Set((Array.isArray(value) ? value : String(value ?? '').split(',')).map(item => String(item).trim()).filter(Boolean))];
  const sizes = list(input.sizes);
  const colors = list(input.colors).map(color => color.toLowerCase());
  const image = String(input.image ?? '').trim();
  if (!name || name.length > 120) throw new Error('shoes.invalidName');
  if (!description || description.length > 3000) throw new Error('shoes.invalidDescription');
  if (!Number.isFinite(price) || price <= 0 || price > 100000) throw new Error('shoes.invalidPrice');
  if (originalPrice !== null && (!Number.isFinite(originalPrice) || originalPrice <= price || originalPrice > 100000)) throw new Error('shoes.invalidOriginalPrice');
  if (!CATEGORIES.includes(input.category)) throw new Error('shoes.invalidCategory');
  if (!sizes.length || sizes.some(size => !/^\d{1,2}(?:\.5)?$/.test(size) || Number(size) <= 0 || Number(size) > 60)) throw new Error('shoes.invalidSizes');
  if (!colors.length || colors.some(color => !COLORS.includes(color))) throw new Error('shoes.invalidColors');
  if (!Number.isInteger(stock) || stock < 0 || stock > 100000) throw new Error('shoes.invalidStock');
  if (!isImageUrl(image)) throw new Error('shoes.invalidImage');
  const images = (Array.isArray(input.images) ? input.images : [image]).filter(isImageUrl);
  if (!images.includes(image)) images.unshift(image);
  const translations = {};
  for (const language of ['fr','ar']) {
    const value = input.translations?.[language];
    if (value && typeof value === 'object') translations[language] = {name:String(value.name??'').trim().slice(0,120),description:String(value.description??'').trim().slice(0,3000)};
  }
  return { id:existing?.id??createId('shoe'),name,description,translations,price,originalPrice,category:input.category,sizes,colors,stock,image,images:images.slice(0,6),createdAt:existing?.createdAt??new Date().toISOString() };
}
export function seedShoes() {
  const stored = read(KEYS.shoes,null);
  // An empty catalog is intentional after an administrator deletes every item.
  if (!Array.isArray(stored)) { write(KEYS.shoes,sampleShoes); return read(KEYS.shoes,[]); }
  return stored;
}
export function getShoes() { return seedShoes(); }
export function getShoeById(id) { return getShoes().find(shoe => String(shoe.id)===String(id))??null; }
export function addShoe(input) {
  const shoe=normalizeShoe(input); write(KEYS.shoes,[shoe,...getShoes()]); emit('shoes:updated',{action:'add',id:shoe.id}); return shoe;
}
export function updateShoe(id,updates) {
  const shoes=getShoes(); const index=shoes.findIndex(shoe=>String(shoe.id)===String(id));
  if(index<0) throw new Error('shoes.notFound');
  const previous=shoes[index],next={...previous,...updates};
  if(!Object.hasOwn(updates,'translations')&&(next.name!==previous.name||next.description!==previous.description)) next.translations={};
  if(updates.image&&updates.image!==previous.image&&!Object.hasOwn(updates,'images')) next.images=[updates.image];
  const shoe=normalizeShoe(next,previous); shoes[index]=shoe; write(KEYS.shoes,shoes); emit('shoes:updated',{action:'update',id:shoe.id}); emit('cart:updated'); return shoe;
}
export function deleteShoe(id) {
  const shoes=getShoes(); if(!shoes.some(shoe=>String(shoe.id)===String(id))) throw new Error('shoes.notFound');
  write(KEYS.shoes,shoes.filter(shoe=>String(shoe.id)!==String(id))); emit('shoes:updated',{action:'delete',id}); emit('cart:updated'); return true;
}
