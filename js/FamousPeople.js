// JS: carga actores y controla scroll
export function loadFamous() {
  const actorUrl = 'https://image.tmdb.org/t/p/w300';
  const wrapper = document.getElementById('famosos-wrapper');

  if (!wrapper) return;

  wrapper.innerHTML = "";

  // Carga de actores desde backend
  fetch('http://localhost:8080/famous/mostPopular')
    .then(res => res.json())
    .then(data => {
      if (!data.results) return;

      data.results.forEach(actor => {
        const div = document.createElement('div');
        div.classList.add('actor-item');

        const img = document.createElement('img');
        img.src = actor.profile_path ? actorUrl + actor.profile_path : 'fallback.jpg';
        img.alt = actor.name || 'Actor';

        const name = document.createElement('p');
        name.textContent = actor.name || 'Sin nombre';

        const pop = document.createElement('p');
        pop.textContent = actor.popularity ? actor.popularity.toFixed(1) : '0';

        div.appendChild(img);
        div.appendChild(name);
        div.appendChild(pop);
        wrapper.appendChild(div);
      });
    });

  // Botones de scroll con los IDs correctos
  const btnPrev = document.getElementById('famosos-prev');
  const btnNext = document.getElementById('famosos-next');

  if (!btnPrev || !btnNext) return;

  const scrollAmount = 150 + 10; // ancho del actor + gap
  btnPrev.addEventListener('click', () => wrapper.scrollBy({ left: -scrollAmount * 6, behavior: 'smooth' }));
  btnNext.addEventListener('click', () => wrapper.scrollBy({ left: scrollAmount * 6, behavior: 'smooth' }));
}
