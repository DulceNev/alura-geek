import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]")
const formulario = document.querySelector("[data-formulario]")
const nombre$ = document.querySelector("[data-nombre]")
const precio$ = document.querySelector("[data-precio]")
const imagen$ = document.querySelector("[data-imagen]")

const withoutProductsMessage = document.getElementById('without-products-message')
// const productContainer = document.getElementById('product-container')


function crearCardHTML(nombre, precio, imagen, id) {

    return `<li class="card" data-id="${id}">
        <img src="${imagen}?id=${id}" alt="${nombre}">
        <p>${nombre}</p>
        <div class="card-items">
        <p>$${precio}</p>
        <box-icon name="trash" type="solid" color="white" class="button delete" data-id="${id}">D</box-icon>
        </div>
        </li>
        `
}


async function listarCards() {
    const listaApi = await conexionAPI.obtenerDatos()

    if (listaApi.length === 0) {
        withoutProductsMessage.style.display = 'block';
    } else {
        withoutProductsMessage.style.display = 'none';
    }

    let cardsHtml = ""
    listaApi.forEach(card => {
        cardsHtml = cardsHtml + crearCardHTML(card.nombre, card.precio, card.imagen, card.id)
    })

    lista.innerHTML = cardsHtml

    const deleteButtons$ = document.querySelectorAll(".product-container .button.delete")

    deleteButtons$.forEach(button => button.addEventListener("click", async (event) => {
        // console.log(event, event.target, event.target.getAttribute("data-id"))
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

    // const nuevaCard = crearCardHTML(nombre$.value, precio$.value, imagen$.value);

    // lista.innerHTML = nuevaCard;
    const nombre = nombre$.value
    const precio = precio$.value
    const imagen = imagen$.value
    if (!nombre || !precio || !imagen) {
        return
    }
    await conexionAPI.cardData(nombre, precio, imagen)
    nombre$.value = ""
    precio$.value = ""
    imagen$.value = ""
    await listarCards()
    // console.log(nombre, precio, imagen)

}

formulario.addEventListener('submit', evento => crearCard(evento))
