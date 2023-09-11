import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div className='md:flex md:min-h-screen'>
        <aside className="md:w-1/4 bg-blue-800 px-5 py-10">
          <h2 className='text-4xl font-black text-center text-white'>CRM - Clientes</h2>
        </aside>

        <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
          <Outlet />
        </main>

        {/* <Outlet /> Outlet actua como un contenedor DINAMICO, lo que esta por fuera del OUTLET se renderiza en todos los demas componentes, outlet es lo que vendria siendo el CHILDREN, EN RESUMEN: LAYOUT SE VA A REFLEJAR EN TODOS LOS CHILDREN QUE TENGAMOS POR NUESTRO OUTLET */}
    </div>
  )
}

export default Layout