import { abrirTrailer } from './trailer.js';

/**
 * Clase para un slider de una sola película visible tipo “hero banner”
 * con imagen de portada fija y descripción a la derecha en escritorio,
 * o portada arriba y descripción debajo en móvil.
 */
export class SingleMovieSlider {
  /**
   * Constructor del slider
   * @param {string} containerId - ID del contenedor principal
   * @param {string} prevBtnId - ID del botón anterior
   * @param {string} nextBtnId - ID del botón siguiente
   * @param {Array} movies - Array de objetos película recibidos del backend
   */
  constructor(containerId, prevBtnId, nextBtnId, movies) {
    this.container = document.getElementById(containerId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.movies = movies;
    this.currentIndex = 0;

    this.render();            // Render inicial
    this.addEventListeners(); // Configurar navegación
  }

  /**
   * Renderiza la película actual en el contenedor
   */
  render() {
    this.container.innerHTML = ''; // limpiar contenido previo

    const pelicula = this.movies[this.currentIndex];

    // Artículo principal
    const articulo = document.createElement('article');
    articulo.classList.add('proximo-item');

    // Wrapper que contiene poster e info
    const wrapper = document.createElement('div');
    wrapper.classList.add('proximo-wrapper');

    // Imagen de portada como <img> para tamaño fijo
    const poster = document.createElement('img');
    poster.src = `https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`;
    poster.alt = pelicula.title;
    poster.classList.add('poster');

    // Información de la película
    const info = document.createElement('div');
    info.classList.add('info');

    // Título
    const title = document.createElement('h3');
    title.textContent = pelicula.title;

    // Sinopsis / descripción
    const overview = document.createElement('p');
    overview.textContent = pelicula.overview;

    // Contenedor de botones
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const btnTrailer = document.createElement('button');
    btnTrailer.textContent = 'Trailer';
    btnTrailer.addEventListener('click', () => abrirTrailer(pelicula.id));
    btnContainer.appendChild(btnTrailer);

    // Agregar elementos al info
    info.appendChild(title);
    info.appendChild(overview);
    info.appendChild(btnContainer);

    // Agregar poster e info al wrapper
    wrapper.appendChild(poster);
    wrapper.appendChild(info);

    // Agregar wrapper al artículo
    articulo.appendChild(wrapper);

    // Insertar artículo en el contenedor principal
    this.container.appendChild(articulo);
  }

  /**
   * Configura los eventos de navegación
   */
  addEventListeners() {
    this.prevBtn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
      this.render();
    });

    this.nextBtn.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % this.movies.length;
      this.render();
    });
  }
}
