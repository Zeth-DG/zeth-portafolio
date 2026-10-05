// Datos ambientales en vivo (Open-Meteo).
const URL_CLIMA =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=19.27&longitude=-99.64" +
  "&current=temperature_2m,relative_humidity_2m";

export async function cargarClima() {
  const caja = document.getElementById("clima");
  if (!caja) return; // otras páginas no tienen la tarjeta

  try {
    const respuesta = await fetch(URL_CLIMA);
    if (!respuesta.ok) throw new Error(respuesta.status);
    const { current } = await respuesta.json();
    caja.querySelector("#temp").textContent = Math.round(current.temperature_2m);
    caja.querySelector("#hum").textContent = Math.round(current.relative_humidity_2m);
  } catch {
    caja.querySelector(".lectura-datos").textContent =
      "No pude conectar con la fuente de datos. Intenta recargar la página.";
  }
}
