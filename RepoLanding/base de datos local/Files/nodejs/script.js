// ── Modal de imagen ──
const images = document.querySelectorAll('.product-img-wrap img');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');

images.forEach(img => {
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

// ── Formulario de suscripción ──
document.getElementById('subscribeBtn').addEventListener('click', function () {
  const email = document.getElementById('email').value;
  if (email.trim() === '') {
    alert('Por favor introduce un email');
  } else if (!email.endsWith('@gmail.com')) {
    alert('Solo se aceptan correos de Gmail (@gmail.com)');
  } else {
    alert('¡Gracias por suscribirte!');
    document.getElementById('email').value = '';
  }
});
