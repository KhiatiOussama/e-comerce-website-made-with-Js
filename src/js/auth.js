import { KEYS, read, write, remove, emit, createId } from './storage.js';
const ADMIN_EMAIL='admin@store22.com';
function getUsers(){const users=read(KEYS.users,[]);return Array.isArray(users)?users:[];}
function publicUser(user){return {id:user.id,name:user.name,email:user.email,createdAt:user.createdAt};}
function normalizedEmail(value){return String(value??'').trim().toLowerCase();}
function hex(bytes){return Array.from(bytes,byte=>byte.toString(16).padStart(2,'0')).join('');}
/** Salted PBKDF2 hashes are used for this browser-only demo. */
async function hashPassword(password,salt){
  if(!globalThis.crypto?.subtle) throw new Error('auth.unavailable');
  const encoder=new TextEncoder();
  const key=await crypto.subtle.importKey('raw',encoder.encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:encoder.encode(salt),iterations:100000,hash:'SHA-256'},key,256);
  return hex(new Uint8Array(bits));
}
function establishSession(user){
  const previous=read(KEYS.customerSession,null);
  if(previous?.userId!==user.id) remove(KEYS.cart);
  write(KEYS.customerSession,{userId:user.id,createdAt:new Date().toISOString()});
  emit('auth:updated',{user:publicUser(user)}); emit('cart:updated'); return publicUser(user);
}
export async function signup({name,email,password}){
  name=String(name??'').trim();email=normalizedEmail(email);password=String(password??'');
  if(name.length<2||name.length>80) throw new Error('auth.nameRequired');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254) throw new Error('auth.invalidEmail');
  if(password.length<6) throw new Error('auth.passwordShort');
  if(getUsers().some(user=>user.email===email)) throw new Error('auth.emailExists');
  if(!globalThis.crypto?.getRandomValues) throw new Error('auth.unavailable');
  const salt=hex(crypto.getRandomValues(new Uint8Array(16))),passwordHash=await hashPassword(password,salt);
  const users=getUsers();if(users.some(user=>user.email===email)) throw new Error('auth.emailExists');
  const user={id:createId('user'),name,email,salt,passwordHash,createdAt:new Date().toISOString()};
  write(KEYS.users,[...users,user]); return establishSession(user);
}
export async function login({email,password}){
  const user=getUsers().find(entry=>entry.email===normalizedEmail(email));
  if(!user||!user.salt||!user.passwordHash||!password) throw new Error('auth.invalidCredentials');
  if(await hashPassword(String(password),user.salt)!==user.passwordHash) throw new Error('auth.invalidCredentials');
  return establishSession(user);
}
export function getCurrentUser(){const session=read(KEYS.customerSession,null);if(!session?.userId)return null;const user=getUsers().find(entry=>entry.id===session.userId);return user?publicUser(user):null;}
export function isLoggedIn(){return Boolean(getCurrentUser());}
export function logout(){remove(KEYS.customerSession);remove(KEYS.cart);remove(KEYS.pendingCart);emit('auth:updated',{user:null});emit('cart:updated');}
export function adminLogin({email,password}){
  if(normalizedEmail(email)!==ADMIN_EMAIL||password!=='admin123')throw new Error('auth.adminInvalidCredentials');
  const session={role:'admin',email:ADMIN_EMAIL,token:createId('admin'),createdAt:new Date().toISOString()};
  write(KEYS.adminSession,session);emit('admin:updated',{loggedIn:true});return session;
}
export function adminLogout(){remove(KEYS.adminSession);emit('admin:updated',{loggedIn:false});}
export function isAdminLoggedIn(){const session=read(KEYS.adminSession,null);return session?.role==='admin'&&session?.email===ADMIN_EMAIL&&Boolean(session?.token);}
