import React from 'react'
//Importando obtenerCliente para obtener ese cliente en especifico
import {obtenerCliente} from '../../data/clientes'
//Cargamos esta funcion para poder obtener el valor de la URL y lo importamos en el main como loader recordando renombrarlo
export async function loader({params}){ //los params nos serviran para que cuando haga loader obtenga en este caso el ID al cual 
    //le dimos editar, en resumen los params nos diran el valor que esta en la URL y asi obtener el numero de cliente a editar
    console.log(params); //nos imprime el objeto {clienteId: '1}
    const cliente = await obtenerCliente(params.clienteId) //accedemos al ID
    //Creando una condicion donde NO EXISTE EL ID y nos arroje un texto de error, recordando que despues tenemos que importar este
    //errorElement en nuestro main, para esto nosotros ya tenemos un componente de ErrorPage creado
    if(Object.values(cliente).length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'No Hay Resultados'
        })
    }
    console.log(cliente); //vamos obteniendo cada cliente segun donde presionemos en editar
    return cliente;
}

function EditarCliente() {
  return (
    <div>EditarCliente</div>
  )
}

export default EditarCliente