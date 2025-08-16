import { cargarPeliculas } from './peliculas.js';
import { SingleMovieSlider } from './SingleMovieSlider.js';

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

  // Cargar el carrusel de próximos estrenos
  fetch('http://localhost:8080/peliculas/upcoming')
    .then(res => res.json())
    .then(data => {
      new SingleMovieSlider(
        'proximo-container',
        'btn-prev-proximo',
        'btn-next-proximo',
        data.results
      );
    });

  // Cargar el carrusel de películas generales
  cargarPeliculas(
    'http://localhost:8080/peliculas?playing',
    'peliculas-container',
    'btn-prev',
    'btn-next',
    6,
    196
  );


  // Cargar el carrusel de películas generales
  cargarPeliculas(
    'http://localhost:8080/peliculas?page=1',
    'peliculas-container',
    'btn-prev',
    'btn-next',
    6,
    196
  );


  // Menú hamburguesa
  const hamburger = document.querySelector('.main-header .hamburger');
  const header = document.querySelector('.main-header');

  hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open'); // alterna la clase que muestra/oculta el menú
  });
});