/* Material requests its index through XMLHttpRequest; route only that request. */
(() => {
 'use strict';
 const open=XMLHttpRequest.prototype.open;
 const locales=['en','pt-BR','es','fr','it'];
 const language=document.documentElement.lang.toLowerCase();
 const locale=language==='pt' ? 'pt-BR' : locales.find(value=>value.toLowerCase()===language) || 'en';
 XMLHttpRequest.prototype.open=function(method,address,...options){
  const url=new URL(String(address),location.href);
  if(url.origin===location.origin && url.pathname.endsWith('/search/search_index.json')){
   url.pathname=url.pathname.replace('search_index.json','search_index.'+locale+'.json');
   address=url.href;
  }
  return open.call(this,method,address,...options);
 };
})();
