import React from 'react'
//Este Hook nos permite navegar de forma programada, no a traves de un enlace sino de un boton
//El Form reemplaza lo que hemos estado usando para hacerle el submit a los formularios (handleSubmit), entonces lo importamos
//El useActionData nos sirve para cuando retornemos algo de nuestra funcion y usarlo en LA FUNCION DE NUESTRO COMPONENTE
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../Formulario';
import Error from '../Error';
//Importando la funcion de agregar cliente para cuanod agreguemos un nuevo cliente
import {agregarCliente} from '../../data/clientes'

//En vez de ACTION, que regularmente lo tenemos en los formularios, crearemos una funcion similar a un loader para nuesto Form
//recordando que se tiene que importar en donde declaramos este componente, en este caso en el archivo Main.jsx
//Nota: tenemos que hacer la funcion ASINCRONA, ya que el request va a tardar un poco en procesar y obtener los datos del formData
export async function action({request}){ //los action van acompañados de un REQUEST, ya que es el que esta haciendo la peticion hacia el action
  //formData va a contener toda la informacion que ha sido ingresada en el formulario
  const formData = await request.formData(); //formData existe en el proto

  //Ahora para recuperar los datos que metimos al formulario
  const datos = Object.fromEntries(formData);

  const email = formData.get('email')

  //Validacion de los campos del formulario
  console.log(datos);
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
    return errores; //tenemos que retornar algo para poder usarlo en la funcion de nuestro componente NuevoCliente, asi como fue en el Index, que retornamos los clientes para poder usarlo con el useLoaderData en nuestra funcion del componente
    //Nota: a diferencia de useLoaderData, AQUI USAREMOS useActionData para poder usar lo que retornemos
  }
  //Aqui ya paso toda la validacion, entonces llamamos a la funcion para agregar el cliente con el argumento de datos
  //No quiero que la siguiente linea se ejecute, entonces ponemos un await hasta que finalice nuestra funcion
  await agregarCliente(datos);
  //Ahora bien, cuando acabe queremos que nos redireccione hacia la pestaña clientes una vez terminado de agregar un cliente
  return redirect('/')
  //Nota: cuando hay actions o loaders, tenemos que redireccionar por medio de redirect, cuando es por botones o HTML es mejor
  //por navigate(-1) como aqui abajo en el button del HTML
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
          {/* errores?. es un optional chaining, ver mi notion para mas info, pero en resumen es para que no nos arroje error y solo nos lo deje como undefined, asi no nos detiene todo el proyecto ya que al cargarse el formulario evalua esto y como no hay/ no existe el arreglo errores entones nos  marcara un error, pero si ponemos ?. evaluara error y como no hay nada solo nos regresa un undefined sin tener un error en el codigo, ESTO ES PORQUE ERROR AUN NO EXISTE, YA QUE SOLO VA A EXISTIR CUANDO DEMOS CLICK EN SUBMIT, ANTES NO, ES POR ESO QUE NOS PODIA DAR ERROR Y CON EL ?. NOS SALVAMOS DE ESTO*/}

          <Form noValidate method='post'> {/* reemplazando la etiqueta form con el Componente DE REACT ROUTER DOM(no creado) Form */}
          {/* noValidate va a desactivar la validacion PROPIA DE HTML, hacemos esto porque queremos poner nosotros nuestra propia validacion con nuestro regex */}
            <Formulario />

            <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg' /> {/* este button al darle click VA A BUSCAR EL ACTION DE ESTE FORM */}
          </Form>
        </div>
    </div>
  )
}

export default NuevoCliente