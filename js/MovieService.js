// ==========================
// MovieService.js
// ==========================
// Clase responsable de obtener datos desde el backend
export class MovieService {
  /**
   * @param {string} baseUrl - URL base backend
   */
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * Obtiene las películas "upcoming" desde el backend
   * @returns {Promise<Object>} - JSON con las películas
   */
  async getUpcoming() {
    try {
      const response = await fetch(`${this.baseUrl}/upcoming`);
      if (!response.ok) throw new Error(`Error al obtener películas: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("MovieService.getUpcoming:", error);
      throw error;
    }
  }
}