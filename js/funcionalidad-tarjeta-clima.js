// Datos ambientales en vivo (Open-Meteo).
const LAT = 19.29;
const LON = -99.65;
const URL_TEMP = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m`;
const URL_AIRE = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${LAT}&longitude=${LON}&current=pm10,pm2_5`;

async function leer(url) {
  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(respuesta.status);
  return (await respuesta.json()).current;
}

function mostrar(caja, selector, valor) {
  const el = caja.querySelector(selector);
  if (el) el.textContent = valor == null ? "--" : Math.round(valor * 10) / 10;
}

export async function cargarClima() {
  const caja = document.getElementById("clima");
  if (!caja) return; // otras páginas no tienen la tarjeta

  // allSettled: si falla una API, la otra se muestra igual
  const [temp, aire] = await Promise.allSettled([leer(URL_TEMP), leer(URL_AIRE)]);

  mostrar(caja, "#temp", temp.status === "fulfilled" ? temp.value.temperature_2m : null);
  mostrar(caja, "#pm25", aire.status === "fulfilled" ? aire.value.pm2_5 : null);
  mostrar(caja, "#pm10", aire.status === "fulfilled" ? aire.value.pm10 : null);

  if (temp.status === "rejected" && aire.status === "rejected") {
    caja.querySelector(".lectura-datos").textContent =
      "No pude conectar con la fuente de datos. Intenta recargar la página.";
  }
}