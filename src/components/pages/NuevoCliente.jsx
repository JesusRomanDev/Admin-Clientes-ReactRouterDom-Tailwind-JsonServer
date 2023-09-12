import React from 'react'
//Este Hook nos permite navegar de forma programada, no a traves de un enlace sino de un boton
//El Form reemplaza lo que hemos estado usando para hacerle el submit a los formularios (handleSubmit), entonces lo importamos
import {useNavigate, Form} from 'react-router-dom'
import Formulario from '../Formulario';

//En vez de ACTION, que regularmente lo tenemos en los formularios, crearemos una funcion similar a un loader para nuesto Form
//recordando que se tiene que importar en donde declaramos este componente, en este caso en el archivo Main.jsx
//Nota: tenemos que hacer la funcion ASINCRONA, ya que el request va a tardar un poco en procesar y obtener los datos del formData
export async function action({request}){ //los action van acompañados de un REQUEST, ya que es el que esta haciendo la peticion hacia el action
  const formData = await request.formData(); //formData existe en el proto

  //Ahora para recuperar los datos que metimos al formulario
  const datos = Object.fromEntries(formData);
  return null;
}

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

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
          <Form method='post'> {/* reemplazando la etiqueta form con el Componente DE REACT ROUTER DOM(no creado) Form */}
            <Formulario />

            <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' />
          </Form>
        </div>
    </div>
  )
}

export default NuevoCliente