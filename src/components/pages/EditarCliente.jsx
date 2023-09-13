import Formulario from '../Formulario';
import {Form, useNavigate, useLoaderData} from 'react-router-dom'
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
    const navigate = useNavigate();
    //Usando el useLoaderData para poder usar lo que nos retorno el loader
    const cliente = useLoaderData();
    console.log(cliente);
  return (
    <div>
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Llena los campos para modificar el cliente</p>

        <div className='flex justify-end'>
          <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase' onClick={()=> navigate(-1)}>
            Volver
          </button>
        </div>

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

          {/* {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)} */}

          <Form noValidate method='post'>
            <Formulario cliente={cliente} /> {/* pasandole el cliente para llenarlo ya que lo estamos editando */}

            <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' />
          </Form>
        </div>
    </div>
  )
}

export default EditarCliente