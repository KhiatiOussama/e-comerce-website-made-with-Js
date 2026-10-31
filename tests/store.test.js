import { test,beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { KEYS,read,write } from '../src/js/storage.js';
import { getShoes,getShoeById,seedShoes,addShoe,updateShoe,deleteShoe } from '../src/js/shoes.js';
import { signup,login,logout,isLoggedIn,adminLogin,adminLogout,isAdminLoggedIn } from '../src/js/auth.js';
import { getCart,addToCart,updateQuantity,removeFromCart,getCartCount,getCartTotal } from '../src/js/cart.js';
import en from '../src/locales/en.js';
import fr from '../src/locales/fr.js';
import ar from '../src/locales/ar.js';
import { safeDestination } from '../src/js/pages/login.js';

class MemoryStorage {
  values=new Map();
  getItem(key){return this.values.has(key)?this.values.get(key):null;}
  setItem(key,value){this.values.set(key,String(value));}
  removeItem(key){this.values.delete(key);}
  clear(){this.values.clear();}
}
globalThis.localStorage=new MemoryStorage();
globalThis.location=new URL('http://localhost:5173/login.html');
beforeEach(()=>localStorage.clear());
const customer=()=>signup({name:'Test Customer',email:'customer@example.com',password:'test1234'});

test('catalog seeds once, has eight shoes per collection and nine sale shoes',()=>{
  const shoes=seedShoes();assert.equal(shoes.length,24);
  for(const category of ['men','women','kids'])assert.ok(shoes.filter(shoe=>shoe.category===category).length>=6);
  assert.ok(shoes.filter(shoe=>shoe.originalPrice>shoe.price).length>=6);
  updateShoe('m-001',{price:91});seedShoes();assert.equal(getShoeById('m-001').price,91);
  write(KEYS.shoes,[]);assert.deepEqual(seedShoes(),[]);
});
test('signup stores a salted hash, rejects duplicate emails and authenticates',async()=>{
  const user=await customer();assert.equal(isLoggedIn(),true);
  const stored=read(KEYS.users)[0];assert.ok(stored.salt);assert.equal(stored.passwordHash.length,64);assert.equal(stored.password,undefined);assert.equal(user.passwordHash,undefined);
  await assert.rejects(signup({name:'Other',email:'CUSTOMER@example.com',password:'123456'}),{message:'auth.emailExists'});
  logout();assert.equal(isLoggedIn(),false);
  await assert.rejects(login({email:user.email,password:'wrong'}),{message:'auth.invalidCredentials'});
  const signedIn=await login({email:' CUSTOMER@EXAMPLE.COM ',password:'test1234'});assert.equal(signedIn.id,user.id);
});
test('guest cart writes are rejected and quantities merge by selected variant',async()=>{
  assert.throws(()=>addToCart('m-001','40','white',1),{message:'auth.loginRequired'});
  await customer();const line=addToCart('m-001','40','white',2);addToCart('m-001','40','white',1);
  assert.equal(getCart().length,1);assert.equal(getCartCount(),3);assert.equal(getCartTotal(),267);
  updateQuantity(line.id,4);assert.equal(getCartTotal(),356);removeFromCart(line.id);assert.equal(getCartCount(),0);
});
test('stock limits apply across variants and invalid inputs are rejected',async()=>{
  await customer();updateShoe('m-001',{stock:3});
  addToCart('m-001','40','white',2);const second=addToCart('m-001','41','black',1);
  assert.throws(()=>addToCart('m-001','42','white',1),{message:'cart.stockError'});
  assert.throws(()=>updateQuantity(second.id,2),{message:'cart.stockError'});
  assert.throws(()=>addToCart('m-001','100','white',1),{message:'cart.invalidSize'});
  assert.throws(()=>addToCart('m-001','40','blue',1),{message:'cart.invalidColor'});
  assert.throws(()=>updateQuantity(second.id,1.5),{message:'cart.invalidQuantity'});
  updateQuantity(second.id,0);assert.equal(getCartCount(),2);
});
test('admin price, size, stock and deletion changes reconcile persisted carts',async()=>{
  await customer();addToCart('m-001','40','white',4);
  updateShoe('m-001',{price:100,stock:2});assert.equal(getCartCount(),2);assert.equal(getCartTotal(),200);
  updateShoe('m-001',{sizes:['41']});assert.equal(getCartCount(),0);
  addToCart('m-002','40','black',1);deleteShoe('m-002');assert.equal(getCartCount(),0);
});
test('customer logout clears the cart while admin sessions remain independent',async()=>{
  adminLogin({email:'admin@store22.com',password:'admin123'});await customer();addToCart('m-001','40','white',1);
  logout();assert.equal(getCartCount(),0);assert.equal(isAdminLoggedIn(),true);
  await signup({name:'Second Customer',email:'second@example.com',password:'test1234'});addToCart('m-001','40','white',1);
  await login({email:'customer@example.com',password:'test1234'});assert.equal(getCartCount(),0);
  adminLogout();assert.equal(isLoggedIn(),true);assert.equal(isAdminLoggedIn(),false);
});
test('CRUD validates data and renamed products do not retain obsolete translations',()=>{
  const input={...getShoeById('m-001'),name:'New pair',stock:0,originalPrice:null};
  const added=addShoe(input);assert.notEqual(added.id,input.id);assert.equal(getShoeById(added.id).stock,0);
  assert.throws(()=>addShoe({...input,originalPrice:1}),{message:'shoes.invalidOriginalPrice'});
  assert.throws(()=>addShoe({...input,image:'javascript:alert(1)'}),{message:'shoes.invalidImage'});
  assert.throws(()=>addShoe({...input,stock:-1}),{message:'shoes.invalidStock'});
  updateShoe('m-001',{name:'Updated name'});assert.deepEqual(getShoeById('m-001').translations,{});
});
test('all dictionaries contain every literal UI translation key',()=>{
  for(const dictionary of [en,fr,ar])for(const [key,value]of Object.entries(dictionary))assert.equal(typeof value,'string',key);
  const collect=directory=>readdirSync(directory,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?collect(`${directory}/${entry.name}`):entry.name.endsWith('.js')?[`${directory}/${entry.name}`]:[]);
  const files=collect(fileURLToPath(new URL('../src/js',import.meta.url)));
  for(const file of files){const code=readFileSync(file,'utf8');for(const match of code.matchAll(/\bt\(['"]([^'"]+)['"]/g)){const key=match[1];if(key.endsWith('.'))continue;assert.ok(en[key],`${file}: ${key}`);}}
  assert.deepEqual(Object.keys(fr),Object.keys(en));assert.deepEqual(Object.keys(ar),Object.keys(en));
});
test('login return URLs reject external, script and administrative destinations',()=>{
  assert.equal(safeDestination('product.html?id=m-001'),'product.html?id=m-001');
  for(const url of ['https://example.com','//example.com','javascript:alert(1)','admin.html','../elsewhere.html'])assert.equal(safeDestination(url),'index.html');
});
