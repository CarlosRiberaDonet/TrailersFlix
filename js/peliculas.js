import { abrirTrailer } from './trailer.js';
import { initSlider } from './slider.js';
import { SingleMovieSlider } from './SingleMovieSlider.js';


/**
 * Función genérica para cargar películas en un contenedor y activar slider
 * @param {string} url - Endpoint del backend para obtener las películas
 * @param {string} contenedorId - ID del contenedor donde se agregarán las películas
 * @param {string} prevBtnId - ID del botón de desplazamiento hacia atrás
 * @param {string} nextBtnId - ID del botón de desplazamiento hacia adelante
 * @param {number} elementosVisibles - Número de elementos visibles en el slider (para sliders tipo lista)
 * @param {number} anchoElemento - Ancho de cada elemento del slider en píxeles
 */
export function cargarPeliculas(url, contenedorId, btnPrevId, btnNextId, elementosVisibles, anchoElemento) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById(contenedorId);
      contenedor.innerHTML = ''; // Limpiar contenido previo

      // Comprobamos si el contenedor es para hero banner (SingleMovieSlider) o lista
      if (contenedorId === 'proximo-container') {
        // Crear slider tipo hero banner usando SingleMovieSlider
        new SingleMovieSlider(contenedorId, btnPrevId, btnNextId, data.results);
        return;
      }

      // Para sliders de lista normal
      data.results.forEach(pelicula => {
        const articulo = document.createElement('article');
        articulo.classList.add('pelicula-item');
        articulo.setAttribute('role', 'listitem');
        articulo.setAttribute('aria-label', pelicula.title);
        articulo.setAttribute('itemscope', '');
        articulo.setAttribute('itemtype', 'https://schema.org/PeliculaObject');

        // Imagen de portada
        const img = document.createElement('img');
        img.src = 'https://image.tmdb.org/t/p/w300' + pelicula.poster_path;
        img.alt = pelicula.title;
        img.classList.add('thumbnail');
        img.setAttribute('itemprop', 'thumbnailUrl');


        // Contenedor de puntuación
        const vote = document.createElement('div');
        vote.classList.add('vote');
        vote.setAttribute('itemprop', 'voteAverage');
        const star = document.createElement('span');
        star.textContent = '★';
        star.style.color = 'gold';
        const score = document.createElement('span');
        score.textContent = pelicula.vote_average !== undefined ? pelicula.vote_average.toFixed(1) : 'N/A';
        vote.appendChild(star);
        vote.appendChild(score);

        // Título
        const title = document.createElement('h3');
        title.classList.add('pelicula-title');
        title.setAttribute('itemprop', 'name');
        title.textContent = pelicula.title;

        // Botones
        const botonesContainer = document.createElement('div');
        botonesContainer.classList.add('botones-container');
        const trailerBtn = document.createElement('button');
        trailerBtn.textContent = 'Trailer';
        trailerBtn.classList.add('btn-trailer');
        trailerBtn.addEventListener('click', () => abrirTrailer(pelicula.id));
        const infoBtn = document.createElement('button');
        infoBtn.textContent = 'i';
        infoBtn.classList.add('btn-info');
        botonesContainer.appendChild(trailerBtn);
        botonesContainer.appendChild(infoBtn);

        // Construir artículo
        articulo.appendChild(img);
        articulo.appendChild(vote);
        articulo.appendChild(title);
        articulo.appendChild(botonesContainer);

        // Agregar artículo al contenedor
        contenedor.appendChild(articulo);
      });

      // Inicializar slider tipo lista después de renderizar todas las películas
      initSlider(contenedorId, btnPrevId, btnNextId, elementosVisibles, anchoElemento);
    })
    .catch(error => console.error(error));
}

/**
 * Función opcional para formatear duración en horas y minutos
 * @param {number} minutos
 * @returns {string} Formato "Xh Ym" o "Ym"
 */
function formatDuration(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
