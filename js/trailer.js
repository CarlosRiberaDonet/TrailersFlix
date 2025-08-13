
// Pasa el id de la película al backend para obtener la url del trailer
export function abrirTrailer(idPelicula) {
    fetch("https://peliculasonlinehd.fly.dev/${idPelicula}")
        .then(response => response.text())
        .then(url => {
            window.open(url, '_blank');
        })
        .catch(error => console.error('Error obteniendo trailer:', error));
}