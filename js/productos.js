//---productos.js---
document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".agregar");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElement = document.getElementById("total");
  const botonVaciar = document.getElementById("vaciar-carrito");

  // 🛒 Cargar carrito guardado (si existe)
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // === Mostrar el carrito en la página ===
  function mostrarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - ${item.precio}`;
      
      // Botón eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.classList.add("eliminar");
      btnEliminar.addEventListener("click", () => eliminarDelCarrito(index));
      
      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);

      total += parseFloat(item.precio.replace("$", "").replace(".", ""));
    });

    totalElement.textContent = `Total: $${total.toLocaleString("es-CO")}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // === Agregar producto al carrito ===
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const producto = e.target.closest(".producto");
      const nombre = producto.querySelector("h3").textContent;
      const precio = producto.querySelector(".precio").textContent;

      carrito.push({ nombre, precio });
      mostrarCarrito();
      alert(`🧺 Se agregó "${nombre}" al carrito.`);
    });
  });

  // === Eliminar un producto del carrito ===
  function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
  }

  // === Vaciar todo el carrito ===
  botonVaciar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito ya está vacío.");
      return;
    }
    if (confirm("¿Seguro que deseas vaciar el carrito?")) {
      carrito = [];
      mostrarCarrito();
      alert("🧹 Carrito vaciado.");
    }
  });

  // === Mostrar el carrito guardado al cargar ===
  mostrarCarrito();
});
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoDiv = document.getElementById("carrito");
const totalP = document.getElementById("total");

// Mostrar productos del carrito
function mostrarCarrito() {
  carritoDiv.innerHTML = "";

  if (carrito.length === 0) {
    carritoDiv.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalP.textContent = "";
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;
    carritoDiv.innerHTML += `
      <div class="producto-carrito">
        <p>${item.nombre} - ${item.cantidad} x $${item.precio}</p>
      </div>
    `;
  });

  totalP.textContent = `Total: $${total.toFixed(2)}`;
}

// Botón para finalizar compra
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Guardar carrito en localStorage para usarlo en checkout
  localStorage.setItem("pedidoTemporal", JSON.stringify(carrito));

  // Redirigir a la página de pedido
  window.location.href = "checkout.html";
});

mostrarCarrito();
