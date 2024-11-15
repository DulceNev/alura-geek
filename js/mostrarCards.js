import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]")
const formulario = document.querySelector("[data-formulario]")
const nombre$ = document.querySelector("[data-nombre]")
const precio$ = document.querySelector("[data-precio]")
const imagen$ = document.querySelector("[data-imagen]")

function crearCardHTML(nombre, precio, imagen, id) {

    return `<li class="card" data-id="${id}">
        <img src="${imagen}?id=${id}" alt="${nombre}">
        <p>${nombre}</p>
        <p>$${precio}</p>
        <button class="button delete" data-id="${id}"> Eliminar card </button>
        </li>
        `
}


async function listarCards() {
    const listaApi = await conexionAPI.obtenerDatos()
    let cardsHtml = ""
    listaApi.forEach(card => {
        cardsHtml = cardsHtml + crearCardHTML(card.nombre, card.precio, card.imagen, card.id)
    })

    lista.innerHTML = cardsHtml

    const deleteButtons$ = document.querySelectorAll(".product-container .button.delete")

    deleteButtons$.forEach(button => button.addEventListener("click", async (event) => {
        console.log(event, event.target, event.target.getAttribute("data-id"))
        const id = event.target.getAttribute("data-id")
        await deleteCard(id)
    }))

}
async function deleteCard(id) {
    await conexionAPI.deleteCard(id)
    await listarCards()
}
listarCards()

// -------

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

let contador = 0
for (let i = 0; i < 10; i++) {
    contador = contador + i //      contador<= "0" +1
    console.log({ i })
}