import { conexionApi } from "./conexionAPI.js";


const lista = document.querySelector("[data-lista]")

console.log(lista)

function crearCard() {
    const card = document.createElement('li');
    card.className = "card";
    card.innerHTML =
        `
    <img src="img/producto test.jpg" alt="producto">
    <p>Trying my best!</p>
    <p>$ 60,00</p>
    `
    return card
}

async function listarCards() {
    const listaApi = await conexionApi.obtenerDatos()


}
