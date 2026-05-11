const images = document.querySelectorAll('.product-img-wrap img');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

images.forEach((img) => {
  img.addEventListener('click', () => {
    modalImage.src = img.src;
    imageModal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => {
  imageModal.style.display = 'none';
});

imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    imageModal.style.display = 'none';
  }
});

const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    products.forEach((product) => {
      const shouldShow = filter === 'all' || product.dataset.category === filter;
      product.classList.toggle('hidden', !shouldShow);
    });
  });
});

const cartOpen = document.getElementById('cartOpen');
const cartClose = document.getElementById('cartClose');
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cart = [];

function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Todavia no has anadido productos.</p>';
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div>
          <h4>${item.name}</h4>
          <p>${item.price.toFixed(2)} EUR</p>
        </div>
        <button class="remove-item" data-index="${index}">Quitar</button>
      `;
      cartItems.appendChild(cartItem);
    });
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = `${total.toFixed(2)} EUR`;
}

document.querySelectorAll('.add-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.querySelector('h3').textContent;
    const priceText = product.querySelector('.price').textContent.replace(',', '.');
    const price = Number.parseFloat(priceText);

    cart.push({ name, price });
    renderCart();
    cartPanel.classList.add('open');
  });
});

cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    cart.splice(Number(event.target.dataset.index), 1);
    renderCart();
  }
});

cartOpen.addEventListener('click', () => {
  cartPanel.classList.add('open');
});

cartClose.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

cartPanel.addEventListener('click', (event) => {
  if (event.target === cartPanel) {
    cartPanel.classList.remove('open');
  }
});

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Tu carrito esta vacio');
    return;
  }

  alert('Compra preparada. Gracias por confiar en GGS.');
  cart.length = 0;
  renderCart();
  cartPanel.classList.remove('open');
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = 'Claro';
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? 'Claro' : 'Tema';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

document.getElementById('subscribeBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;

  if (email.trim() === '') {
    alert('Por favor introduce un email');
  } else if (!email.endsWith('@gmail.com')) {
    alert('Solo se aceptan correos de Gmail (@gmail.com)');
  } else {
    alert('Gracias por suscribirte');
    document.getElementById('email').value = '';
  }
});
