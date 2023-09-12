import React from 'react'
//Este Hook nos permite navegar de forma programada, no a traves de un enlace sino de un boton
//El Form reemplaza lo que hemos estado usando para hacerle el submit a los formularios (handleSubmit), entonces lo importamos
//El useActionData nos sirve para cuando retornemos algo de nuestra funcion y usarlo en LA FUNCION DE NUESTRO COMPONENTE
import {useNavigate, Form, useActionData} from 'react-router-dom'
import Formulario from '../Formulario';
import Error from '../Error';

//En vez de ACTION, que regularmente lo tenemos en los formularios, crearemos una funcion similar a un loader para nuesto Form
//recordando que se tiene que importar en donde declaramos este componente, en este caso en el archivo Main.jsx
//Nota: tenemos que hacer la funcion ASINCRONA, ya que el request va a tardar un poco en procesar y obtener los datos del formData
export async function action({request}){ //los action van acompañados de un REQUEST, ya que es el que esta haciendo la peticion hacia el action
  //formData va a contener toda la informacion que ha sido ingresada en el formulario
  const formData = await request.formData(); //formData existe en el proto

  //Ahora para recuperar los datos que metimos al formulario
  const datos = Object.fromEntries(formData);

  //Validacion de los campos del formulario
  console.log(datos);
  const errores = [];
  if(Object.values(datos).includes('')){ //si alguno de ellos incluye 1 string vacio entonces...
    errores.push('Todos los campos son obligatorios'); //se añade 1 elemento a nuestro array vacio de errores con este mensaje tipo string
  }
  //Retornar datos si hay errores
  if(Object.keys(errores).length){
    return errores; //tenemos que retornar algo para poder usarlo en la funcion de nuestro componente NuevoCliente, asi como fue en el Index, que retornamos los clientes para poder usarlo con el useLoaderData en nuestra funcion del componente
    //Nota: a diferencia de useLoaderData, AQUI USAREMOS useActionData para poder usar lo que retornemos
  }
  return null;
}

function NuevoCliente() {
  const errores = useActionData();
  //El console.log nos arroja los errores, pero ahora si desde nuestro componente y no de la funcion externa a este(lo que esta arriba pues, linea 11 aprox)
  console.log(errores);

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

          {errores?.length && errores.map((error, i)=> <Error key={i}>{error}</Error>)} {/* como vamos a tener multiples errores, entonces le añadimos un prop key={i}, la posicion que seria ese error */}

          <Form method='post'> {/* reemplazando la etiqueta form con el Componente DE REACT ROUTER DOM(no creado) Form */}
            <Formulario />

            <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' /> {/* este button al darle click VA A BUSCAR EL ACTION DE ESTE FORM */}
          </Form>
        </div>
    </div>
  )
}

export default NuevoCliente