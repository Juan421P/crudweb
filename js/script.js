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
                    <button onclick="EliminarPersona(${ser.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
ObtenerRegistros();

// PROCESO PARA AGREGAR REGISTROS!!!!!
const btnAgregar = document.querySelector("#btnAgregar");
const modal = document.querySelector("#mdAgregar");
const btnCerrar = document.querySelector("#btnCerrarModal");
btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});
btnCerrar.addEventListener("click", ()=>{
    modal.close();
});
document.querySelector("#frmAgregar").addEventListener("submit", async e =>{
    e.preventDefault(); // Evita que los datos se envíen por defecto. Omaigad!!!
    const nombre = document.querySelector("#txtNombre").value.trim();
    const apellido = document.querySelector("#txtApellido").value.trim();
    const correo = document.querySelector("#txtCorreo").value.trim();
    if(!nombre || !apellido || !correo){
        return;
    }
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, apellido, correo})
    });
    if(respuesta.ok){
        // Mensaje de confirmación!!
        alert("El registro fue agregado correctamente");
        // Limpiar el formulario
        document.querySelector("#frmAgregar").reset();
        // Cerrar el formulario
        modal.close();
        ObtenerRegistros();
    }else{
        alert("No se pudo guardar ey");
    }
});

// PROCESO PARA BORRAR REGISTROS!!!!
async function EliminarPersona(id){
    const confirmacion = confirm("¿Seguro que desea eliminar el registro?");
    if(confirmacion){
        await fetch(`${API_URL}/${id}`,{
            method: "DELETE"
            }); // Llamamos al endpoint
            // Recargar la tabla
            ObtenerRegistros();
    }
}