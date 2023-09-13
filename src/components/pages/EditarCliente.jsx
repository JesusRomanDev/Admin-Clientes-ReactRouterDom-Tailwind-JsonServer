import Formulario from '../Formulario';
import {Form, useNavigate, useLoaderData, useActionData, redirect} from 'react-router-dom'
import Error from '../Error';
import React from 'react'
//Importando obtenerCliente para obtener ese cliente en especifico
import {obtenerCliente, actualizarCliente} from '../../data/clientes'
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

//Ahora agregamos esta funcion con un action para ingresar esos datos de la edicion
export async function action({request, params}){ //Params para identificar que cliente vamos a actualizar 
    const formData = await request.formData(); //formData existe en el proto
    //Ahora para recuperar los datos que metimos al formulario
    const datos = Object.fromEntries(formData);
    const email = formData.get('email')
  
    //Validacion de los campos del formulario
    const errores = [];
    if(Object.values(datos).includes('')){ //si alguno de ellos incluye 1 string vacio entonces...
      errores.push('Todos los campos son obligatorios'); //se añade 1 elemento a nuestro array vacio de errores con este mensaje tipo string
    }
  
    //Validando que el email tenga el formato adecuado
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
    if(!regex.test(email)){ //SI NO CUMPLE EL TEST EJECUTA ESTE CODIGO
      errores.push('El email no es valido')
    }
  
    //Retornar datos si hay errores
    if(Object.keys(errores).length){
      return errores; 
    }

    //Actualizando el cliente
    await actualizarCliente(params.clienteId, datos);
    return redirect('/')
}

function EditarCliente() {
    const navigate = useNavigate();
    //Usando el useLoaderData para poder usar lo que nos retorno el loader
    const cliente = useLoaderData();
    console.log(cliente);
    //Usando el useActionData para poder usar lo que tenga la funcion en nuestra variable
    const errores = useActionData();
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

          {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)}

          <Form noValidate method='post'>
            <Formulario cliente={cliente} /> {/* pasandole el cliente para llenarlo ya que lo estamos editando */}

            <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' />
          </Form>
        </div>
    </div>
  )
}

export default EditarCliente