import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]")

function crearCardHTML(nombre, precio, imagen) {
    const card = document.createElement('li');
    card.className = "card";
    card.innerHTML =
        `
        <img src="${imagen}?name=${nombre}" alt="${nombre}">
        <p>${nombre}</p>
        <p>$${precio}</p>
        `
    return card
}

async function listarCards() {
    const listaApi = await conexionAPI.obtenerDatos()

    listaApi.forEach(card => lista.appendChild(crearCardHTML(card.nombre, card.precio, card.imagen)))

}

listarCards()

// -------
const formulario = document.querySelector("[data-formulario]")
const nombre$ = document.querySelector("[data-nombre]")
const precio$ = document.querySelector("[data-precio]")
const imagen$ = document.querySelector("[data-imagen]")
async function crearCard(evento) {

    evento.preventDefault();

    const nuevaCard = crearCardHTML(nombre$.value, precio$.value, imagen$.value);
    lista.appendChild(nuevaCard);

    nombre$.value = ""
    precio$.value = ""
    imagen$.value = ""
    // console.log(nombre, precio, imagen)

    await conexionAPI.cardData(nombre, precio, imagen)
}

formulario.addEventListener('submit', evento => crearCard(evento))

