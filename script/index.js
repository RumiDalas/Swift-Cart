const API_BASE = 'https://fakestoreapi.com/products';

const elements = {
  categories: document.getElementById('level-container'),
  productContainer: document.getElementById('word-container'),
  spinnerSpan: document.getElementById('spinner'),
  cartCount: document.getElementById('cart-count'),
  detailsContainer: document.getElementById('details-container'),
  modal: document.getElementById('word_modal'),
};

// spinner's parent section
const spinnerSection = elements.spinnerSpan ? elements.spinnerSpan.parentElement : null;

let cart = JSON.parse(localStorage.getItem('swiftcart_cart') || '[]');
let currentProducts = [];

function updateCartCount() {
  elements.cartCount.textContent = cart.length;
  localStorage.setItem('swiftcart_cart', JSON.stringify(cart));
}

function manageSpinner(show = true) {
  if (!spinnerSection) return;
  spinnerSection.classList.toggle('hidden', !show);
  elements.productContainer.classList.toggle('hidden', show);
}


function fetchCategories() {
  return fetch(`${API_BASE}/categories`)
    .then(res => res.json())
    .then(cats => displayCategories(cats));
}

function displayCategories(categories) {
  const container = elements.categories;
  container.innerHTML = '';

  const allBtnDiv = document.createElement('div');
  allBtnDiv.innerHTML = `<button id="lesson-btn-all" onclick="loadCategoryProducts('all')" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-list"></i> All</button>`;
  container.appendChild(allBtnDiv);

  categories.forEach((cat) => {
    const id = `lesson-btn-${cat.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
    const div = document.createElement('div');
    div.innerHTML = `<button id="${id}" onclick="loadCategoryProducts('${cat}')" class="btn btn-outline lesson-btn">${cat}</button>`;
    container.appendChild(div);
  });
}

function removeActive() {
  const els = document.querySelectorAll('.lesson-btn');
  els.forEach(e => e.classList.remove('active'));
}

function loadCategoryProducts(category) {
  manageSpinner(true);
  const url = category && category !== 'all' ? `${API_BASE}/category/${encodeURIComponent(category)}` : API_BASE;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive();
      const btnId = category === 'all' ? 'lesson-btn-all' : `lesson-btn-${category.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const clickBtn = document.getElementById(btnId);
      if (clickBtn) clickBtn.classList.add('active');

      currentProducts = data;
      displayProducts(data);
      manageSpinner(false);
    });
}

function loadProductDetail(id) {
  const url = `${API_BASE}/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(prod => displayProductDetails(prod));
}

function displayProductDetails(prod) {
  elements.detailsContainer.innerHTML = `
    <div class="text-2xl font-bold">
      <h2>${prod.title}</h2>
    </div>
    <div class="flex gap-4">
      <img src="${prod.image}" class="w-36 h-36 object-contain bg-gray-100 rounded p-2" />
      <div>
        <p class="badge badge-sm badge-primary">${prod.category}</p>
        <p class="mt-4">${prod.description}</p>
        <div class="mt-4 flex items-center gap-4">
          <div class="text-2xl font-bold">$${prod.price.toFixed(2)}</div>
          <div class="text-sm text-gray-500"><i class="fa-solid fa-star text-yellow-400"></i> ${prod.rating?.rate ?? '-'} (${prod.rating?.count ?? 0})</div>
        </div>
        <div class="mt-4">
          <button id="details-add" class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  `;

  const addBtn = document.getElementById('details-add');
  if (addBtn) addBtn.addEventListener('click', () => { cart.push({ id: prod.id, title: prod.title, price: prod.price, qty: 1 }); updateCartCount(); elements.modal.close(); });

  // show dialog
  if (elements.modal && typeof elements.modal.showModal === 'function') elements.modal.showModal();
}

function displayProducts(products) {
  const container = elements.productContainer;
  container.innerHTML = '';

  if (!products || products.length === 0) {
    container.innerHTML = `<div class="text-center col-span-full rounded-lg py-10 space-y-6"><p class="text-xl font-medium text-gray-400">No products found.</p></div>`;
    return;
  }

  products.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-sm text-center py-6 px-4 space-y-4';
    card.innerHTML = `
      <h2 class="font-bold text-lg">${prod.title}</h2>
      <div class="p-4 bg-gray-50 rounded"><img src="${prod.image}" class="mx-auto h-28 object-contain" /></div>
      <div class="text-sm text-gray-600">$${prod.price.toFixed(2)} / <span class="text-yellow-400"><i class="fa-solid fa-star"></i> ${prod.rating?.rate ?? '-'}</span></div>
      <div class="flex justify-between items-center mt-4">
        <button onclick="loadProductDetail(${prod.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="(function(p){ cart.push({ id: p.id, title: p.title, price: p.price, qty:1 }); updateCartCount(); })( {id:${prod.id}, title: '${(prod.title||'').replace(/'/g,"\'")}', price: ${prod.price} })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-cart-plus"></i></button>
      </div>
    `;
    container.appendChild(card);
  });
}


updateCartCount();
fetchCategories().then(() => loadCategoryProducts('all'));

