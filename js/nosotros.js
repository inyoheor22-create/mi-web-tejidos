document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".aparecer");

  function mostrarElementos() {
    elementos.forEach((el) => {
      const posicion = el.getBoundingClientRect().top;
      const altoVentana = window.innerHeight;

      if (posicion < altoVentana - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", mostrarElementos);
  mostrarElementos(); // Mostrar los visibles al cargar
});
