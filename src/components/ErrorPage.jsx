import {useRouteError} from 'react-router-dom' //Este Hook nos ayudara a obtener el error que se este presentando
//Nota: este Hook nos va a ayudar con el error Status Text que declaramos en EditarCliente
export default function ErrorPage(){
    const error = useRouteError();
    console.log(error);
    return(
        <div className='space-y-8'>
            <h1 className='text-center text-6xl font-extrabold mt-20 text-blue-900'>CRM - Clientes</h1>
            <p className='text-center'>Hubo un error</p>
            <p className='text-center'>{error.statusText || error.message}</p> {/* agregando error.statusText */}

        </div>
    )
}