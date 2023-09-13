import React from 'react'
//Cargamos esta funcion para poder obtener el valor de la URL y lo importamos en el main como loader recordando renombrarlo
export async function loader({params}){ //los params nos serviran para que cuando haga loader obtenga en este caso el ID al cual 
    //le dimos editar, en resumen los params nos diran el valor que esta en la URL y asi obtener el numero de cliente a editar
    console.log(params);
    return null;
}

function EditarCliente() {
  return (
    <div>EditarCliente</div>
  )
}

export default EditarCliente