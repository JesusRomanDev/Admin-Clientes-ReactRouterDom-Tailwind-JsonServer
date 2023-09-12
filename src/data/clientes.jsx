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