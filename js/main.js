import { cargarHeader } from "./funcionalidades-header.js"
import { cargarClima } from "./funcionalidad-tarjeta-clima.js"; 

cargarHeader();
cargarClima();

const modales = {
  "#tarjeta-sketch": "modal-sketch",
  "#tarjeta-neme": "modal-neme",
  "#tarjeta-tierraD": "modal-tierra-deportiva"
};
const id = modales[location.hash];
if (id) new bootstrap.Modal(document.getElementById(id)).show();