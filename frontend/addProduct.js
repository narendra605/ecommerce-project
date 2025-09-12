(function () {
  const SELECTORS = {
    addButton: '#addProductBtn',
    productGrid: '#productGrid'
  };

  function createAddProductModal() {
    const modal = document.createElement('div');
    modal.id = 'addProductModal';
    modal.className = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'addProductTitle');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = (
      '<div class="modal-backdrop" data-close="modal"></div>' +
      '<div class="modal-content" role="document">' +
      '  <div class="modal-header">' +
      '    <h3 id="addProductTitle">Add Product</h3>' +
      '    <button class="modal-close" id="addProductClose" aria-label="Close add product">✕</button>' +
      '  </div>' +
      '  <form id="addProductForm" class="modal-body">' +
      '    <label>' +
      '      <span>Product Title</span>' +
      '      <input id="apTitle" name="title" type="text" placeholder="Enter product title" required />' +
      '    </label>' +
      '    <label>' +
      '      <span>Price</span>' +
      '      <input id="apPrice" name="price" type="number" placeholder="0.00" step="0.01" min="0" required />' +
      '    </label>' +
      '    <label>' +
      '      <span>Image URL</span>' +
      '      <input id="apImage" name="image" type="url" placeholder="https://example.com/image.jpg" required />' +
      '    </label>' +
      '    <label>' +
      '      <span>Category</span>' +
      '      <input id="apCategory" name="category" type="text" placeholder="Electronics, Fashion, ..." required />' +
      '    </label>' +
      '    <label>' +
      '      <span>Description</span>' +
      '      <textarea id="apDescription" name="description" rows="3" placeholder="Short description (optional)"></textarea>' +
      '    </label>' +
      '    <div class="form-actions">' +
      '      <button type="submit" class="add-btn" id="apSubmit">Add Product</button>' +
      '    </div>' +
      '  </form>' +
      '</div>'
    );

    document.body.appendChild(modal);
    return modal;
  }

  function openModal(modal) {
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    const firstField = modal.querySelector('#apTitle');
    if (firstField) firstField.focus();
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  function onSubmitAddProduct(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.querySelector('#apTitle').value.trim();
    const priceString = form.querySelector('#apPrice').value;
    const image = form.querySelector('#apImage').value.trim();
    const category = form.querySelector('#apCategory').value.trim();
    const description = form.querySelector('#apDescription').value.trim();

    if (!title || !priceString || !image || !category) {
      alert('Please fill all required fields.');
      return;
    }

    const price = Number(priceString);
    if (Number.isNaN(price) || price < 0) {
      alert('Please enter a valid price.');
      return;
    }

    const product = {
      id: 'local-' + Date.now(),
      title: title,
      price: price,
      image: image,
      category: category,
      description: description
    };

    addProductCard(product);
    form.reset();
    const modal = document.getElementById('addProductModal');
    closeModal(modal);
  }

  function addProductCard(product) {
    const grid = document.querySelector(SELECTORS.productGrid);
    if (!grid) return;

    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = (
      '<img class="product-image" alt="' + escapeHtml(product.title) + '" src="' + escapeAttribute(product.image) + '">' +
      '<div class="product-info">' +
      '  <h4 class="product-title">' + escapeHtml(product.title) + '</h4>' +
      '  <div class="product-meta">' +
      '    <span class="product-category">' + escapeHtml(product.category) + '</span>' +
      '    <strong class="product-price">$' + product.price.toFixed(2) + '</strong>' +
      '  </div>' +
      (product.description ? ('  <p class="product-description">' + escapeHtml(product.description) + '</p>') : '') +
      '  <button class="add-btn" data-product-id="' + product.id + '">Add to Cart</button>' +
      '</div>'
    );

    grid.prepend(card);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(str) {
    return escapeHtml(str).replace(/`/g, '&#96;');
  }

  function wireUp() {
    let modal = document.getElementById('addProductModal');
    if (!modal) {
      modal = createAddProductModal();
    }

    const openBtn = document.querySelector(SELECTORS.addButton);
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        openModal(modal);
      });
    }

    modal.addEventListener('click', function (e) {
      const target = e.target;
      if (target.matches('[data-close="modal"], .modal-close')) {
        closeModal(modal);
      }
    });

    const form = modal.querySelector('#addProductForm');
    if (form) {
      form.addEventListener('submit', onSubmitAddProduct);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
        closeModal(modal);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireUp);
  } else {
    wireUp();
  }
})();


