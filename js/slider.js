/**
 * Inicializa un slider de películas genérico
 * @param {string} containerId - ID del contenedor que tiene todas las películas
 * @param {string} prevBtnId - ID del botón para ir hacia atrás
 * @param {string} nextBtnId - ID del botón para ir hacia adelante
 * @param {number} moviesPerPage - Cuántas películas se muestran a la vez
 * @param {number} movieWidth - Ancho de cada película + gap en píxeles
 */
export function initSlider(containerId, prevBtnId, nextBtnId, moviesPerPage, movieWidth) {
  // Obtenemos referencias a los elementos del DOM
  const container = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  // El desplazamiento actual del contenedor (en px)
  let offset = 0;

  // Total de películas en este slider
  const totalMovies = container.children.length;

  // Detectar móvil y ajustar
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      moviesPerPage = 1;
      movieWidth = container.parentElement.offsetWidth; // ancho del wrapper
    }
  // Calculamos el límite máximo de desplazamiento hacia la izquierda
  // Math.ceil asegura que incluso si la última "página" tiene menos de moviesPerPage, no se pase
  const maxOffset = -(Math.ceil(totalMovies / moviesPerPage) - 1) * moviesPerPage * movieWidth;

  // Listener para botón "siguiente"
  nextBtn.addEventListener('click', () => {
    if (offset > maxOffset) {
      offset -= moviesPerPage * movieWidth;
      if (offset < maxOffset) offset = maxOffset;
      container.style.transform = `translateX(${offset}px)`;
    }
  });

  // Listener para botón "anterior"
  prevBtn.addEventListener('click', () => {
    // Solo desplazamos si no estamos al principio
    if (offset < 0) {
      offset += moviesPerPage * movieWidth; // movemos el contenedor a la derecha
      if (offset > 0) offset = 0; // no pasarse del principio
      container.style.transform = `translateX(${offset}px)`; // aplicamos el movimiento
    }
  });
}

// Ejemplo de uso para tu slider principal
// 180px ancho de la película + 16px de gap = 196
initSlider('peliculas-container', 'btn-prev', 'btn-next', 6, 196);
