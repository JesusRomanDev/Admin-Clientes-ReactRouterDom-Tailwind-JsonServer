import React from 'react'
//Este Hook nos permite navegar de forma programada, no a traves de un enlace sino de un boton
import {useNavigate} from 'react-router-dom'

function NuevoCliente() {

  //Declaramos el Hook para poder usarlo con la variable navigate
  const navigate = useNavigate();

  return (
    <div>
        <h1 className='font-black text-4xl text-blue-900'>Nuevo Cliente</h1>
        <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

        <div className='flex justify-end'>
          <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase' onClick={()=> navigate(-1)}> {/* -1 nos lleva a la pagina anterior */}
            Volver
          </button>
        </div>

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
          <p>Formulario aqui</p>
        </div>
    </div>
  )
}

export default NuevoCliente