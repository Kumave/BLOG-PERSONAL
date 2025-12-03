import { db } from "./firebase-config.js";
import {
  collection, addDoc, getDocs, doc, deleteDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const articulosRef = collection(db, "articulos");

const formArticulo = document.getElementById("formArticulo");

formArticulo.addEventListener("submit", async (e) => {
  e.preventDefault();

  const articulo = {
    titulo: formArticulo.titulo.value,
    contenido: formArticulo.contenido.value,
    autor: formArticulo.autor.value,
    fecha: new Date().toLocaleString(),
    comentarios: []
  };

  await addDoc(articulosRef, articulo);
  formArticulo.reset();
  mostrarArticulos();
});

async function mostrarArticulos() {
  const contenedor = document.getElementById("listaArticulos");
  contenedor.innerHTML = "";

  const snapshot = await getDocs(articulosRef);

  snapshot.forEach((docu) => {
    const data = docu.data();

    const div = document.createElement("div");
    div.className = "articulo";

    div.innerHTML = `
      <h3>${data.titulo}</h3>
      <p><em>Por ${data.autor} | ${data.fecha}</em></p>
      <p>${data.contenido}</p>

      <h4>Comentarios</h4>
      <div class="comentarios">
        ${
          data.comentarios.length === 0
          ? "<p class='no-com'>No hay comentarios aún</p>"
          : data.comentarios.map(c => `
              <div class='comentario'>
                <strong>${c.nombre}:</strong> ${c.texto}
              </div>
            `).join("")
        }
      </div>

      <div class="formComentario">
        <input type="text" placeholder="Tu nombre" id="nombre-${docu.id}">
        <input type="text" placeholder="Escribe un comentario" id="comentario-${docu.id}">
        <button onclick="agregarComentario('${docu.id}')">Comentar</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

window.agregarComentario = async (id) => {
  const nombre = document.getElementById(`nombre-${id}`).value;
  const texto = document.getElementById(`comentario-${id}`).value;

  if (!nombre || !texto) return alert("Debes escribir nombre y comentario.");

  const articuloDoc = doc(db, "articulos", id);
  const snapshot = await getDocs(articulosRef);

  let articulo;
  snapshot.forEach((d) => {
    if (d.id === id) articulo = d.data();
  });

  articulo.comentarios.push({ nombre, texto });

  await updateDoc(articuloDoc, articulo);

  mostrarArticulos();
};

mostrarArticulos();
