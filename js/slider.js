/**
 * Inicializa un slider de películas genérico
 * @param {string} containerId - ID del contenedor que tiene todas las películas
 * @param {string} prevBtnId - ID del botón para ir hacia atrás
 * @param {string} nextBtnId - ID del botón para ir hacia adelante
 * @param {number} moviesPerPage - Cuántas películas se muestran a la vez en escritorio
 * @param {number} movieWidth - Ancho de cada película + gap en píxeles
 */
export function initSlider(containerId, prevBtnId, nextBtnId, moviesPerPage, movieWidth) {
  // Referencias a elementos del DOM
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  // Desplazamiento actual en píxeles (solo para escritorio)
  let offset = 0;

  // Total de películas en este slider
  const totalMovies = container.children.length;

  // Detectar móvil
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    moviesPerPage = 1;                          // mostrar 1 item a la vez en móvil
    movieWidth = container.parentElement.offsetWidth; // ancho del wrapper
    container.style.overflowX = "auto";         // scroll táctil nativo
    container.style.webkitOverflowScrolling = "touch"; // smooth scroll iOS
  }

  // Límite máximo de desplazamiento hacia la izquierda (solo para escritorio)
  const maxOffset = -(Math.ceil(totalMovies / moviesPerPage) - 1) * moviesPerPage * movieWidth;

  // ===============================
  // DESPLAZAMIENTO POR BOTONES (escritorio)
  // ===============================
  if (!isMobile) {
    // Botón "siguiente"
    nextBtn.addEventListener('click', () => {
      if (offset > maxOffset) {
        offset -= moviesPerPage * movieWidth;
        if (offset < maxOffset) offset = maxOffset;
        container.style.transform = `translateX(${offset}px)`; // aplica movimiento
      }
    });

    // Botón "anterior"
    prevBtn.addEventListener('click', () => {
      if (offset < 0) {
        offset += moviesPerPage * movieWidth;
        if (offset > 0) offset = 0;
        container.style.transform = `translateX(${offset}px)`; // aplica movimiento
      }
    });
  }

  // ===============================
  // OPCIONAL: SWIPE TÁCTIL (solo móvil)
  // ===============================
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

      if (deltaX > 30) prevBtn.click();      // swipe derecha → anterior
      else if (deltaX < -30) nextBtn.click(); // swipe izquierda → siguiente

      isDragging = false;
    });
  }
}

// Ejemplo de uso para tu slider principal
// 180px ancho de la película + 16px de gap = 196px
initSlider('proximo-container', 'btn-upcoming-prev', 'btn-upcoming-next', 6, 196);
