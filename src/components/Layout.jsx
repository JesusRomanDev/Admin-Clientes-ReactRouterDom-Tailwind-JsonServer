import {Outlet, Link, useLocation} from 'react-router-dom' //Link nos sirve para reemplazarlos por los a (anchors) para mejor performance
//useLocation nos servira para poner codigo de JS en nuestro archivo y usar condicionales para algunas clases

function Layout() {
  //Creando nuestra variable de location para usar el useLocation();
  const location = useLocation();

  console.log(location); //en el location encontramos cosas como un key (cambiara siempre), un pathname (direccion donde estamos), search (si realizamos busquedas), entre otros
  return (
    <div className='md:flex md:min-h-screen'>
        <aside className="md:w-1/4 bg-blue-800 px-5 py-10">
          <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>

          <nav className='mt-10'>
            <Link className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 text-white`} to="/">Clientes</Link> {/* el href se reemplaza por el "to" */}
            <Link className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300 text-white`} to='/clientes/nuevo'>Nuevo Cliente</Link>
          </nav>
        </aside>

        <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
          <Outlet />
        </main>

        {/* <Outlet /> Outlet actua como un contenedor DINAMICO, lo que esta por fuera del OUTLET se renderiza en todos los demas componentes, outlet es lo que vendria siendo el CHILDREN, EN RESUMEN: LAYOUT SE VA A REFLEJAR EN TODOS LOS CHILDREN QUE TENGAMOS POR NUESTRO OUTLET */}
    </div>
  )
}

export default Layout