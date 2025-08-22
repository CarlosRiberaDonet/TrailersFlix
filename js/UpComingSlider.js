export class UpcomingSlider {
  /**
   * @param {string} containerId - ID del contenedor de películas
   * @param {string} prevBtnId - ID del botón "anterior"
   * @param {string} nextBtnId - ID del botón "siguiente"
   */
  constructor(containerId, prevBtnId, nextBtnId) {
    this.container = document.getElementById(containerId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);

    this.wrapper = this.container.parentElement; // contenedor visible
    this.items = Array.from(this.container.children); // películas
    this.totalItems = this.items.length;
    this.currentIndex = 0;

    // Configuración inicial del contenedor y items
    this.container.style.display = 'flex';
    this.container.style.transition = 'transform 0.5s ease';

    this.prevBtn.addEventListener('click', () => this.prev());
    this.nextBtn.addEventListener('click', () => this.next());

    window.addEventListener('resize', () => this.updateWidths());
  }

  /**
   * Inicializa el slider: define ancho de cada item según el wrapper
   */
  init() {
    this.updateWidths();
  }

  /**
   * Actualiza los anchos de los items al ancho del wrapper
   */
  updateWidths() {
    const wrapperWidth = this.wrapper.offsetWidth;
    this.items.forEach(item => {
      item.style.flex = `0 0 ${wrapperWidth}px`; // cada item ocupa el ancho del wrapper
    });

    // Ajusta la posición del slider si se ha redimensionado
    this.update();
  }

  /**
   * Mostrar la película anterior
   */
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.update();
    }
  }

  /**
   * Mostrar la película siguiente
   */
  next() {
    if (this.currentIndex < this.totalItems - 1) {
      this.currentIndex++;
      this.update();
    }
  }

  /**
   * Actualiza el transform para mostrar la película actual
   */
  update() {
    const translateX = -(this.currentIndex * this.wrapper.offsetWidth);
    this.container.style.transform = `translateX(${translateX}px)`;
  }
}
