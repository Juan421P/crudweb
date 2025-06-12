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
                    <button onclick="AbrirModalEditar(${ser.id}, '${ser.nombre}', '${ser.apellido}', '${ser.correo}')">Editar</button>
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

// ACTUALIZACIÓN!!!
// Funcionalidad para actualizar
const modalEditar = document.querySelector("#mdActualizar");
const btnCerrarEditar = document.querySelector("#btnCerrarActualizar");
btnCerrarEditar.addEventListener("click", ()=>{
    modalEditar.close();
});
function AbrirModalEditar(id, nombre, apellido, correo){
    document.querySelector("#txtIdActualizar").value = id;
    document.querySelector("#txtNombreActualizar").value = nombre;
    document.querySelector("#txtApellidoActualizar").value = apellido;
    document.querySelector("#txtCorreoActualizar").value = correo;
    modalEditar.showModal();
}
document.querySelector("#frmActualizar").addEventListener("submit", async e =>{
    e.preventDefault();
    const id = document.querySelector("#txtIdActualizar").value;
    const nombre = document.querySelector("#txtNombreActualizar").value.trim();
    const apellido = document.querySelector("#txtApellidoActualizar").value.trim();
    const correo = document.querySelector("#txtCorreoActualizar").value.trim();
    if(!id || !nombre || !apellido || !correo){
        alert("Complete todos los campos porfi");
        return;
    }
    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({correo, nombre, apellido})
    });
    if(respuesta.ok){
        alert("Registro actualizado de manera exitosa yupi");
        modalEditar.close();
        ObtenerRegistros();
    }else{
        alert("Hubo un error al actualizar. Awwwww :(");
    }
});