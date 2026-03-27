// === PRODUCTOS DISPONIBLES ===
const productos = [
  { id: 1, nombre: "Bolso tejido", precio: 50000 },
  { id: 2, nombre: "Llavero artesanal", precio: 15000 },
  { id: 3, nombre: "Crop top tejido", precio: 60000 }
];

// === MOSTRAR PRODUCTOS EN LA PÁGINA ===
const contenedor = document.getElementById("productos");
productos.forEach((p) => {
  const card = document.createElement("div");
  card.classList.add("producto");
  card.innerHTML = `
    <h3>${p.nombre}</h3>
    <p>Precio: $${p.precio}</p>
    <button onclick="agregarAlCarrito(${p.id})">Agregar al carrito</button>
  `;
  contenedor.appendChild(card);
});

// === CARRITO DE COMPRAS ===
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";
  carrito.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre} - $${p.precio}`;
    lista.appendChild(item);
  });
}

// Mostrar carrito al cargar la página
mostrarCarrito();