import { abrirTrailer } from './trailer.js';

// Obtener contenedor donde se insertarán las películas
const contenedor = document.getElementById('peliculas-container');

// Petición al backend para obtener películas (página 2)
fetch('http://localhost:8080/peliculas?page=2')
  .then(response => response.json())  // Convertir respuesta a JSON
  .then(data => {
    // Recorrer cada película en el array results
    data.results.forEach(pelicula => {
      // Crear el artículo principal para cada película
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

    // Crear div para mostrar la puntuación
    const vote = document.createElement('div');
    vote.classList.add('vote');
    vote.setAttribute('itemprop', 'voteAverage');

    // Estrella dorada para la puntuación
    const star = document.createElement('span');
    star.textContent = '★';
    star.style.color = 'gold';

    // Texto con la puntuación o 'N/A'
    const score = document.createElement('span');
    score.textContent = pelicula.vote_average !== undefined ? pelicula.vote_average.toFixed(1) : 'N/A';

    // Agregar estrella y puntuación al contenedor vote
    vote.appendChild(star);
    vote.appendChild(score);

    // Crear título de la película
    const title = document.createElement('h3');
    title.classList.add('pelicula-title');
    title.setAttribute('itemprop', 'name');
    title.textContent = pelicula.title;

    // Crear contenedor para botones
    const botonesContainer = document.createElement('div');
    botonesContainer.classList.add('botones-container');

    // Botón trailer
    const trailerBtn = document.createElement('button');
    trailerBtn.textContent = 'Trailer';
    trailerBtn.classList.add('btn-trailer');

    // Listener que envía el id de la película para obtener el trailer
    trailerBtn.addEventListener('click', () => {
        abrirTrailer(pelicula.id);
    });

    // Botón info redondo
    const infoBtn = document.createElement('button');
    infoBtn.textContent = 'i';
    infoBtn.classList.add('btn-info');

    // Añadir botones al contenedor
    botonesContainer.appendChild(trailerBtn);
    botonesContainer.appendChild(infoBtn);

    // Añadir elementos al artículo en orden vertical: puntuación, título, botones, imagen
    articulo.appendChild(img);
    articulo.appendChild(vote);
    articulo.appendChild(title);
    articulo.appendChild(botonesContainer);

      // Añadir el artículo completo al contenedor principal
      contenedor.appendChild(articulo);
    });
  })
  .catch(error => console.error(error)); // Mostrar error si falla la petición

// Función para formatear duración en horas y minutos (opcional)
function formatDuration(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
