const PRODUCTS_JSON = 'products.json';

function el(tag, props={}, ...children){
  const e = document.createElement(tag);
  Object.entries(props).forEach(([k,v])=>{ if(k==='class') e.className=v; else if(k==='html') e.innerHTML=v; else e.setAttribute(k,v) });
  children.flat().forEach(c=>{ if(typeof c === 'string') e.appendChild(document.createTextNode(c)); else if(c) e.appendChild(c) });
  return e;
}

async function loadProducts(){
  try{
    const res = await fetch(PRODUCTS_JSON);
    const products = await res.json();
    renderProducts(products);
  }catch(e){
    document.getElementById('productsGrid').innerHTML = '<p style="color:var(--muted)">Failed to load products.</p>';
    console.error(e);
  }
}

function renderProducts(products){
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';
  products.forEach(p=>{
    const card = el('article',{class:'product-card'},
      el('h4',{},p.name),
      el('p',{},p.description),
      el('div',{class:'product-meta'},
        el('span',{class:'pill'},p.type),
        el('span',{},p.badge || ''),
        el('span',{style:'margin-left:auto;color:var(--muted)'},p.license || '')
      ),
      el('div',{style:'margin-top:12px'},
        el('a',{class:'btn primary',href:p.cta||'#'},'Learn more')
      )
    );
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadProducts();
});
