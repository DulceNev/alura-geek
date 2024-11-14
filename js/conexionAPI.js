// Obtencion de la data

async function obtenerDatos() {
    const url = "https://6736509faafa2ef222302e4a.mockapi.io/api/v1/productos"

    const respuesta = await fetch(url)

    const data = await respuesta.json()

    return data

}

obtenerDatos()

// Crear HTML de la Card

const lista = document.querySelector("[data-lista]")

function crearCard(nombre, precio, imagen) {
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
    const listaApi = await obtenerDatos()

    listaApi.forEach(card => lista.appendChild(crearCard(card.nombre, card.precio, card.imagen)))

    console.log(listaApi)
}

listarCards()

// generar nueva card con POST

async function generarCard(nombre, precio, imagen) {

    const respuesta = await fetch("https://6736509faafa2ef222302e4a.mockapi.io/api/v1/productos", {
        // post es una solicitud para enviar datos a la API (crear un recurso).
        method: "POST",
        // Aquí defines el tipo de contenido que estás enviando
        headers: { "Content-Type": "application/json" },
        // convertir el objeto con nombre, precio e imagen a una cadena JSON
        body: JSON.stringify({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
        })
    })

    // convierte la respuesta de la API a formato JSON.
    const data = await respuesta.json()

    return data

}