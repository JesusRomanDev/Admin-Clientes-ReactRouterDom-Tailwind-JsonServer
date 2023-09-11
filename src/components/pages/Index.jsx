import React from 'react'
//Esta funcion loader se va a ejecutar cuando el componente cargue, es similar al useEffect
//Nota: ESTE LOADER SIEMPRE TIENE QUE RETORNAR ALGO
//Nota: este se tiene que importar en el componente DONDE FUE DELCARADO, en este caso el Index.jsx fue declarado en el MAIN.jsx
//Nota: al importarlo debemos cambiarle el nombre ej. loader as nuevoNombre, la razon de porque aqui lo declaramos como loader
//y no con otro nombre es que asi espera ese nombre react-router-dom
//Nota: despues ya lo especificamos en nuestra ruta
export function loader(){

  return 'Desde Loader';
}


function index() {
  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>
    </div>
  )
}

export default index