// Obtencion de la data

async function obtenerDatos() {
    const url = "https://6736509faafa2ef222302e4a.mockapi.io/api/v1/productos"

    const respuesta = await fetch(url)

    const data = await respuesta.json()

    return data

}

// generar nueva card con POST

async function cardData(nombre, precio, imagen) {

    const url = "https://6736509faafa2ef222302e4a.mockapi.io/api/v1/productos"

    const respuesta = await fetch(url, {
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


export const conexionAPI = {
    obtenerDatos, cardData
}