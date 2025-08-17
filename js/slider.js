/**
 * Inicializa un slider de películas genérico
 * @param {string} containerId - ID del contenedor que tiene todas las películas
 * @param {string} prevBtnId - ID del botón para ir hacia atrás
 * @param {string} nextBtnId - ID del botón para ir hacia adelante
 * @param {number} moviesPerPage - Cuántas películas se muestran a la vez
 * @param {number} movieWidth - Ancho de cada película + gap en píxeles
 */
export function initSlider(containerId, prevBtnId, nextBtnId, moviesPerPage, movieWidth) {
  // Referencias a elementos del DOM
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  // Desplazamiento actual del contenedor en píxeles
  let offset = 0;

  // Total de películas en este slider
  const totalMovies = container.children.length;

  // Detectar móvil
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    moviesPerPage = 1;                             // mostrar 1 item a la vez
    movieWidth = container.parentElement.offsetWidth; // ancho del wrapper completo
    container.style.overflowX = "hidden";          // desactivar scroll táctil nativo
  }

  // Límite máximo de desplazamiento hacia la izquierda
  const maxOffset = -(Math.ceil(totalMovies / moviesPerPage) - 1) * moviesPerPage * movieWidth;

  // Función para mover contenedor
  const moveSlider = (newOffset) => {
    offset = newOffset;
    container.style.transform = `translateX(${offset}px)`;
  };

  // Botón "siguiente"
  nextBtn.addEventListener('click', () => {
    if (offset > maxOffset) {
      let newOffset = offset - moviesPerPage * movieWidth;
      if (newOffset < maxOffset) newOffset = maxOffset;
      moveSlider(newOffset);
    }
  });

  // Botón "anterior"
  prevBtn.addEventListener('click', () => {
    if (offset < 0) {
      let newOffset = offset + moviesPerPage * movieWidth;
      if (newOffset > 0) newOffset = 0;
      moveSlider(newOffset);
    }
  });

  // Swipe táctil en móviles
  if (isMobile) {
    let startX = 0;
    let isDragging = false;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (deltaX > 30) prevBtn.click();   // swipe a la derecha → anterior
      else if (deltaX < -30) nextBtn.click(); // swipe a la izquierda → siguiente

      isDragging = false;
    });
  }
}

// Ejemplo de uso para tu slider principal
// 180px ancho de la película + 16px de gap = 196px
initSlider('peliculas-container', 'btn-prev', 'btn-next', 6, 196);
