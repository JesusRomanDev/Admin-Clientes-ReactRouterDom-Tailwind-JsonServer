import Cliente from '../Cliente';
import React from 'react'
//Importando Hook useLoaderData para poder usar nuestra funcion loader
//CON ESTE HOOK PODEMOS ACCEDER A LO QUE HAYA RETORNADO LA FUNCION LOADER
import { useLoaderData } from 'react-router-dom';
//Esta funcion loader se va a ejecutar cuando el componente cargue, es similar al useEffect
//Nota: ESTE LOADER SIEMPRE TIENE QUE RETORNAR ALGO
//Nota: este se tiene que importar en el componente DONDE FUE DELCARADO, en este caso el Index.jsx fue declarado en el MAIN.jsx
//Nota: al importarlo debemos cambiarle el nombre ej. loader as nuevoNombre, la razon de porque aqui lo declaramos como loader
//y no con otro nombre es que asi espera ese nombre react-router-dom
//Nota: despues ya lo especificamos en nuestra ruta
export function loader(){
  const clientes = [
    {
        id: 1,
        nombre: 'Juan',
        telefono: 102013313,
        email: "juan@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 2,
        nombre: 'Karen',
        telefono: 138198313,
        email: "karen@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 3,
        nombre: 'Josue',
        telefono: 31983913,
        email: "josue@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 4,
        nombre: 'Miguel',
        telefono: 319381983,
        email: "miguel@juan.com",
        empresa: 'Codigo Con Juan'
    },
    {
        id: 5,
        nombre: 'Pedro',
        telefono: 1398198938,
        email: "pedro@juan.com",
        empresa: 'Codigo Con Juan'
    },
  ];

  return clientes; //retorname clientes al Hook useLoaderData
}


function Index() {

  //Usando useLoaderData para mostrar el return de la funcion loader
  const clientes = useLoaderData();
  console.log(clientes); //aqui nos muestra todo el contenido del return

  return (
    <div>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {clientes.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Cliente</th>
              <th className='p-2'>Contactos</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>

            <tbody>
              {clientes.map(cliente => (
                <Cliente cliente={cliente} key={cliente} />
              ))}
            </tbody>
        </table>
      ): (
        <p className='text-center mt-10'>No Hay clientes aun</p>
      )}
    </div>
  )
}

export default Index