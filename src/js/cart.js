import { KEYS,read,write,remove,emit,createId } from './storage.js';
import { getShoes,getShoeById } from './shoes.js';
import { isLoggedIn } from './auth.js';
function requireCustomer(){if(!isLoggedIn())throw new Error('auth.loginRequired');}
function quantityValue(value,allowZero=false){const quantity=Number(value);if(!Number.isSafeInteger(quantity)||quantity<(allowZero?0:1))throw new Error('cart.invalidQuantity');return quantity;}
function save(lines){write(KEYS.cart,lines);emit('cart:updated');return lines;}
/** Resolve current inventory on every read so admin changes apply to saved carts. */
export function getCart(){
  if(!isLoggedIn())return [];
  const raw=read(KEYS.cart,[]),stored=Array.isArray(raw)?raw:[];
  const shoes=new Map(getShoes().map(shoe=>[String(shoe.id),shoe])),used=new Map(),lines=[];
  for(const entry of stored){
    if(!entry||typeof entry!=='object')continue;
    const shoe=shoes.get(String(entry.shoeId)),size=String(entry.size),color=String(entry.color);
    if(!shoe||!shoe.sizes.includes(size)||!shoe.colors.includes(color)||!Number.isSafeInteger(entry.quantity)||entry.quantity<1)continue;
    const available=Math.max(0,shoe.stock-(used.get(shoe.id)??0)),quantity=Math.min(entry.quantity,available);
    if(!quantity)continue;
    lines.push({id:String(entry.id||createId('line')),shoeId:shoe.id,size,color,quantity});used.set(shoe.id,(used.get(shoe.id)??0)+quantity);
  }
  // Reads never emit an event, preventing recursive navbar/cart updates.
  if(JSON.stringify(raw)!==JSON.stringify(lines))write(KEYS.cart,lines);
  return lines;
}
export function addToCart(shoeId,size,color,quantity=1){
  requireCustomer();quantity=quantityValue(quantity);const shoe=getShoeById(shoeId);
  if(!shoe)throw new Error('shoes.notFound');size=String(size);color=String(color).toLowerCase();
  if(!shoe.sizes.includes(size))throw new Error('cart.invalidSize');if(!shoe.colors.includes(color))throw new Error('cart.invalidColor');
  const lines=getCart(),total=lines.filter(line=>line.shoeId===shoe.id).reduce((sum,line)=>sum+line.quantity,0);
  if(total+quantity>shoe.stock)throw new Error('cart.stockError');
  let line=lines.find(entry=>entry.shoeId===shoe.id&&entry.size===size&&entry.color===color);
  if(line)line.quantity+=quantity;else{line={id:createId('line'),shoeId:shoe.id,size,color,quantity};lines.push(line);}save(lines);return line;
}
export function removeFromCart(lineId){const lines=getCart();if(!lines.some(line=>line.id===String(lineId)))throw new Error('cart.itemNotFound');save(lines.filter(line=>line.id!==String(lineId)));return true;}
export function updateQuantity(lineId,quantity){
  requireCustomer();quantity=quantityValue(quantity,true);if(!quantity)return removeFromCart(lineId);
  const lines=getCart(),line=lines.find(entry=>entry.id===String(lineId));if(!line)throw new Error('cart.itemNotFound');
  const shoe=getShoeById(line.shoeId),other=lines.filter(entry=>entry.id!==line.id&&entry.shoeId===line.shoeId).reduce((sum,entry)=>sum+entry.quantity,0);
  if(!shoe||other+quantity>shoe.stock)throw new Error('cart.stockError');line.quantity=quantity;save(lines);return line;
}
export function getCartCount(){return getCart().reduce((total,line)=>total+line.quantity,0);}
export function getCartTotal(){const shoes=new Map(getShoes().map(shoe=>[shoe.id,shoe]));return getCart().reduce((cents,line)=>cents+Math.round((shoes.get(line.shoeId)?.price??0)*100)*line.quantity,0)/100;}
export function clearCart(){remove(KEYS.cart);emit('cart:updated');}
