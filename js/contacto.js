/// === contacto.js ===
// Validación + animación de carga del formulario de contacto

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("form");

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita recargar la página

    // Obtener los valores
    const nombre = formulario.nombre.value.trim();
    const email = formulario.email.value.trim();
    const mensaje = formulario.mensaje.value.trim();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones básicas
    if (!nombre || !email || !mensaje) {
      mostrarAlerta("⚠️ Por favor completa todos los campos.", "error");
      return;
    }
    if (!emailValido.test(email)) {
      mostrarAlerta("📧 Ingresa un correo electrónico válido.", "error");
      return;
    }

    // Mostrar animación de carga
    mostrarCarga(true);

    try {
      // Enviar datos a Formspree
      const respuesta = await fetch(formulario.action, {
        method: formulario.method,
        body: new FormData(formulario),
        headers: { Accept: "application/json" },
      });

      mostrarCarga(false);

      if (respuesta.ok) {
        mostrarAlerta("✅ ¡Mensaje enviado con éxito! Gracias por contactarnos.", "exito");
        formulario.reset();
      } else {
        mostrarAlerta("❌ Ocurrió un error al enviar el mensaje. Intenta de nuevo.", "error");
      }
    } catch (error) {
      mostrarCarga(false);
      mostrarAlerta("⚠️ Error de conexión. Intenta nuevamente.", "error");
    }
  });

  // Mostrar / ocultar animación de carga
  function mostrarCarga(mostrar) {
    let cargando = document.querySelector(".cargando");

    if (mostrar) {
      if (!cargando) {
        cargando = document.createElement("div");
        cargando.className = "cargando";
        cargando.innerHTML = `
          <div class="spinner"></div>
          <p>Enviando mensaje...</p>
        `;
        document.body.appendChild(cargando);
      }
    } else {
      if (cargando) cargando.remove();
    }
  }

  // Mostrar mensajes visuales
  function mostrarAlerta(texto, tipo) {
    const alertaExistente = document.querySelector(".alerta");
    if (alertaExistente) alertaExistente.remove();

    const alerta = document.createElement("div");
    alerta.textContent = texto;
    alerta.className = `alerta ${tipo}`;
    document.body.appendChild(alerta);

    setTimeout(() => alerta.remove(), 3000);
  }
});

