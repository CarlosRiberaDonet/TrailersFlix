import { cargarPeliculas } from './peliculas.js';
import { SingleMovieSlider } from './SingleMovieSlider.js';
import {loadFamous} from './FamousPeople.js';

// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

  // Cargar el carrusel de próximos estrenos
  fetch('https://peliculasonlinehd.fly.dev/peliculas/upcoming')
    .then(res => res.json())
    .then(data => {
      new SingleMovieSlider(
        'proximo-container',
        'btn-upcoming-prev',
        'btn-upcoming-next',
        data.results
      );
    });

  // Cargar el carrusel de películas en cartelera
  cargarPeliculas(
    'https://peliculasonlinehd.fly.dev/peliculas?playing',
    'cartelera-container',
    'cartelera-prev',
    'cartelera-next',
    6,
    196
  );

  // Cargar el carrusel de películas trending day
  cargarPeliculas(
    'http://localhost:8080/peliculas/trendingDayMovies',
    'trending-container',
    'trending-prev',
    'trending-next',
    6,
    196
  );

  // Cargar famosos populares
  loadFamous();


  // Menú hamburguesa
  const hamburger = document.querySelector('.main-header .hamburger');
  const header = document.querySelector('.main-header');

  hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open'); // alterna la clase que muestra/oculta el menú
  });
});
