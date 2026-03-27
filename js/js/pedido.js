document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaCarrito");
  const totalTexto = document.getElementById("totalPedido");

  // Obtener productos del localStorage
  const pedidoTemporal = JSON.parse(localStorage.getItem("pedidoTemporal")) || [];

  if (pedidoTemporal.length === 0) {
    lista.innerHTML = "<li>No hay productos en tu pedido.</li>";
    totalTexto.textContent = "";
    return;
  }

  // Listar productos y calcular total
  let total = 0;
  pedidoTemporal.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} (${p.cantidad}) - $${p.precio}`;
    lista.appendChild(li);
    total += p.precio * p.cantidad;
  });

  totalTexto.textContent = `💰 Total: $${total.toFixed(2)}`;
});

// Enviar pedido a WhatsApp
const form = document.getElementById("formPedido");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    const pedidoTemporal = JSON.parse(localStorage.getItem("pedidoTemporal")) || [];

    if (pedidoTemporal.length === 0) {
      alert("⚠️ No tienes productos en tu pedido.");
      return;
    }

    // Crear resumen del pedido
    const resumen = pedidoTemporal
      .map(p => `${p.nombre} (${p.cantidad}) - $${p.precio}`)
      .join("\n");

    const total = pedidoTemporal.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    // Número de WhatsApp (Colombia sin + ni espacios)
    const numeroWhatsApp = "573180902991";

    // Mensaje para WhatsApp
    const mensaje = `🧶 *Nuevo Pedido - Tejidos Yohis* 🧶

👤 Nombre: ${nombre}
📧 Correo: ${email}
📱 Teléfono: ${telefono}
📍 Dirección: ${direccion}

🛍️ *Productos:*
${resumen}

💰 *Total:* $${total.toFixed(2)}

¡Gracias por tu compra! ❤️`;

    // Abrir WhatsApp con el mensaje
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");

    // Limpiar pedido
    localStorage.removeItem("pedidoTemporal");
  });
}
