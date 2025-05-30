// Dirección del endpoint generado en Retool
const API_URL = "https://retoolapi.dev/ZVjPPb/gente";
// Función que llama a la API y realiza una solicitud GET. Obtiene a cambio un JSON
async function ObtenerRegistros(){
    // Hacemos GET al servidor y obtenemos respuesta. Yay!!
    const respuesta = await fetch(API_URL);
    // Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); // J, tú ve a la izquierda, S, tú a la derecha, O, tú por el medio, y N, tú solo sé tú... Vamos equipo JSON!!!
    MostrarRegistros(data);
}

// Función para generar las filas de la tabla
// "datos" representa al JSON
function MostrarRegistros(datos){
    // Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");
    // Para inyectar código HTML usamos innerHTML
    tabla.innerHTML = ""; // Se vacía el contenido de la tabla
    datos.forEach(ser => {
        tabla.innerHTML += `
            <tr>
                <td>${ser.id}</td>
                <td>${ser.nombre}</td>
                <td>${ser.apellido}</td>
                <td>${ser.correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    });
}
ObtenerRegistros();