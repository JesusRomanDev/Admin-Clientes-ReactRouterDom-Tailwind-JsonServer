//La carpeta data con el archivo clientes.jsx se puede considerar que es como un servicio al cual nos estamos conectando
//Nota: clientes.jsx esta ligado a .env y despues se tiene que importar en el Index que es donde esta nuestro loader, una vez en loader
//llamamos a nuestra funcion dentro y obtenemos los datos, recordando que siempre dentro de los loader algo se tiene que retornar
export async function obtenerClientes(){
    //Haciendo el fetch hacia este url (en teoria hace fetch hacia nuestro archivo env con nuestras variables de entorno)
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();
    console.log(resultado);
    return resultado; //retornando el resultado hacia nuestra funcion
}

export async function obtenerCliente(id){
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`); //esto nos retorna el objeto con el id TAL
    const resultado = await respuesta.json();
    console.log(resultado);
    return resultado; //retornando el resultado hacia nuestra funcion
}

export async function agregarCliente(datos){
    // console.log(datos);
    try {
        //Se pone la misma URL porque esa es la URL DONDE TENEMOS QUE ENVIAR UN NUEVO REGISTRO
        //Nota: le damos , y abrimos {} entonces le definimos un method post, en el de arriba no lo definimos porque por defecto el
        //metodo de FETCH ES GET, tambien le pasamos un body, que son los datos que vamos a enviar al servidor, en el codigo de arriba
        //no fue necesario porque solo estabamos consumiendo (GET), pero cuando envias (POST) se tiene que definir un body
        //tambien van headers que es el tipo de contenido que vamos a enviar y es un JSON
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos), //transformando objeto a JSON
            headers: {
                'Content-type': 'application/json' //esta peticion es de tipo JSON
            }
        })
        await respuesta.json();
    } catch (error) {
        console.log(error);
    }
}

//Para mandar actualizar cliente editado
export async function actualizarCliente(id, datos){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos), //transformando objeto a JSON
            headers: {
                'Content-type': 'application/json' //esta peticion es de tipo JSON
            }
        })
        await respuesta.json();
    } catch (error) {
        
    }
}