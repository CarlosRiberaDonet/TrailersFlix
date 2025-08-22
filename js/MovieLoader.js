// ==========================
// MovieLoader.js
// ==========================
// Clase responsable de renderizar los datos en el HTML
export class MovieLoader {
  /**
   * @param {string} containerId - ID del contenedor donde se van a insertar las películas
   */
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Renderiza las películas en el contenedor
   * @param {Object} movies - JSON con la lista de películas
   */
  renderMovies(movies) {
    this.container.innerHTML = ""; // limpiar contenido previo

    movies.results.forEach(movie => {
      const htmlElement = createUpcomingHTML(movie);
      this.container.appendChild(htmlElement);
    });
  }
}

// Función separada que construye el HTML de cada película
export function createUpcomingHTML(movie) {
  const item = document.createElement('div');
  item.classList.add('pelicula-item');

  const imgDiv = document.createElement('div');
  imgDiv.classList.add('upcoming-pelicula-img');
  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;
  imgDiv.appendChild(img);

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('upcoming-pelicula-info');
  const title = document.createElement('h3');
  title.textContent = movie.title;
  const overview = document.createElement('p');
  overview.textContent = movie.overview;

  infoDiv.appendChild(title);
  infoDiv.appendChild(overview);

  item.appendChild(imgDiv);
  item.appendChild(infoDiv);

  return item;
}
